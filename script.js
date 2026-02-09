// ===== Theme Switcher =====
(function() {
    const root = document.documentElement;
    const switcher = document.getElementById('theme-switcher');
    
    function getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    
    function applyTheme(theme) {
        const resolved = theme === 'system' ? getSystemTheme() : theme;
        root.setAttribute('data-theme', resolved);
        
        // Update active button
        switcher.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
        
        // Update navbar scroll color
        const isDark = resolved === 'dark';
        document.querySelector('.navbar').style.background = isDark 
            ? 'rgba(10, 10, 15, 0.8)' 
            : 'rgba(255, 255, 255, 0.85)';
    }
    
    // Load saved preference
    const saved = localStorage.getItem('driftbox-theme') || 'dark';
    applyTheme(saved);
    
    // Button clicks
    switcher.addEventListener('click', (e) => {
        const btn = e.target.closest('.theme-btn');
        if (!btn) return;
        const theme = btn.dataset.theme;
        localStorage.setItem('driftbox-theme', theme);
        applyTheme(theme);
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
        if (localStorage.getItem('driftbox-theme') === 'system') {
            applyTheme('system');
        }
    });
})();

// ===== Smooth scroll for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Waitlist form handling =====
document.querySelectorAll('.waitlist-form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const btn = this.querySelector('button');
        const email = input.value;
        
        // Animate button
        btn.textContent = 'Joining...';
        btn.style.opacity = '0.7';
        
        setTimeout(() => {
            btn.textContent = '✓ You\'re on the list!';
            btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
            btn.style.opacity = '1';
            input.value = '';
            
            setTimeout(() => {
                btn.textContent = 'Get Early Access';
                btn.style.background = '';
            }, 3000);
        }, 1000);
    });
});

// ===== Navbar background on scroll =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    
    if (currentScroll > 50) {
        navbar.style.background = isDark ? 'rgba(10, 10, 15, 0.95)' : 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = isDark ? 'rgba(10, 10, 15, 0.8)' : 'rgba(255, 255, 255, 0.85)';
    }
    
    lastScroll = currentScroll;
});

// ===== Intersection Observer for animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Animate elements on scroll
document.querySelectorAll('.feature-card, .step, .price-card, .problem-stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Stagger animation for grid items
document.querySelectorAll('.features-grid .feature-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.problem-stat').forEach((stat, i) => {
    stat.style.transitionDelay = `${i * 0.1}s`;
});

// ===== Mobile menu toggle =====
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '100%';
        navLinks.style.left = '0';
        navLinks.style.right = '0';
        navLinks.style.flexDirection = 'column';
        navLinks.style.padding = '24px';
        navLinks.style.background = 'rgba(10, 10, 15, 0.98)';
        navLinks.style.borderBottom = '1px solid var(--border)';
    });
}

// ===== Typing effect for hero (subtle) =====
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    heroTitle.style.opacity = '0';
    heroTitle.style.transform = 'translateY(20px)';
    heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    
    setTimeout(() => {
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 200);
}

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    heroSubtitle.style.opacity = '0';
    heroSubtitle.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        heroSubtitle.style.opacity = '1';
    }, 500);
}
