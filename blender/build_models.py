# Builds low-poly 3D models for the portfolio and exports them as .glb
# Run inside Blender's Python Console:
#   exec(open(r"C:\Users\abnou\OneDrive\Desktop\my-portfolio-main\blender\build_models.py").read())
# ASCII only on purpose (Windows default file encoding).
import bpy, bmesh, math, os, traceback
from mathutils import Matrix, Vector, Euler

ROOT = r"C:\Users\abnou\OneDrive\Desktop\my-portfolio-main"
OUT = os.path.join(ROOT, "models")
LOG = []

def log(*a):
    line = " ".join(str(x) for x in a)
    LOG.append(line)
    print(line)

# ---------------------------------------------------------------- palette
ORANGE = "#e67e22"; GOLD = "#f1c40f"; BLUE = "#3498db"; PURPLE = "#9b59b6"
DARK = "#3b3b7a"; DARK2 = "#272759"; LIGHT = "#ecf0f1"; GREEN = "#38ef7d"
CYAN = "#6dd5fa"; PINK = "#ff6b9d"; GREY = "#4a4a6a"

def s2l(c):
    return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

def rgb(h):
    h = h.lstrip("#")
    return tuple(s2l(int(h[i:i + 2], 16) / 255.0) for i in (0, 2, 4)) + (1.0,)

def mat(name, h, emit=0.0, metal=0.0, rough=0.42):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = None
    for n in m.node_tree.nodes:
        if n.type == "BSDF_PRINCIPLED":
            b = n
            break
    if b is None:
        return m
    col = rgb(h)
    def setv(names, val):
        for nm in names:
            if nm in b.inputs:
                try:
                    b.inputs[nm].default_value = val
                    return
                except Exception:
                    pass
    setv(["Base Color"], col)
    setv(["Metallic"], metal)
    setv(["Roughness"], rough)
    setv(["Emission Color", "Emission"], col)
    setv(["Emission Strength"], emit)
    return m

# ---------------------------------------------------------------- geometry
def BM():
    return bmesh.new()

def xform(loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    return (Matrix.Translation(Vector(loc)) @
            Euler(rot, "XYZ").to_matrix().to_4x4() @
            Matrix.Diagonal(Vector((scale[0], scale[1], scale[2], 1.0))))

def _try(op, bm, variants):
    last = None
    for kw in variants:
        try:
            return op(bm, **kw)
        except TypeError as e:
            last = e
    raise last

def cube(bm, loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    _try(bmesh.ops.create_cube, bm, [dict(size=2.0, matrix=xform(loc, rot, scale))])

def cone(bm, r1, r2, depth, seg=22, loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    mx = xform(loc, rot, scale)
    _try(bmesh.ops.create_cone, bm, [
        dict(cap_ends=True, cap_tris=False, segments=seg, radius1=r1, radius2=r2, depth=depth, matrix=mx),
        dict(cap_ends=True, cap_tris=False, segments=seg, diameter1=r1 * 2, diameter2=r2 * 2, depth=depth, matrix=mx),
    ])

def cyl(bm, r, depth, seg=22, **kw):
    cone(bm, r, r, depth, seg, **kw)

def ico(bm, r, sub=1, loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    mx = xform(loc, rot, scale)
    _try(bmesh.ops.create_icosphere, bm, [
        dict(subdivisions=sub, radius=r, matrix=mx),
        dict(subdivisions=sub, diameter=r * 2, matrix=mx),
    ])

def ball(bm, r, u=18, v=10, loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    mx = xform(loc, rot, scale)
    _try(bmesh.ops.create_uvsphere, bm, [
        dict(u_segments=u, v_segments=v, radius=r, matrix=mx),
        dict(u_segments=u, v_segments=v, diameter=r * 2, matrix=mx),
    ])

def torus(bm, R, r, su=30, sv=8, u0=0.0, u1=1.0, loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    mx = xform(loc, rot, scale)
    closed = (u1 - u0) >= 0.999
    nu = su if closed else su + 1
    rows = []
    for i in range(nu):
        u = 2 * math.pi * (u0 + (u1 - u0) * (float(i) / su))
        row = []
        for j in range(sv):
            vv = 2 * math.pi * j / sv
            x = (R + r * math.cos(vv)) * math.cos(u)
            y = (R + r * math.cos(vv)) * math.sin(u)
            z = r * math.sin(vv)
            row.append(bm.verts.new(mx @ Vector((x, y, z))))
        rows.append(row)
    n = len(rows)
    for i in range(n if closed else n - 1):
        a = rows[i]; b = rows[(i + 1) % n]
        for j in range(sv):
            k = (j + 1) % sv
            try:
                bm.faces.new((a[j], a[k], b[k], b[j]))
            except ValueError:
                pass

def prism(bm, pts, thick, loc=(0, 0, 0), rot=(0, 0, 0), scale=(1, 1, 1)):
    """pts: (x, y) outline in local XY, extruded along local Z."""
    mx = xform(loc, rot, scale)
    h = thick / 2.0
    bot = [bm.verts.new(mx @ Vector((x, y, -h))) for x, y in pts]
    top = [bm.verts.new(mx @ Vector((x, y, h))) for x, y in pts]
    for f in (bot[::-1], top):
        try:
            bm.faces.new(f)
        except ValueError:
            pass
    n = len(pts)
    for i in range(n):
        j = (i + 1) % n
        try:
            bm.faces.new((bot[i], bot[j], top[j], top[i]))
        except ValueError:
            pass

# ---------------------------------------------------------------- scene
def finish(name, bm, material, smooth=False):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    me.materials.append(material)
    if smooth:
        for p in me.polygons:
            p.use_smooth = True
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    return ob

def clear():
    for ob in list(bpy.data.objects):
        bpy.data.objects.remove(ob, do_unlink=True)
    for coll in (bpy.data.meshes, bpy.data.materials):
        for b in list(coll):
            if b.users == 0:
                coll.remove(b)

def export(name):
    objs = [o for o in bpy.data.objects if o.type == "MESH"]
    if not objs:
        log("SKIP", name, "(no meshes)")
        return
    # clear() leaves only this model in the scene, so export everything.
    path = os.path.join(OUT, name + ".glb")
    errs = []
    for extra in ({"export_apply": True}, {}):
        kw = dict(filepath=path, export_format="GLB")
        kw.update(extra)
        try:
            bpy.ops.export_scene.gltf(**kw)
            size = os.path.getsize(path) if os.path.exists(path) else -1
            log("OK  ", name + ".glb", size, "bytes,", len(objs), "parts")
            return
        except TypeError as e:
            errs.append(repr(e))
            continue
        except Exception as e:
            log("ERR ", name, repr(e))
            return
    log("FAIL", name, "; ".join(errs))

D = math.radians

# ---------------------------------------------------------------- models
def m_controller():
    clear()
    body = mat("ctrl_body", DARK, 0.18, 0.25, 0.35)
    accent = mat("ctrl_accent", ORANGE, 0.45)
    goldm = mat("ctrl_gold", GOLD, 0.5)
    bluem = mat("ctrl_blue", BLUE, 0.5)
    purpm = mat("ctrl_purple", PURPLE, 0.5)
    dark2 = mat("ctrl_dark", DARK2, 0.12, 0.1, 0.5)

    bm = BM()
    cube(bm, scale=(1.45, 0.30, 0.46))
    cube(bm, loc=(0, 0, -0.30), scale=(0.75, 0.28, 0.30))
    for sx in (-1, 1):
        cyl(bm, 0.30, 1.00, 16, loc=(sx * 1.30, 0.02, -0.52), rot=(D(14), 0, D(-16 * sx)))
        ball(bm, 0.30, 14, 8, loc=(sx * 1.42, 0.14, -0.98))
        cube(bm, loc=(sx * 1.05, 0.06, 0.48), rot=(0, D(-8 * sx), 0), scale=(0.34, 0.22, 0.08))
    finish("body", bm, body)

    bm = BM()
    cube(bm, loc=(-0.80, -0.31, 0.04), scale=(0.30, 0.05, 0.09))
    cube(bm, loc=(-0.80, -0.31, 0.04), scale=(0.09, 0.05, 0.30))
    finish("dpad", bm, goldm)

    for i, (dx, dz, m) in enumerate([(0, 0.26, accent), (0.26, 0, bluem), (0, -0.26, goldm), (-0.26, 0, purpm)]):
        bm = BM()
        cyl(bm, 0.10, 0.10, 14, loc=(0.82 + dx, -0.33, 0.04 + dz), rot=(D(90), 0, 0))
        finish("btn%d" % i, bm, m, True)

    bm = BM()
    for sx in (-1, 1):
        cyl(bm, 0.19, 0.12, 16, loc=(sx * 0.33, -0.33, -0.30), rot=(D(90), 0, 0))
    finish("stickbase", bm, dark2, True)

    bm = BM()
    for sx in (-1, 1):
        ball(bm, 0.155, 16, 10, loc=(sx * 0.33, -0.40, -0.30))
    finish("sticktop", bm, accent, True)

    bm = BM()
    ball(bm, 0.085, 14, 8, loc=(0, -0.33, 0.34))
    torus(bm, 0.16, 0.025, 20, 6, loc=(0, -0.31, 0.34), rot=(D(90), 0, 0))
    finish("logo", bm, goldm, True)
    export("controller")

def m_laptop():
    clear()
    shell = mat("lap_shell", DARK, 0.18, 0.4, 0.3)
    screen = mat("lap_screen", BLUE, 0.85)
    goldm = mat("lap_gold", GOLD, 0.5)
    keys = mat("lap_keys", DARK2, 0.12, 0.1, 0.55)

    a = D(100)
    hy, hz = 0.80, 0.035
    cy = 0.82 + hy * math.cos(a)
    cz = hy * math.sin(a)
    ny, nz = -math.sin(a), math.cos(a)

    bm = BM()
    cube(bm, scale=(1.20, 0.84, 0.040))
    cube(bm, loc=(0, cy, cz), rot=(a, 0, 0), scale=(1.20, hy, hz))
    finish("shell", bm, shell)

    bm = BM()
    cube(bm, loc=(0, cy + 0.05 * ny, cz + 0.05 * nz), rot=(a, 0, 0), scale=(1.08, hy * 0.88, 0.006))
    finish("panel", bm, screen)

    bm = BM()
    cube(bm, loc=(0, -0.06, 0.045), scale=(1.00, 0.52, 0.008))
    finish("keys", bm, keys)

    bm = BM()
    cube(bm, loc=(0, -0.60, 0.046), scale=(0.30, 0.19, 0.006))
    cyl(bm, 0.05, 2.44, 10, loc=(0, 0.82, 0.02), rot=(0, D(90), 0))
    finish("trim", bm, goldm)
    export("laptop")

def m_phone():
    clear()
    shell = mat("ph_shell", DARK, 0.18, 0.4, 0.3)
    screen = mat("ph_screen", CYAN, 0.8)
    goldm = mat("ph_gold", GOLD, 0.5)
    blue = mat("ph_blue", BLUE, 0.6)

    bm = BM()
    cube(bm, scale=(0.42, 0.048, 0.84))
    finish("shell", bm, shell)

    bm = BM()
    cube(bm, loc=(0, -0.052, 0.02), scale=(0.365, 0.006, 0.735))
    finish("screen", bm, screen)

    bm = BM()
    cube(bm, loc=(0, -0.056, -0.76), scale=(0.14, 0.006, 0.018))
    cyl(bm, 0.035, 0.012, 12, loc=(0, -0.056, 0.78), rot=(D(90), 0, 0))
    finish("detail", bm, goldm, True)

    bm = BM()
    for i in range(3):
        cube(bm, loc=(-0.16 + i * 0.16, -0.060, 0.30 - i * 0.22), scale=(0.055, 0.004, 0.055))
    finish("icons", bm, blue)
    export("phone")

def m_chip():
    clear()
    shell = mat("ch_shell", "#4b2f7d", 0.16, 0.3, 0.4)
    pins = mat("ch_pins", GOLD, 0.35, 0.8, 0.25)
    coremat = mat("ch_core", PURPLE, 0.9)
    node = mat("ch_node", CYAN, 0.9)

    bm = BM()
    cube(bm, scale=(0.62, 0.075, 0.62))
    finish("shell", bm, shell)

    bm = BM()
    for i in range(5):
        t = -0.40 + i * 0.20
        for sgn in (-1, 1):
            cube(bm, loc=(sgn * 0.72, 0, t), scale=(0.11, 0.030, 0.045))
            cube(bm, loc=(t, 0, sgn * 0.72), scale=(0.045, 0.030, 0.11))
    finish("pins", bm, pins, )

    bm = BM()
    cube(bm, loc=(0, -0.082, 0), scale=(0.34, 0.012, 0.34))
    finish("core", bm, coremat)

    bm = BM()
    for (x, z) in ((-0.22, 0.22), (0.22, 0.22), (-0.22, -0.22), (0.22, -0.22)):
        ball(bm, 0.045, 12, 8, loc=(x, -0.092, z))
        cube(bm, loc=(x * 0.5, -0.088, z * 0.5), rot=(0, D(45 if x * z > 0 else -45), 0), scale=(0.012, 0.004, 0.19))
    finish("nodes", bm, node, True)
    export("chip")

def m_crystal():
    clear()
    body = mat("cr_body", GOLD, 0.55, 0.3, 0.2)
    band = mat("cr_band", ORANGE, 0.7)

    bm = BM()
    cone(bm, 0.58, 0.0, 1.05, 6, loc=(0, 0, 0.52))
    cone(bm, 0.58, 0.0, 1.35, 6, loc=(0, 0, -0.67), rot=(D(180), 0, 0))
    finish("crystal", bm, body)

    bm = BM()
    torus(bm, 0.62, 0.035, 6, 6, loc=(0, 0, 0))
    torus(bm, 0.46, 0.028, 6, 6, loc=(0, 0, 0.30))
    finish("bands", bm, band)
    export("crystal")

def m_rocket():
    clear()
    shell = mat("rk_shell", LIGHT, 0.12, 0.2, 0.35)
    nosem = mat("rk_nose", ORANGE, 0.45)
    finm = mat("rk_fin", PINK, 0.4)
    glass = mat("rk_glass", BLUE, 0.75)
    goldm = mat("rk_gold", GOLD, 0.5)
    flame = mat("rk_flame", GOLD, 1.2)

    bm = BM()
    cyl(bm, 0.30, 1.25, 20, loc=(0, 0, 0.10))
    finish("shell", bm, shell, True)

    bm = BM()
    cone(bm, 0.30, 0.0, 0.58, 20, loc=(0, 0, 1.01))
    finish("nose", bm, nosem, True)

    bm = BM()
    for i in range(3):
        prism(bm, [(0.0, -0.52), (0.52, -0.80), (0.0, -0.05)], 0.055,
              rot=(D(90), 0, D(120 * i)))
    finish("fins", bm, finm)

    bm = BM()
    torus(bm, 0.305, 0.045, 22, 8, loc=(0, 0, 0.42))
    torus(bm, 0.305, 0.035, 22, 8, loc=(0, 0, -0.34))
    finish("bands", bm, goldm, True)

    bm = BM()
    ball(bm, 0.14, 16, 10, loc=(0, -0.26, 0.20), scale=(1, 0.5, 1))
    finish("window", bm, glass, True)

    bm = BM()
    cone(bm, 0.22, 0.0, 0.50, 14, loc=(0, 0, -0.76), rot=(D(180), 0, 0))
    finish("flame", bm, flame)
    export("rocket")

def m_gradcap():
    clear()
    board = mat("gc_board", "#322c6e", 0.06, 0.2, 0.40)
    crown = mat("gc_crown", "#3d3690", 0.05, 0.2, 0.45)
    goldm = mat("gc_gold", GOLD, 0.55, 0.7, 0.25)

    # crown, tall enough to read below the board
    bm = BM()
    cone(bm, 0.40, 0.34, 0.46, 20, loc=(0, 0, 0.0))
    finish("crown", bm, crown, True)

    # gold under-plate peeking out past the dark top plate = bright rim
    bm = BM()
    cube(bm, loc=(0, 0, 0.255), rot=(0, 0, D(45)), scale=(0.86, 0.86, 0.020))
    finish("rim", bm, goldm)

    bm = BM()
    cube(bm, loc=(0, 0, 0.285), rot=(0, 0, D(45)), scale=(0.81, 0.81, 0.024))
    finish("board", bm, board)

    # button + long tassel hanging off the front corner
    bm = BM()
    ball(bm, 0.075, 14, 8, loc=(0, 0, 0.325))
    cyl(bm, 0.024, 1.00, 8, loc=(0.50, 0, 0.318), rot=(0, D(90), 0))
    cyl(bm, 0.024, 0.42, 8, loc=(1.02, 0, 0.11))
    cyl(bm, 0.065, 0.11, 10, loc=(1.02, 0, -0.14))
    cone(bm, 0.105, 0.052, 0.28, 12, loc=(1.02, 0, -0.33))
    finish("tassel", bm, goldm, True)
    export("gradcap")

def m_books():
    clear()
    pages = mat("bk_pages", LIGHT, 0.1, 0.0, 0.6)
    covers = [mat("bk_c0", ORANGE, 0.3), mat("bk_c1", BLUE, 0.3), mat("bk_c2", PURPLE, 0.3)]
    specs = [(0.0, -0.20), (D(14), 0.0), (D(-10), 0.20)]

    bmp = BM()
    for i, (rz, z) in enumerate(specs):
        bmc = BM()
        cube(bmp, loc=(0, 0, z), rot=(0, 0, rz), scale=(0.58, 0.42, 0.058))
        for s in (-1, 1):
            cube(bmc, loc=(0, 0, z + s * 0.068), rot=(0, 0, rz), scale=(0.61, 0.45, 0.014))
        cube(bmc, loc=(-0.61 * math.cos(rz), -0.61 * math.sin(rz), z), rot=(0, 0, rz), scale=(0.018, 0.45, 0.070))
        finish("cover%d" % i, bmc, covers[i])
    finish("pages", bmp, pages)
    export("books")

def m_envelope():
    clear()
    paper = mat("en_paper", LIGHT, 0.14, 0.0, 0.55)
    flapm = mat("en_flap", GOLD, 0.35)
    sealm = mat("en_seal", ORANGE, 0.6)
    linem = mat("en_line", BLUE, 0.4)

    bm = BM()
    cube(bm, scale=(0.78, 0.030, 0.52))
    finish("body", bm, paper)

    bm = BM()
    prism(bm, [(-0.78, 0.52), (0.78, 0.52), (0.0, -0.10)], 0.028,
          loc=(0, -0.042, 0), rot=(D(90), 0, 0))
    finish("flap", bm, flapm)

    bm = BM()
    for i in range(3):
        cube(bm, loc=(-0.10, -0.035, -0.14 - i * 0.12), scale=(0.44 - i * 0.08, 0.004, 0.022))
    finish("lines", bm, linem)

    bm = BM()
    ball(bm, 0.105, 16, 10, loc=(0, -0.070, -0.08), scale=(1, 0.55, 1))
    finish("seal", bm, sealm, True)
    export("envelope")

# ---------------------------------------------------------------- run
def run():
    os.makedirs(OUT, exist_ok=True)
    log("blender", bpy.app.version_string)
    log("out", OUT)
    builders = [m_controller, m_laptop, m_phone, m_chip, m_crystal,
                m_rocket, m_gradcap, m_books, m_envelope]
    for fn in builders:
        try:
            fn()
        except Exception:
            log("EXC ", fn.__name__)
            log(traceback.format_exc())
    clear()
    log("done")

try:
    run()
except Exception:
    log("FATAL")
    log(traceback.format_exc())
finally:
    try:
        os.makedirs(OUT, exist_ok=True)
        f = open(os.path.join(OUT, "_report.txt"), "w")
        f.write("\n".join(LOG))
        f.close()
    except Exception as e:
        print("report write failed", e)
