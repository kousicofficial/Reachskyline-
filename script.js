document.addEventListener('DOMContentLoaded', () => {

    // 1. Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            mobileToggle.classList.toggle('active');
        });
    }

    // 3. Scroll Reveal Animation using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains counters, start them
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    counters.forEach(counter => startCounter(counter));
                }
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    // 4. Counter Animation logic
    function startCounter(el) {
        if (el.dataset.started) return;
        el.dataset.started = true;

        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.innerText = target.toLocaleString() + (target >= 30 ? "+" : "");
                clearInterval(timer);
            } else {
                el.innerText = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    }

    // 5. Testimonial Slider
    const slider = document.querySelector('.testimonial-slider');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function goToSlide(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        if (slider) {
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
            slides.forEach((slide, i) => {
                slide.classList.toggle('active', i === currentSlide);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }
    }
    
    // Set initial active slide
    goToSlide(0);

    if (dots.length > 0) {
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goToSlide(i));
        });

        // Auto slide
        setInterval(() => goToSlide(currentSlide + 1), 5000);
    }



    // 7. Global Floating Emoji System (Optimized & Refined)
    const emojiContainer = document.getElementById('emoji-container');
    const emojis = ['📈', '🚀', '🎯', '📊', '📣', '💰', '🤖', '📧'];
    const emojiCount = 8; // Reduced count

    for (let i = 0; i < emojiCount; i++) {
        const span = document.createElement('span');
        span.className = 'floating-emoji';
        span.innerText = emojis[i % emojis.length];
        
        // Strategic Random Position
        const top = (i * (window.innerHeight / 2)) + Math.random() * 200;
        const left = 5 + Math.random() * 85;
        
        span.style.top = `${top}px`;
        span.style.left = `${left}%`;
        
        const size = 2 + Math.random() * 2;
        span.style.fontSize = `${size}rem`;
        
        if (emojiContainer) emojiContainer.appendChild(span);
        
        // Continuous Floating Motion via CSS (High performance)
        const duration = 15 + Math.random() * 10;
        const delay = i * -2;
        span.style.animation = `floatComplex ${duration}s infinite ease-in-out ${delay}s`;
    }

    // 8. Performance Optimized Parallax (using requestAnimationFrame)
    let ticking = false;
    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const xFactor = (e.clientX / window.innerWidth - 0.5) * 25;
                const yFactor = (e.clientY / window.innerHeight - 0.5) * 25;
                
                const emojiElements = document.querySelectorAll('.floating-emoji');
                emojiElements.forEach((el, i) => {
                    const speed = (i % 3 + 1) * 0.2;
                    el.style.transform = `translate(${xFactor * speed}px, ${yFactor * speed}px)`;
                });

                // Subtle parallax for About Logo
                const aboutLogo = document.querySelector('.about-logo img');
                if (aboutLogo) {
                    aboutLogo.style.transform = `translate(${xFactor * 0.1}px, ${yFactor * 0.1}px)`;
                }

                // Magnetic Industry Items
                const industryItems = document.querySelectorAll('.industry-item');
                industryItems.forEach(item => {
                    const rect = item.getBoundingClientRect();
                    const itemX = (e.clientX - rect.left - rect.width / 2) * 0.05;
                    const itemY = (e.clientY - rect.top - rect.height / 2) * 0.05;
                    item.style.transform = `translate(${itemX}px, ${itemY}px) scale(1.02)`;
                });
                
                ticking = false;
            });
            ticking = true;
        }
    });

    // 9. FAQ Toggle (Bubble Design)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(faq => faq.classList.remove('active'));
            if (!isActive) item.classList.add('active');
        });
    });

    // 8. Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu
                navLinks.classList.remove('show');
                mobileToggle.classList.remove('active');

                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
