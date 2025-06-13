import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, active: false }); // Added 'active' to track if mouse is moving
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    hue: number;
    alpha: number;
    life: number; // Added lifespan property
    maxLife: number; // Added max life for fading
  }>>([]);
  
  // A color palette for the fluid effect, focusing on blue/cyan and yellow/green
  const fluidColors = [
    { h: 180, s: 100, l: 50 }, // Cyan
    { h: 220, s: 100, l: 50 }, // Blue
    { h: 60, s: 100, l: 50 },  // Yellow
    { h: 100, s: 100, l: 40 }, // Green
  ];
  let colorIndex = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize particles to adapt to new canvas size
      initParticles(true); 
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const initParticles = (clearOnly = false) => {
      if (clearOnly) {
        particlesRef.current = [];
        return;
      }
      particlesRef.current = []; 
    };

    const addParticle = (x: number, y: number) => {
      const color = fluidColors[colorIndex % fluidColors.length];
      colorIndex++;

      for (let i = 0; i < 3; i++) { // Add multiple smaller particles per mouse move
        const speed = Math.random() * 6 + 3; // Increased initial speed for more dynamic flow
        const angle = Math.random() * Math.PI * 2; // Random direction
        const maxLife = Math.random() * 80 + 120; // Increased particle lifespan for longer trails
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 20, // Slight random offset
          y: y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 25 + 40, // Slightly larger particles for better fluid appearance
          hue: color.h + (Math.random() - 0.5) * 40, // Wider hue variation around the base color
          alpha: 0.9, // Start with high alpha
          life: maxLife,
          maxLife: maxLife,
        });
      }
    };

    const animate = () => {
      // Create subtle trails without darkening the background
      // Use a very low alpha white to gently smudge the canvas, maintaining the underlying light background.
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)'; // Very low alpha white fill for subtle trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // This is crucial for the fluid blending effect, making colors add up and glow
      ctx.globalCompositeOperation = 'lighter'; 

      if (mouseRef.current.active) {
        addParticle(mouseRef.current.x, mouseRef.current.y);
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];

        // Stronger pull towards the mouse for direct following
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouseRef.current.active && distance > 1) {
          const pullForce = 0.07; // Increased pull force
          particle.vx += (dx / distance) * pullForce;
          particle.vy += (dy / distance) * pullForce;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--; 

        // Fade out particle based on remaining life
        particle.alpha = (particle.life / particle.maxLife) * 0.9; 
        if (particle.alpha < 0) particle.alpha = 0;

        // Damping for smooth movement
        particle.vx *= 0.95; 
        particle.vy *= 0.95;
        
        // Remove dead particles or particles that are too far off-screen
        if (particle.life < 0 || 
            particle.x < -particle.size * 2 || particle.x > canvas.width + particle.size * 2 ||
            particle.y < -particle.size * 2 || particle.y > canvas.height + particle.size * 2) {
          particlesRef.current.splice(i, 1);
          continue; 
        }

        // Draw particle with radial gradient for the fluid effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        const currentAlpha = particle.alpha;
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 75%, ${currentAlpha})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue + 30}, 90%, 65%, ${currentAlpha * 0.7})`); 
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Reset globalCompositeOperation after drawing particles
      ctx.globalCompositeOperation = 'source-over';

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave); 

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      // Reduced opacity of the canvas element to blend better with the light background.
      // This allows the underlying section's gradient to remain prominent.
      className="absolute inset-0 pointer-events-none opacity-25" 
      aria-hidden="true"
    />
  );
};

export default FluidBackground;
