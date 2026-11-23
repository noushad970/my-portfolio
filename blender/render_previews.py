# Renders a preview PNG of each exported .glb so the shapes can be checked.
import bpy, os, math, traceback
from mathutils import Vector

ROOT = r"C:\Users\abnou\OneDrive\Desktop\my-portfolio-main"
OUT = os.path.join(ROOT, "models")
PREV = os.path.join(OUT, "preview")
LOG = []

def log(*a):
    line = " ".join(str(x) for x in a)
    LOG.append(line)
    print(line)

NAMES = ["controller", "laptop", "phone", "chip", "crystal",
         "rocket", "gradcap", "books", "envelope"]

def clear():
    for ob in list(bpy.data.objects):
        bpy.data.objects.remove(ob, do_unlink=True)

def bounds():
    lo = Vector((1e9, 1e9, 1e9))
    hi = Vector((-1e9, -1e9, -1e9))
    found = False
    for ob in bpy.data.objects:
        if ob.type != "MESH":
            continue
        for c in ob.bound_box:
            w = ob.matrix_world @ Vector(c)
            for i in range(3):
                lo[i] = min(lo[i], w[i])
                hi[i] = max(hi[i], w[i])
            found = True
    if not found:
        return Vector((0, 0, 0)), 1.0
    return (lo + hi) / 2.0, max((hi - lo).length / 2.0, 0.001)

def setup_render():
    sc = bpy.context.scene
    for eng in ("BLENDER_WORKBENCH", "BLENDER_EEVEE_NEXT", "BLENDER_EEVEE"):
        try:
            sc.render.engine = eng
            break
        except Exception:
            continue
    sc.render.resolution_x = 420
    sc.render.resolution_y = 420
    sc.render.resolution_percentage = 100
    sc.render.image_settings.file_format = "PNG"
    try:
        sh = sc.display.shading
        sh.light = "STUDIO"
        sh.color_type = "MATERIAL"
        sh.show_cavity = True
        sh.background_type = "VIEWPORT"
        sh.background_color = (0.03, 0.03, 0.10)
    except Exception as e:
        log("shading note", repr(e))

def render_one(name):
    clear()
    path = os.path.join(OUT, name + ".glb")
    if not os.path.exists(path):
        log("MISS", name)
        return
    bpy.ops.import_scene.gltf(filepath=path)
    center, rad = bounds()
    cam_data = bpy.data.cameras.new("cam")
    cam_data.lens = 50
    cam = bpy.data.objects.new("cam", cam_data)
    bpy.context.scene.collection.objects.link(cam)
    bpy.context.scene.camera = cam
    d = Vector((1.0, -1.5, 0.75)).normalized()
    cam.location = center + d * (rad * 3.4)
    cam.rotation_euler = (cam.location - center).to_track_quat("Z", "Y").to_euler()
    out = os.path.join(PREV, name + ".png")
    bpy.context.scene.render.filepath = out
    bpy.ops.render.render(write_still=True)
    sz = os.path.getsize(out) if os.path.exists(out) else -1
    log("OK  ", name + ".png", sz, "bytes, radius %.2f" % rad)

try:
    os.makedirs(PREV, exist_ok=True)
    setup_render()
    for n in NAMES:
        try:
            render_one(n)
        except Exception:
            log("EXC ", n)
            log(traceback.format_exc())
    clear()
    log("done")
except Exception:
    log("FATAL")
    log(traceback.format_exc())
finally:
    f = open(os.path.join(PREV, "_render.txt"), "w")
    f.write("\n".join(LOG))
    f.close()
