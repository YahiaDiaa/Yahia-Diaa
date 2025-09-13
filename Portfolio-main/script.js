window.addEventListener('load', function () {
    document.querySelector('.loader').classList.add('hidden');
    initApp();
});

function initApp() {
    // Mobile Navigation Toggle
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('toggle');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.style.overflow = '';
            }
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });

    // Back to top
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');
    });

    // Animations
    const skillCards = document.querySelectorAll('.skill-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const projectCards = document.querySelectorAll('.project-card');
    const contactItems = document.querySelectorAll('.contact-item, .social-links-container');

    function animateOnScroll() {
        const triggerBottom = window.innerHeight * 0.85;
        skillCards.forEach(card => {
            if (card.getBoundingClientRect().top < triggerBottom) {
                card.classList.add('animate');
                const bar = card.querySelector('.skill-bar');
                if (bar && bar.style.width === '') {
                    bar.style.width = bar.getAttribute('data-percent');
                }
            }
        });
        timelineItems.forEach(item => {
            if (item.getBoundingClientRect().top < triggerBottom) item.classList.add('animate');
        });
        projectCards.forEach(card => {
            if (card.getBoundingClientRect().top < triggerBottom) card.classList.add('animate');
        });
        contactItems.forEach((item, index) => {
            if (item.getBoundingClientRect().top < triggerBottom) {
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 100);
            }
        });
    }
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Contact form
    const form = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let valid = true;

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        // Name validation
        if (name.value.trim() === '') {
            nameError.style.display = 'block';
            valid = false;
        } else {
            nameError.style.display = 'none';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            emailError.style.display = 'block';
            valid = false;
        } else {
            emailError.style.display = 'none';
        }

        // Message validation
        if (message.value.trim() === '') {
            messageError.style.display = 'block';
            valid = false;
        } else {
            messageError.style.display = 'none';
        }

        if (valid) {
            // Log form submission (for development purposes)
            console.log('Form submitted:', { 
                name: name.value, 
                email: email.value, 
                subject: subject.value, 
                message: message.value 
            });
            
            // Create mailto link
            const mailtoLink = `mailto:khaledhawash143@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent("From: " + name.value + " (" + email.value + ")\n\n" + message.value)}`;

            // Open Gmail or default mail app
            window.location.href = mailtoLink;

            // Show toast
            showToast("✅ Redirecting to your email app...");
            form.reset();
        }
    });

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('visible');
        setTimeout(() => toast.classList.remove('visible'), 3000);
    }
}
