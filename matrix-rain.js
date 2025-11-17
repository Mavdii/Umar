// Matrix Rain Effect for Code Window
class MatrixRain {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.drops = [];
        this.fontSize = 14;
        this.columns = 0;
        this.init();
    }

    init() {
        this.createCanvas();
        this.setupDrops();
        this.animate();
        this.handleResize();
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 2;
            opacity: 0.1;
        `;
        
        const codeWindow = document.querySelector('.code-content');
        if (codeWindow) {
            codeWindow.appendChild(this.canvas);
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
    }

    resize() {
        const codeContent = document.querySelector('.code-content');
        if (codeContent) {
            this.canvas.width = codeContent.offsetWidth;
            this.canvas.height = codeContent.offsetHeight;
            this.columns = Math.floor(this.canvas.width / this.fontSize);
            this.setupDrops();
        }
    }

    handleResize() {
        window.addEventListener('resize', () => {
            this.resize();
        });
    }

    setupDrops() {
        this.drops = [];
        for (let i = 0; i < this.columns; i++) {
            this.drops[i] = Math.random() * -100;
        }
    }

    drawMatrix() {
        this.ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.fillStyle = '#34d399';
        this.ctx.font = `${this.fontSize}px monospace`;
        
        for (let i = 0; i < this.drops.length; i++) {
            const text = String.fromCharCode(Math.random() * 128);
            const x = i * this.fontSize;
            const y = this.drops[i] * this.fontSize;
            
            this.ctx.fillText(text, x, y);
            
            if (y > this.canvas.height && Math.random() > 0.975) {
                this.drops[i] = 0;
            }
            
            this.drops[i]++;
        }
    }

    animate() {
        this.drawMatrix();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize Matrix Rain
document.addEventListener('DOMContentLoaded', () => {
    new MatrixRain();
});
