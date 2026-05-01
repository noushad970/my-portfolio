document.getElementById("sendButton").addEventListener("click", function () {
    const name = document.getElementById("nameInput").value;
    const email = document.getElementById("emailInput").value;
    const message = document.getElementById("messageInput").value;

    if (name && email && message) {
        // Show loading state
        const sendButton = document.getElementById("sendButton");
        const originalText = sendButton.textContent;
        sendButton.textContent = "Sending... 🔄";
        sendButton.disabled = true;

        // Sending Email
        emailjs.send("service_n3qqwbu", "template_h7vitzj", {
            from_name: name,
            from_email: email,
            message: message
        }).then(() => {
            // Success animation
            sendButton.textContent = "✅ Sent Successfully!";
            
            setTimeout(() => {
                alert("Message sent successfully! Thank you for reaching out.");
                sendButton.textContent = originalText;
                sendButton.disabled = false;
            }, 2000);

            // Adding feedback to the page with animation
            const feedbackList = document.getElementById("feedbackList");
            if (feedbackList) {
                const feedbackItem = document.createElement("div");
                feedbackItem.style.animation = "slideInLeft 0.5s ease-out";
                feedbackItem.innerHTML = `
                    <strong>✨ ${name}</strong>: <em>${message}</em>
                `;
                feedbackList.appendChild(feedbackItem);
            }

            // Clearing form fields
            document.getElementById("contactForm").reset();
        }).catch((error) => {
            alert("Failed to send message. Please try again.");
            sendButton.textContent = originalText;
            sendButton.disabled = false;
            console.error("Error sending email:", error);
        });
    } else {
        alert("Please fill in all fields.");
    }
});

// Gmail Compose Button with animation
document.getElementById("composeMailButton").addEventListener("click", function () {
    this.style.animation = "pulse 0.5s ease-out";
    setTimeout(() => {
        window.open("mailto:bmdnoushad@gmail.com", "_blank");
        this.style.animation = "";
    }, 250);
});

// Add pulse animation if not exists
if (!document.querySelector('style[data-contact-js]')) {
    const style = document.createElement('style');
    style.setAttribute('data-contact-js', 'true');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}
