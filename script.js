// Test karne ke liye ki JS file chal rahi hai ya nahi
console.log("JS file successfully load ho gayi hai!");

function showPopup() {
    const popup = document.getElementById('offerPopup');
    if (popup) {
        popup.style.display = 'flex';
        console.log("Popup display ab FLEX ho gaya hai");
    } else {
        console.error("Error: 'offerPopup' wali ID nahi mili!");
    }
}

// Bina window.onload ke direct try karte hain
setTimeout(showPopup, 3000); // 3 seconds baad pakka chalega

function closePopup() {
    document.getElementById('offerPopup').style.display = 'none';
}// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    offset: 200,
    once: true
});

// Form Submission (Dummy)
document.getElementById('agencyForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you! Preeti Growth Agency team will contact you soon.');
    this.reset();
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function sendToWhatsApp() {
    // 1. Data collect karna
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value;

    // 2. Validation (Check karna ki fields khali toh nahi)
    if (name === "" || phone === "" || message === "") {
        alert("Please saari details bharein!");
        return;
    }

    // 3. WhatsApp Message taiyar karna
    const whatsappNumber = "918383855004"; // Aapka number

    // Message format (URL encoded)
    const encodedMessage = `*New Inquiry - Preeti Growth Agency*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Service:* ${service}%0A` +
        `*Message:* ${message}`;

    // 4. WhatsApp open karna
    const url = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank').focus();
}
// Function to show popup
function showPopup() {
    const popup = document.getElementById('offerPopup');
    if (popup && !sessionStorage.getItem('popupShown')) {
        popup.style.display = 'flex';
        sessionStorage.setItem('popupShown', 'true');
    }
}

// Ye tarika sabse safe hai, ye dusre scripts ko disturb nahi karega
window.addEventListener('load', function () {
    setTimeout(showPopup, 5000); // 5 seconds baad dikhayega
});

function closePopup() {
    document.getElementById('offerPopup').style.display = 'none';
}