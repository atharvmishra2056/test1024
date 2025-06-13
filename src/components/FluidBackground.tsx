import React, { useEffect, useRef } from 'react';

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    // Changed to specific color components instead of hue for more control
    color: [number, number, number]; // RGB values
    alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to parent element's size
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    // Track mouse position globally (even outside canvas)
    const handleMouseMove = (e: MouseEvent) => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      } else {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    // If mouse leaves the window, let the bubbles follow the last known direction
    const handleMouseLeave = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        mouseRef.current = {
          x: rect.width / 2,
          y: rect.height / 2
        };
      }
    };

    const initParticles = () => {
      particlesRef.current = [];
      // Use two sets of particles for the two main colors (blue/cyan and yellow/green)
      const numParticles = 50; // Increased particle count for denser effect
      for (let i = 0; i < numParticles; i++) {
        const isBlueGreen = Math.random() < 0.5; // Randomly assign blue-green or yellow-green
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1, // Slightly higher initial velocity
          vy: (Math.random() - 0.5) * 1,
          size: Math.random() * 150 + 80, // Larger, softer blobs
          color: isBlueGreen ? [0, Math.floor(Math.random() * 100) + 155, Math.floor(Math.random() * 100) + 155] : // Blue-ish to Cyan-ish (e.g., RGB 0,155-255,155-255)
                   [Math.floor(Math.random() * 100) + 155, Math.floor(Math.random() * 100) + 155, 0], // Yellow-ish to Green-ish (e.g., RGB 155-255,155-255,0)
          alpha: 0.2 + Math.random() * 0.1 // Slightly higher alpha for more visible overlay
        });
      }
    };

    const animate = () => {
      // Keep background dark/transparent, let the blend create the color
      ctx.clearRect(0, 0, canvas.width, canvas.height); 

      // Use a blend mode for fluid effect
      ctx.globalCompositeOperation = 'lighter'; // or 'overlay', 'screen'

      particlesRef.current.forEach((particle) => {
        // Mouse influence - stronger pull
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 300) { // Increased interaction radius
          const force = (300 - distance) / 300;
          if (distance !== 0) {
            particle.vx += (dx / distance) * force * 0.2; // Stronger force
            particle.vy += (dy / distance) * force * 0.2;
          }
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping for smoothing, slightly less damping for more flow
        particle.vx *= 0.95;
        particle.vy *= 0.95;

        // Boundaries - wrap around instead of bounce for continuous flow
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;

        // Draw particle with radial gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha})`);
        gradient.addColorStop(0.7, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha * 0.5})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Reset globalCompositeOperation after drawing particles to avoid affecting other elements
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
      // Reduced opacity to allow the school beige background to show through more, matching original intention
      className="absolute inset-0 pointer-events-none opacity-30" 
      aria-hidden="true"
    />
  );
};

export default FluidBackground;
