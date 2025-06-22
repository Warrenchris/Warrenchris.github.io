
// Dark Mode Toggle
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    // Save user preference
    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem("theme", "dark");
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
} else {
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}

// Dynamic Year in Footer
document.getElementById("current-year").textContent = new Date().getFullYear();

// Smooth Scrolling for Navigation
document.querySelectorAll("nav a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Profile Card Flip
const profileCard = document.querySelector(".profile-card");
profileCard.addEventListener("click", () => {
    profileCard.querySelector(".card-inner").style.transform = 
        profileCard.querySelector(".card-inner").style.transform === "rotateY(180deg)" ? "rotateY(0deg)" : "rotateY(180deg)";
});

// Profile Card Mouse Tracking (for 3D effect)
const profileCardContainer = document.querySelector(".profile-card-container");
profileCardContainer.addEventListener("mousemove", (e) => {
    const rect = profileCardContainer.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    profileCard.style.transform = `perspective(1000px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg)`;
});

profileCardContainer.addEventListener("mouseleave", () => {
    profileCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
});
// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Add fade-in animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .certification-card, .timeline-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

