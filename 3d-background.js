// 3D Background with Floating Geometric Shapes
class ThreeDBackground {
    constructor() {
        this.shapes = [];
        this.shapeCount = 8; // Reduced from 15
        this.canvas = null;
        this.ctx = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationId = null;
        this.init();
    }

    init() {
        this.createCanvas();
        this.createShapes();
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
            z-index: 1;
            opacity: 0.2;
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

    createShapes() {
        for (let i = 0; i < this.shapeCount; i++) {
            this.shapes.push({
                type: ['cube', 'pyramid', 'sphere', 'diamond'][Math.floor(Math.random() * 4)],
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 40 + 20, // Reduced size
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01, // Slower rotation
                speedX: (Math.random() - 0.5) * 0.3, // Slower speed
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.2 + 0.1, // Reduced opacity
                color: this.getRandomColor(),
                pulsePhase: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.01 + 0.005 // Slower pulse
            });
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

    updateShapes() {
        this.shapes.forEach(shape => {
            // Movement
            shape.x += shape.speedX;
            shape.y += shape.speedY;
            shape.rotation += shape.rotationSpeed;
            
            // Pulse
            shape.pulsePhase += shape.pulseSpeed;
            
            // Mouse interaction (reduced range)
            const dx = this.mouseX - shape.x;
            const dy = this.mouseY - shape.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) { // Reduced from 200
                const force = (150 - distance) / 150;
                shape.speedX += (dx / distance) * force * 0.005; // Reduced force
                shape.speedY += (dy / distance) * force * 0.005;
            }
            
            // Wrap around edges
            if (shape.x < -shape.size) shape.x = this.canvas.width + shape.size;
            if (shape.x > this.canvas.width + shape.size) shape.x = -shape.size;
            if (shape.y < -shape.size) shape.y = this.canvas.height + shape.size;
            if (shape.y > this.canvas.height + shape.size) shape.y = -shape.size;
        });
    }

    drawShape(shape) {
        this.ctx.save();
        this.ctx.translate(shape.x, shape.y);
        this.ctx.rotate(shape.rotation);
        
        const pulseFactor = Math.sin(shape.pulsePhase) * 0.2 + 1;
        const actualSize = shape.size * pulseFactor;
        
        // Set style
        this.ctx.strokeStyle = shape.color + shape.opacity + ')';
        this.ctx.lineWidth = 1; // Reduced from 2
        this.ctx.shadowBlur = 10; // Reduced from 20
        this.ctx.shadowColor = shape.color + '0.8)';
        
        switch(shape.type) {
            case 'cube':
                this.drawCube(actualSize);
                break;
            case 'pyramid':
                this.drawPyramid(actualSize);
                break;
            case 'sphere':
                this.drawSphere(actualSize);
                break;
            case 'diamond':
                this.drawDiamond(actualSize);
                break;
        }
        
        this.ctx.restore();
    }

    drawCube(size) {
        const half = size / 2;
        // Front face only
        this.ctx.strokeRect(-half, -half, size, size);
    }

    drawPyramid(size) {
        const half = size / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -half);
        this.ctx.lineTo(-half, half);
        this.ctx.lineTo(half, half);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    drawSphere(size) {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, size/2, 0, Math.PI * 2);
        this.ctx.stroke();
        
        // Reduced latitude lines
        for (let i = 1; i < 3; i++) { // Reduced from 4
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, size/2, size/2 - i * size/8, 0, 0, Math.PI * 2);
            this.ctx.stroke();
        }
        
        // Reduced longitude lines
        for (let i = 0; i < 3; i++) { // Reduced from 4
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, size/2 - i * size/8, size/2, Math.PI/4 * i, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    drawDiamond(size) {
        const half = size / 2;
        this.ctx.beginPath();
        this.ctx.moveTo(0, -half);
        this.ctx.lineTo(half, 0);
        this.ctx.lineTo(0, half);
        this.ctx.lineTo(-half, 0);
        this.ctx.closePath();
        this.ctx.stroke();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.shapes.forEach(shape => {
            this.drawShape(shape);
        });
    }

    animate() {
        this.updateShapes();
        this.draw();
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

// Initialize 3D background
document.addEventListener('DOMContentLoaded', () => {
    new ThreeDBackground();
});
