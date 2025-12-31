
import React, { useRef, useEffect } from 'react';

interface HeartBurstProps {
  x: number;
  y: number;
}

class Heart {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
  color: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 4;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed - 2; // Extra upward boost
    this.size = Math.random() * 20 + 10;
    this.alpha = 1;
    this.decay = Math.random() * 0.01 + 0.005;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    const hues = [0, 330, 350, 20]; // Pinks and Reds
    this.color = `hsla(${hues[Math.floor(Math.random() * hues.length)]}, 100%, 65%, 1)`;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.15; // Gravity
    this.alpha -= this.decay;
    this.rotation += this.rotationSpeed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.alpha <= 0) return;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    
    // Heart path
    const s = this.size / 10;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-5 * s, -5 * s, -10 * s, 0, 0, 10 * s);
    ctx.bezierCurveTo(10 * s, 0, 5 * s, -5 * s, 0, 0);
    ctx.fill();
    
    ctx.restore();
  }
}

const HeartBurst: React.FC<HeartBurstProps> = ({ x, y }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heartsRef = useRef<Heart[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initial explosion
    for (let i = 0; i < 40; i++) {
      heartsRef.current.push(new Heart(x, y));
    }

    let animationFrameId: number;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const hearts = heartsRef.current;
      for (let i = 0; i < hearts.length; i++) {
        hearts[i].update();
        hearts[i].draw(ctx);
        if (hearts[i].alpha <= 0) {
          hearts.splice(i, 1);
          i--;
        }
      }
      
      if (hearts.length > 0) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    loop();

    return () => cancelAnimationFrame(animationFrameId);
  }, [x, y]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100]"
    />
  );
};

export default HeartBurst;
