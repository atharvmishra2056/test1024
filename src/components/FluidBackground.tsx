// src/components/FluidBackground.tsx
import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
    alpha: number;
    life: number;
    maxLife: number;
  }>>([]);

  const fluidColors = [
    { h: 180, s: 100, l: 50 }, // Cyan
    { h: 240, s: 100, l: 50 }, // Blue
    { h: 60, s: 100, l: 50 },  // Yellow
    { h: 300, s: 100, l: 50 }, // Magenta
  ];
  let colorIndex = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Make the canvas always fill its parent
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles(true);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const bounds = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - bounds.left;
      mouseRef.current.y = e.clientY - bounds.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const initParticles = (clearOnly = false) => {
      particlesRef.current = [];
    };

    const addParticle = (x: number, y: number) => {
      const color = fluidColors[colorIndex % fluidColors.length];
      colorIndex++;
      for (let i = 0; i < 3; i++) {
        const speed = Math.random() * 5 + 2;
        const angle = Math.random() * Math.PI * 2;
        const maxLife = Math.random() * 60 + 100;
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 10,
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 20 + 30,
          hue: color.h + (Math.random() - 0.5) * 30,
          alpha: 0.8,
          life: maxLife,
          maxLife: maxLife,
        });
      }
    };

    const animate = () => {
      // Beige background for trails
      ctx.fillStyle = 'rgba(245, 245, 220, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (mouseRef.current.active) {
        addParticle(mouseRef.current.x, mouseRef.current.y);
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (mouseRef.current.active && distance > 1) {
          const pullForce = 0.05;
          particle.vx += (dx / distance) * pullForce;
          particle.vy += (dy / distance) * pullForce;
        }

        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        particle.alpha = (particle.life / particle.maxLife) * 0.8;
        if (particle.alpha < 0) particle.alpha = 0;

        if (
          particle.life < 0 ||
          particle.x < -particle.size || particle.x > canvas.width + particle.size ||
          particle.y < -particle.size || particle.y > canvas.height + particle.size
        ) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        const alphaFade = particle.alpha;
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alphaFade})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue + 30}, 90%, 60%, ${alphaFade * 0.6})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-40"
      style={{ zIndex: 0 }}
    />
  );
};

export default FluidBackground;
