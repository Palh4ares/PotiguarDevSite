/* 
    PotiguarDev v2.0 
*/

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 50) {
                el.classList.add('active');
            }
        });
    };

    // Using Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // 2. Navbar Dynamic Background
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 12, 16, 0.95)';
            navbar.style.height = '70px';
        } else {
            navbar.style.background = 'rgba(10, 12, 16, 0.7)';
            navbar.style.height = '80px';
        }
    });

    // 3. Mobile Menu Toggle (Basic)
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#0a0c10';
                navLinks.style.flexDirection = 'column';
                navLinks.style.padding = '2rem';
                navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.1)';
            }
        });
    }

    // 4. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 968) {
                    navLinks.style.display = 'none';
                }
            }
        });
    });

    // 5. Team Slider Logic (v2.1)
    const slider = document.getElementById('teamSlider');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (slider && prevBtn && nextBtn) {
        const scrollAmount = 300; // Adjust based on card width + gap

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Hide buttons or change opacity based on scroll position
        slider.addEventListener('scroll', () => {
            const isAtStart = slider.scrollLeft === 0;
            const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1;

            prevBtn.style.opacity = isAtStart ? '0.3' : '1';
            prevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

            nextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            nextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        });
    }

    // 6. Initialize Lucide Icons
    const initIcons = () => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
            console.log('Lucide icons initialized');
        } else {
            console.error('Lucide library not found');
        }
    };

    initIcons();
    // Fallback for slow loading
    setTimeout(initIcons, 500);

    // 7. Gallery Slider Logic
    const gallerySlider = document.getElementById('gallerySlider');
    const galleryPrevBtn = document.querySelector('.gallery-btn.prev');
    const galleryNextBtn = document.querySelector('.gallery-btn.next');

    if (gallerySlider && galleryPrevBtn && galleryNextBtn) {
        const scrollAmount = 400; 

        galleryNextBtn.addEventListener('click', () => {
            gallerySlider.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        galleryPrevBtn.addEventListener('click', () => {
            gallerySlider.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        gallerySlider.addEventListener('scroll', () => {
            const isAtStart = gallerySlider.scrollLeft === 0;
            const isAtEnd = gallerySlider.scrollLeft + gallerySlider.clientWidth >= gallerySlider.scrollWidth - 1;

            galleryPrevBtn.style.opacity = isAtStart ? '0.3' : '1';
            galleryPrevBtn.style.pointerEvents = isAtStart ? 'none' : 'auto';

            galleryNextBtn.style.opacity = isAtEnd ? '0.3' : '1';
            galleryNextBtn.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        });
    }
});
