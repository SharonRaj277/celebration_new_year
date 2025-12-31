
import React, { useRef, useEffect, useCallback } from 'react';

// Diverse color palette for vibrant, colorful butterflies
const COLORS = [
  '#3bb9ff', // Classic Blue
  '#ff3b3b', // Vibrant Red
  '#ff9f3b', // Bright Orange
  '#3bff8d', // Emerald Green
  '#d63bff', // Deep Purple
  '#ff3bad', // Hot Pink
  '#ffd700', // Golden Yellow
  '#00ffff', // Cyan
  '#ff69b4', // Light Pink
  '#8a2be2', // Blue Violet
];

class Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  angle: number;
  rotationSpeed: number;
  seed: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    // Independent random movement from the start
    const moveAngle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1.5;
    this.vx = Math.cos(moveAngle) * speed;
    this.vy = Math.sin(moveAngle) * speed;
    
    this.maxLife = 200 + Math.random() * 100;
    this.life = this.maxLife;
    
    // Select a random color from the diverse palette
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.alpha = 1;
    this.decay = Math.random() * 0.003 + 0.002;
    this.size = Math.random() * 5 + 4; 
    this.angle = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.1;
    this.seed = Math.random() * 100;
  }

  update() {
    // Erratic flight pattern
    this.vx += (Math.random() - 0.5) * 0.5;
    this.vy += (Math.random() - 0.5) * 0.5 - 0.04; // Slight upward drift

    this.x += this.vx;
    this.y += this.vy;

    this.vx *= 0.96;
    this.vy *= 0.96;

    this.angle += this.rotationSpeed;
    this.alpha -= this.decay;
    this.life--;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0) return;
    
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = Math.max(0, this.alpha);
    
    // Flapping is now individual based on seed, no spatial sync
    const flap = Math.cos(Date.now() * 0.012 + this.seed);
    const flapScale = Math.abs(flap);
    const s = this.size;

    const drawSide = (scale: number) => {
      ctx.save();
      ctx.scale(scale * flapScale, 1);

      // 1. Black Border/Frame
      ctx.fillStyle = '#111';
      
      // Upper Wing Border
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 1.5, -s * 2, s * 3, -s * 1.5, s * 2.5, 0.5 * s);
      ctx.lineTo(0, 0);
      ctx.fill();

      // Lower Wing Border
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(s * 2, s * 1.5, s * 1.5, s * 2.5, 0.5 * s, s * 1.5);
      ctx.lineTo(0, 0);
      ctx.fill();

      // 2. Main Color Interior
      ctx.fillStyle = this.color;
      
      // Upper Wing Color
      ctx.beginPath();
      ctx.moveTo(s * 0.2, -s * 0.1);
      ctx.bezierCurveTo(s * 1.2, -s * 1.6, s * 2.4, -s * 1.2, s * 2.1, 0.3 * s);
      ctx.fill();

      // Lower Wing Color
      ctx.beginPath();
      ctx.moveTo(s * 0.2, s * 0.2);
      ctx.bezierCurveTo(s * 1.6, s * 1.2, s * 1.2, s * 2.0, 0.4 * s, s * 1.2);
      ctx.fill();

      // 3. Decorative White Spots
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath(); ctx.arc(s * 2.4, -s * 0.8, s * 0.15, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(s * 2.1, -s * 1.3, s * 0.12, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(s * 1.3, s * 1.8, s * 0.12, 0, Math.PI * 2); ctx.fill();

      ctx.restore();
    };

    drawSide(1);
    drawSide(-1);

    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(0, 0, s * 0.15, s * 1.1, 0, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.8);
    ctx.quadraticCurveTo(-s * 0.3, -s * 1.5, -s * 0.5, -s * 1.3);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.8);
    ctx.quadraticCurveTo(s * 0.3, -s * 1.5, s * 0.5, -s * 1.3);
    ctx.stroke();

    ctx.restore();
  }
}

const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const butterfliesRef = useRef<Butterfly[]>([]);

  const createButterflies = useCallback((x: number, y: number) => {
    // Reduced count from 12 to 5 for a more delicate effect upon interaction
    const count = 5; 
    for (let i = 0; i < count; i++) {
      butterfliesRef.current.push(new Butterfly(x, y));
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const loop = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalCompositeOperation = 'source-over';

      const butterflies = butterfliesRef.current;
      for (let i = 0; i < butterflies.length; i++) {
        const b = butterflies[i];
        b.update();
        b.draw(ctx);

        if (b.alpha <= 0 || b.life <= 0) {
          butterflies.splice(i, 1);
          i--;
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    const interval = setInterval(() => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * (canvas.height * 0.8) + (canvas.height * 0.1);
      createButterflies(x, y);
    }, 3000);

    const handleInteraction = (e: MouseEvent | TouchEvent) => {
      const x = 'clientX' in e ? (e as MouseEvent).clientX : (e as TouchEvent).touches[0].clientX;
      const y = 'clientY' in e ? (e as MouseEvent).clientY : (e as TouchEvent).touches[0].clientY;
      createButterflies(x, y);
    };

    window.addEventListener('mousedown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      cancelAnimationFrame(animationFrameId);
      clearInterval(interval);
    };
  }, [createButterflies]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default FireworksCanvas;
