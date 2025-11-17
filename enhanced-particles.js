// Enhanced Particle Animation System with Professional Effects
class AdvancedParticleSystem {
    constructor() {
        this.particles = [];
        this.particleCount = 40; // Reduced from 80
        this.connections = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.canvas = null;
        this.ctx = null;
        this.animationId = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
        this.handleResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 0;
            opacity: 0.4;
        `;
        
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = document.querySelector('.hero').offsetHeight;
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    setupEventListeners() {
        document.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });
    }

    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.6,
                speedY: (Math.random() - 0.5) * 0.6,
                opacity: Math.random() * 0.5 + 0.2,
                pulse: Math.random() * 0.02 + 0.01,
                pulsePhase: Math.random() * Math.PI * 2,
                color: this.getRandomColor(),
                originalSpeedX: 0,
                originalSpeedY: 0,
                life: 1,
                maxLife: Math.random() * 150 + 100 // Reduced life cycle
            });
            
            // Store original speeds
            const particle = this.particles[this.particles.length - 1];
            particle.originalSpeedX = particle.speedX;
            particle.originalSpeedY = particle.speedY;
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(102, 126, 234, ',
            'rgba(240, 147, 251, ',
            'rgba(118, 75, 162, ',
            'rgba(52, 211, 153, ',
            'rgba(251, 191, 36, '
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    updateParticles() {
        this.particles.forEach(particle => {
            // Basic movement
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Mouse interaction (reduced range)
            const dx = this.mouseX - particle.x;
            const dy = this.mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) { // Reduced from 150
                const force = (100 - distance) / 100;
                particle.speedX += (dx / distance) * force * 0.015; // Reduced force
                particle.speedY += (dy / distance) * force * 0.015;
            } else {
                // Return to original speed
                particle.speedX += (particle.originalSpeedX - particle.speedX) * 0.05;
                particle.speedY += (particle.originalSpeedY - particle.speedY) * 0.05;
            }
            
            // Pulse effect
            particle.pulsePhase += particle.pulse;
            const pulseFactor = Math.sin(particle.pulsePhase) * 0.3 + 1;
            particle.currentSize = particle.size * pulseFactor;
            
            // Life cycle
            particle.life -= 1 / particle.maxLife;
            if (particle.life <= 0) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.life = 1;
            }
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
        });
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw connections first (reduced distance)
        this.drawConnections();
        
        // Draw particles
        this.particles.forEach(particle => {
            // Glow effect (simplified)
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.currentSize * 2
            );
            gradient.addColorStop(0, particle.color + particle.opacity + ')');
            gradient.addColorStop(1, particle.color + '0)');
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.currentSize * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            // Core particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.currentSize, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + (particle.opacity * particle.life) + ')';
            this.ctx.fill();
            
            // Add glow (reduced)
            this.ctx.shadowBlur = 10; // Reduced from 20
            this.ctx.shadowColor = particle.color + '0.8)';
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }

    drawConnections() {
        const maxDistance = 80; // Reduced from 120
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.2 * 
                                   this.particles[i].life * this.particles[j].life;
                    
                    // Simplified connection
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(102, 126, 234, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.updateParticles();
        this.drawParticles();
        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

// Initialize enhanced particle system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdvancedParticleSystem();
});
