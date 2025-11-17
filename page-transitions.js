// Advanced Page Transitions and Loading Effects
class PageTransitions {
    constructor() {
        this.loadingScreen = null;
        this.transitionOverlay = null;
        this.init();
    }

    init() {
        this.createLoadingScreen();
        this.createTransitionOverlay();
        this.setupPageLoad();
        this.setupNavigationTransitions();
    }

    createLoadingScreen() {
        this.loadingScreen = document.createElement('div');
        this.loadingScreen.className = 'loading-screen';
        this.loadingScreen.innerHTML = `
            <div class="loading-content">
                <div class="loading-logo">
                    <span class="loading-text">𝗛𝗲𝘆 𝗦𝘁𝗮𝗹𝗸𝗲𝗿👋🏻</span>
                </div>
                <div class="loading-bar">
                    <div class="loading-progress"></div>
                </div>
                <div class="loading-percentage">0%</div>
            </div>
        `;
        
        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #0f0f23, #1a1a3e, #16213e);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                animation: loadingPulse 2s ease-in-out infinite;
            }
            
            .loading-content {
                text-align: center;
                color: white;
            }
            
            .loading-logo {
                margin-bottom: 2rem;
            }
            
            .loading-text {
                font-size: 2rem;
                font-weight: 800;
                background: linear-gradient(45deg, #667eea, #f093fb, #764ba2);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                animation: logoGlow 2s ease-in-out infinite alternate;
            }
            
            .loading-bar {
                width: 300px;
                height: 4px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 2px;
                overflow: hidden;
                margin: 0 auto 1rem;
            }
            
            .loading-progress {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #f093fb);
                border-radius: 2px;
                width: 0%;
                transition: width 0.3s ease;
                box-shadow: 0 0 10px rgba(102, 126, 234, 0.8);
            }
            
            .loading-percentage {
                font-size: 1.2rem;
                font-weight: 600;
                color: rgba(255, 255, 255, 0.8);
            }
            
            @keyframes loadingPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
            
            @keyframes logoGlow {
                from { filter: drop-shadow(0 0 10px rgba(102, 126, 234, 0.5)); }
                to { filter: drop-shadow(0 0 30px rgba(240, 147, 251, 0.8)); }
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(this.loadingScreen);
    }

    createTransitionOverlay() {
        this.transitionOverlay = document.createElement('div');
        this.transitionOverlay.className = 'transition-overlay';
        this.transitionOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, transparent 0%, rgba(15, 15, 35, 0.95) 100%);
            z-index: 9999;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.6s ease;
        `;
        document.body.appendChild(this.transitionOverlay);
    }

    setupPageLoad() {
        let progress = 0;
        const progressBar = this.loadingScreen.querySelector('.loading-progress');
        const percentageText = this.loadingScreen.querySelector('.loading-percentage');
        
        const loadingInterval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            percentageText.textContent = Math.floor(progress) + '%';
            
            if (progress >= 100) {
                clearInterval(loadingInterval);
                setTimeout(() => {
                    this.hideLoadingScreen();
                }, 500);
            }
        }, 100);
    }

    hideLoadingScreen() {
        this.loadingScreen.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        this.loadingScreen.style.opacity = '0';
        this.loadingScreen.style.transform = 'scale(1.1)';
        
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
        }, 800);
    }

    setupNavigationTransitions() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    this.showTransition();
                    
                    setTimeout(() => {
                        const target = document.querySelector(href);
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                        this.hideTransition();
                    }, 600);
                }
            });
        });
    }

    showTransition() {
        this.transitionOverlay.style.opacity = '1';
    }

    hideTransition() {
        this.transitionOverlay.style.opacity = '0';
    }

    // Section reveal animations
    setupSectionReveals() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-revealed');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('section').forEach(section => {
            section.classList.add('section-hidden');
            observer.observe(section);
        });

        // Add section reveal styles
        const style = document.createElement('style');
        style.textContent = `
            .section-hidden {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s ease;
            }
            
            .section-revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .section-hidden:nth-child(even) {
                transform: translateX(-50px);
            }
            
            .section-hidden:nth-child(odd) {
                transform: translateX(50px);
            }
            
            .section-revealed:nth-child(even),
            .section-revealed:nth-child(odd) {
                transform: translateX(0) translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
}

// Floating Action Button
class FloatingActionButton {
    constructor() {
        this.fab = null;
        this.init();
    }

    init() {
        this.createFAB();
        this.setupEventListeners();
    }

    createFAB() {
        this.fab = document.createElement('div');
        this.fab.className = 'fab';
        this.fab.innerHTML = `
            <div class="fab-main">
                <i class="fas fa-rocket"></i>
            </div>
            <div class="fab-menu">
                <div class="fab-item" data-action="top">
                    <i class="fas fa-arrow-up"></i>
                    <span>Back to Top</span>
                </div>
                <div class="fab-item" data-action="theme">
                    <i class="fas fa-moon"></i>
                    <span>Toggle Theme</span>
                </div>
                <div class="fab-item" data-action="share">
                    <i class="fas fa-share-alt"></i>
                    <span>Share</span>
                </div>
            </div>
        `;
        
        // Add FAB styles
        const style = document.createElement('style');
        style.textContent = `
            .fab {
                position: fixed;
                bottom: 30px;
                right: 30px;
                z-index: 1000;
            }
            
            .fab-main {
                width: 60px;
                height: 60px;
                background: linear-gradient(45deg, #667eea, #f093fb);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
                transition: all 0.3s ease;
                position: relative;
                z-index: 2;
            }
            
            .fab-main:hover {
                transform: scale(1.1) rotate(15deg);
                box-shadow: 0 15px 40px rgba(102, 126, 234, 0.7);
            }
            
            .fab-main.active {
                transform: rotate(45deg);
            }
            
            .fab-menu {
                position: absolute;
                bottom: 70px;
                right: 0;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease;
            }
            
            .fab-menu.active {
                opacity: 1;
                pointer-events: all;
            }
            
            .fab-item {
                display: flex;
                align-items: center;
                justify-content: flex-end;
                margin-bottom: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
            }
            
            .fab-item:hover {
                transform: translateX(-10px);
            }
            
            .fab-item i {
                width: 45px;
                height: 45px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 1.1rem;
            }
            
            .fab-item span {
                margin-right: 15px;
                color: white;
                font-weight: 500;
                opacity: 0;
                transition: opacity 0.3s ease;
                white-space: nowrap;
            }
            
            .fab-menu.active .fab-item span {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(this.fab);
    }

    setupEventListeners() {
        const fabMain = this.fab.querySelector('.fab-main');
        const fabMenu = this.fab.querySelector('.fab-menu');
        
        fabMain.addEventListener('click', () => {
            fabMain.classList.toggle('active');
            fabMenu.classList.toggle('active');
        });

        const fabItems = this.fab.querySelectorAll('.fab-item');
        fabItems.forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                this.handleAction(action);
                
                // Close menu
                fabMain.classList.remove('active');
                fabMenu.classList.remove('active');
            });
        });
    }

    handleAction(action) {
        switch(action) {
            case 'top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;
            case 'theme':
                this.toggleTheme();
                break;
            case 'share':
                this.shareWebsite();
                break;
        }
    }

    toggleTheme() {
        document.body.classList.toggle('light-theme');
    }

    shareWebsite() {
        if (navigator.share) {
            navigator.share({
                title: 'Umar El-Mahdi | Full Stack Developer',
                text: 'Check out my amazing portfolio website!',
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            this.showNotification('Link copied to clipboard!');
        }
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'fab-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            z-index: 1001;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Initialize all advanced features
document.addEventListener('DOMContentLoaded', () => {
    new PageTransitions();
    new FloatingActionButton();
    
    // Setup section reveals after a short delay
    setTimeout(() => {
        const transitions = new PageTransitions();
        transitions.setupSectionReveals();
    }, 1000);
});
