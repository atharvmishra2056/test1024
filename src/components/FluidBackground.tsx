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
    // Use RGB values for more precise color control
    color: [number, number, number]; 
    alpha: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

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

    const handleMouseLeave = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        // When mouse leaves, particles tend towards the center
        mouseRef.current = {
          x: rect.width / 2,
          y: rect.height / 2
        };
      }
    };

    const initParticles = () => {
      particlesRef.current = [];
      const numParticles = 60; // Increased particle count for a denser effect
      for (let i = 0; i < numParticles; i++) {
        // Randomly assign one of the two color sets (blue/cyan or yellow/green)
        const isBlueGreen = Math.random() < 0.5; 
        let color: [number, number, number];

        if (isBlueGreen) {
          // Range for blue/cyan
          color = [
            0, // Red component near 0
            Math.floor(Math.random() * 100) + 155, // Green component between 155-255
            Math.floor(Math.random() * 100) + 155  // Blue component between 155-255
          ];
        } else {
          // Range for yellow/green
          color = [
            Math.floor(Math.random() * 100) + 155, // Red component between 155-255
            Math.floor(Math.random() * 100) + 155, // Green component between 155-255
            0  // Blue component near 0
          ];
        }

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5, // Stronger initial velocity for more motion
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 180 + 100, // Even larger, softer blobs
          color: color,
          alpha: 0.2 + Math.random() * 0.1 // Similar alpha, relies on blend mode
        });
      }
    };

    const animate = () => {
      // Clear the canvas with a transparent fill to allow the underlying background to show
      ctx.clearRect(0, 0, canvas.width, canvas.height); 

      // This is crucial for the fluid blending effect
      // 'lighter' adds colors together, creating glowing effects where they overlap
      // 'overlay' or 'screen' can also be experimented with
      ctx.globalCompositeOperation = 'lighter'; 

      particlesRef.current.forEach((particle) => {
        // Mouse influence - make it more direct and strong
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 400) { // Increased interaction radius for broader effect
          const force = (400 - distance) / 400; // Force strength decreases with distance
          if (distance !== 0) {
            particle.vx += (dx / distance) * force * 0.3; // Significantly stronger force
            particle.vy += (dy / distance) * force * 0.3;
          }
        } else {
          // Gently pull particles towards the center when mouse is far away
          particle.vx += (canvas.width / 2 - particle.x) * 0.001;
          particle.vy += (canvas.height / 2 - particle.y) * 0.001;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Damping for smoothing, slightly less damping for more fluid motion
        particle.vx *= 0.94; 
        particle.vy *= 0.94;

        // Boundary handling: wrap around for continuous flow, but with some randomness
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size + Math.random() * 50;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size - Math.random() * 50;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size + Math.random() * 50;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size - Math.random() * 50;


        // Draw particle with radial gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        gradient.addColorStop(0, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha})`);
        gradient.addColorStop(0.6, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha * 0.5})`);
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
      // Maintain original opacity to blend with the existing school-beige/20 to white gradient
      className="absolute inset-0 pointer-events-none opacity-45" 
      aria-hidden="true"
    />
  );
};

export default FluidBackground;
