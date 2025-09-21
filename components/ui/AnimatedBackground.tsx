import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../App';

const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Theme-aware colors
        const particleColor = theme === 'dark' ? 'rgba(147, 197, 253, 0.8)' : 'rgba(96, 165, 250, 0.6)';
        const lineColorBase = theme === 'dark' ? '96, 165, 250' : '59, 130, 246';


        let animationFrameId: number;
        let particles: Particle[] = [];
        const mouseParticle: { x: number | null, y: number | null } = { x: null, y: null };

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
            canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
            initParticles();
        };

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 1;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
            }

            update() {
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
                this.x += this.speedX;
                this.y += this.speedY;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = particleColor;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const density = (canvas.width * canvas.height) / 20000;
            for (let i = 0; i < density && i < 150; i++) {
                particles.push(new Particle());
            }
        };

        const connectParticles = () => {
            if (!ctx) return;
            const maxDistance = 120;
            const allParticles = [...particles];
            if (mouseParticle.x !== null && mouseParticle.y !== null) {
                // Add a temporary particle for the mouse
                allParticles.push({ x: mouseParticle.x, y: mouseParticle.y, size: 0, speedX: 0, speedY: 0, update: () => {}, draw: () => {} });
            }

            for (let a = 0; a < allParticles.length; a++) {
                for (let b = a; b < allParticles.length; b++) {
                    const dx = allParticles[a].x - allParticles[b].x;
                    const dy = allParticles[a].y - allParticles[b].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    if (distance < maxDistance) {
                        ctx.strokeStyle = `rgba(${lineColorBase}, ${1 - distance / maxDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(allParticles[a].x, allParticles[a].y);
                        ctx.lineTo(allParticles[b].x, allParticles[b].y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            connectParticles();
            animationFrameId = requestAnimationFrame(animate);
        };
        
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseParticle.x = e.clientX - rect.left;
            mouseParticle.y = e.clientY - rect.top;
        };
        
        const handleMouseOut = () => {
            mouseParticle.x = null;
            mouseParticle.y = null;
        };

        window.addEventListener('resize', resizeCanvas);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseout', handleMouseOut);
        
        resizeCanvas();
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseout', handleMouseOut);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full -z-10"
        />
    );
};

export default AnimatedBackground;