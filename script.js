/* ============================================================
   Preeti Growth Agency — script.js (cleaned & fixed)
   ============================================================ */

/* ── 1. AOS (Animate On Scroll) init ── */
AOS.init({
    duration: 1000,
    offset: 200,
    once: true
});

/* ── 2. Popup ──────────────────────────────────────────────── */
/* ✅ Fixed: was defined twice before; single clean version here */
function showPopup() {
    const popup = document.getElementById('offerPopup');
    if (!popup) return;
    /* Only show once per browser session */
    if (sessionStorage.getItem('popupShown')) return;
    popup.style.display = 'flex';
    sessionStorage.setItem('popupShown', 'true');
}

function closePopup() {
    const popup = document.getElementById('offerPopup');
    if (popup) popup.style.display = 'none';
}

/* Show popup 5 seconds after full page load */
window.addEventListener('load', function () {
    setTimeout(showPopup, 5000);
});

/* Close popup when clicking outside the content box */
document.addEventListener('click', function (e) {
    const overlay = document.getElementById('offerPopup');
    if (e.target === overlay) closePopup();
});

/* ── 3. WhatsApp Form ──────────────────────────────────────── */
/* ✅ Fixed: values are now properly encoded with encodeURIComponent */
function sendToWhatsApp() {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();

    if (!name || !phone || !message) {
        alert('Please saari details bharein!');
        return;
    }

    /* Basic phone number validation */
    if (!/^\d{10}$/.test(phone.replace(/\s+/g, ''))) {
        alert('Please ek valid 10-digit phone number dalein.');
        return;
    }

    const whatsappNumber = '918383855004';

    const text = encodeURIComponent(
        `*New Inquiry — Preeti Growth Agency*\n\n` +
        `*Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Service:* ${service}\n` +
        `*Message:* ${message}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
}

/* ── 4. Contact form — prevent default HTML submit ─────────── */
/* ✅ Fixed: was looking for 'agencyForm' which doesn't exist in HTML;
   now targets 'whatsappForm' which matches the actual form ID */
const contactForm = document.getElementById('whatsappForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        sendToWhatsApp();
    });
}

/* ── 5. Smooth scrolling for anchor links ──────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

//* ── ROI Calculator Logic ── */
function calculateROI() {
    // 1. Inputs se values lena
    const dailyBudget = parseFloat(document.getElementById('budget').value) || 0;
    const costPerLead = parseFloat(document.getElementById('quality').value) || 1;

    // 2. Calculation karna
    const dailyLeads = dailyBudget > 0 ? Math.floor(dailyBudget / costPerLead) : 0;
    const monthlyLeads = dailyLeads * 30;
    const monthlyBudgetTotal = dailyBudget * 30;

    // 3. Website par results dikhana
    document.getElementById('leads-output').innerText = dailyLeads;
    document.getElementById('monthly-output').innerText = monthlyLeads;

    // Monthly budget ko comma ke sath professional dikhana (e.g., 15,000)
    document.getElementById('monthly-budget').innerText = Math.round(monthlyBudgetTotal).toLocaleString('en-IN');
}

// Page load hote hi calculation ek baar chal jaye
window.onload = calculateROI;

/* Run once on load so default values show correctly */
document.addEventListener('DOMContentLoaded', calculateROI);

/* ── 7. Quiz ───────────────────────────────────────────────── */
let currentStep = 0;
let totalScore = 0;

const questions = [
    'Kya aapka business Google Maps par hai?',
    'Kya aap Facebook/Instagram par ads chalate hain?',
    'Kya aapke paas professional website hai?',
    'Kya aap daily social media post karte hain?',
    'Kya aapke paas verified leads ka data hai?'
];

function nextQuestion(points) {
    totalScore += points;
    currentStep += 1;

    if (currentStep < questions.length) {
        document.getElementById('question-text').innerText = questions[currentStep];
    } else {
        document.getElementById('question-box').style.display = 'none';
        document.getElementById('score-result').style.display = 'block';
        document.getElementById('final-score').innerText = totalScore;
        document.getElementById('score-msg').innerText = totalScore < 60
            ? 'Aapka business online piche hai! Ise grow karne ki zaroorat hai.'
            : 'Aap sahi raste par hain, lekin scale karne ke liye expert help chahiye!';
    }
}

console.log('✅ Preeti Growth Agency — script.js loaded successfully.');
