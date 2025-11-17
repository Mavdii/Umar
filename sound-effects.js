// Interactive Sound Effects System
class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.init();
    }

    init() {
        // Initialize Web Audio API
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.createSounds();
            this.setupEventListeners();
        } catch (error) {
            console.log('Web Audio API not supported');
        }
    }

    createSounds() {
        // Create different sound effects using Web Audio API
        this.sounds = {
            hover: () => this.createHoverSound(),
            click: () => this.createClickSound(),
            typing: () => this.createTypingSound(),
            scroll: () => this.createScrollSound(),
            achievement: () => this.createAchievementSound()
        };
    }

    createHoverSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, this.audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    createClickSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    createTypingSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(1000 + Math.random() * 500, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.05, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.02);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.02);
    }

    createScrollSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(200, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.05);
        
        gainNode.gain.setValueAtTime(0.03, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.05);
    }

    createAchievementSound() {
        if (!this.audioContext) return;
        
        const notes = [523.25, 659.25, 783.99]; // C, E, G
        notes.forEach((frequency, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.3);
            }, index * 100);
        });
    }

    playSound(soundName) {
        if (this.sounds[soundName]) {
            this.sounds[soundName]();
        }
    }

    setupEventListeners() {
        // Enable audio on first user interaction
        document.addEventListener('click', () => {
            if (this.audioContext && this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
        }, { once: true });

        // Hover sounds
        const hoverElements = document.querySelectorAll('a, button, .btn, .social-link, .nav-link');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.playSound('hover');
            });
        });

        // Click sounds
        const clickElements = document.querySelectorAll('button, .btn, .social-link');
        clickElements.forEach(element => {
            element.addEventListener('click', () => {
                this.playSound('click');
            });
        });

        // Scroll sound (throttled)
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                this.playSound('scroll');
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                }, 100);
            }
        });
    }
}

// Initialize sound effects
document.addEventListener('DOMContentLoaded', () => {
    new SoundEffects();
});
