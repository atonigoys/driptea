console.log('DRIPTEA Landing Page Initialized');

document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    const setTheme = (theme) => {
        htmlElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        setTheme(savedTheme);
    }

    const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle Mobile Menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            header.style.padding = '10px 0';
        } else {
            header.style.backgroundColor = 'rgba(10, 10, 10, 0.9)';
            header.style.padding = '1rem 0';
        }
    });

    // Simple Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');
    const menuImages = document.querySelectorAll('.menu-image');

    menuImages.forEach(img => {
        img.addEventListener('click', () => {
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxImg.classList.add('lightbox-img-zoom');
        });
    });

    const closeLightbox = () => {
        lightbox.style.display = 'none';
        lightboxImg.classList.remove('lightbox-img-zoom');
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Show More / Show Less Logic
    const showMoreBtn = document.getElementById('show-more-btn');
    const extraProducts = document.querySelectorAll('.extra-product');

    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            const isShowing = extraProducts[0].classList.contains('show');
            extraProducts.forEach(product => product.classList.toggle('show'));
            showMoreBtn.textContent = isShowing ? 'Show More' : 'Show Less';
        });
    }

    // Full Menu Carousel Logic
    const menuModal = document.getElementById('menu-modal');
    const viewMenuBtn = document.getElementById('view-menu-btn');
    const menuCloseBtn = document.querySelector('.menu-viewer-close');
    const fullMenuImg = document.getElementById('full-menu-img');
    const menuCounter = document.querySelector('.menu-counter');
    const prevBtn = document.querySelector('.menu-nav-btn.prev');
    const nextBtn = document.querySelector('.menu-nav-btn.next');

    let currentMenuPage = 0;
    const menuPages = ['menu-1.jpg', 'menu-2.jpg', 'menu-3.jpg', 'menu-4.jpg'];

    const updateMenuPage = () => {
        fullMenuImg.src = menuPages[currentMenuPage];
        menuCounter.textContent = `${currentMenuPage + 1} / ${menuPages.length}`;
    };

    const closeMenuModal = () => {
        menuModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (viewMenuBtn) {
        viewMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            menuModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            currentMenuPage = 0;
            updateMenuPage();
        });
    }

    if (menuCloseBtn) menuCloseBtn.addEventListener('click', closeMenuModal);
    if (menuModal) {
        menuModal.addEventListener('click', (e) => {
            if (e.target === menuModal) closeMenuModal();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentMenuPage = (currentMenuPage - 1 + menuPages.length) % menuPages.length;
            updateMenuPage();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentMenuPage = (currentMenuPage + 1) % menuPages.length;
            updateMenuPage();
        });
    }

    // Keyboard support
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
            closeMenuModal();
        }
        if (menuModal && menuModal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        }
    });
});
