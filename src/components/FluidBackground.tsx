// src/components/FluidBackground.tsx
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
  
  // A color palette for the fluid effect
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

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Re-initialize particles on resize to avoid them going off-screen
      // Or simply adjust their positions if they are too far
      // For simplicity, we'll re-init here for now.
      initParticles(true); // Call init with a flag to just clear particles
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Initialize particles (or clear existing ones if already initialized)
    const initParticles = (clearOnly = false) => {
      if (clearOnly) {
        particlesRef.current = [];
        return;
      }
      particlesRef.current = []; // Starting with an empty array as we'll add continuously
    };

    // Function to add new particles
    const addParticle = (x: number, y: number) => {
      const color = fluidColors[colorIndex % fluidColors.length];
      colorIndex++;

      for (let i = 0; i < 3; i++) { // Add multiple smaller particles per mouse move
        const speed = Math.random() * 5 + 2; // Increased initial speed
        const angle = Math.random() * Math.PI * 2; // Random direction
        const maxLife = Math.random() * 60 + 100; // Particle lives longer
        particlesRef.current.push({
          x: x + (Math.random() - 0.5) * 10, // Slight random offset
          y: y + (Math.random() - 0.5) * 10,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 20 + 30, // Smaller particles for fluid look
          hue: color.h + (Math.random() - 0.5) * 30, // Slight hue variation
          alpha: 0.8, // Start with higher alpha
          life: maxLife,
          maxLife: maxLife,
        });
      }
    };

    const animate = () => {
      // Clear canvas with a very slight fade, creating trails
      // Increase rgba alpha for shorter trails, decrease for longer/more smudged trails
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)'; // Adjusted alpha for better trail
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add new particles if mouse is active
      if (mouseRef.current.active) {
        addParticle(mouseRef.current.x, mouseRef.current.y);
      }

      // Update and draw particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];

        // Apply a stronger gravitational pull towards the mouse (optional, but adds dynamism)
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouseRef.current.active && distance > 1) { // Apply pull only if mouse is active and not too close
          const pullForce = 0.05; // Increased pull force
          particle.vx += (dx / distance) * pullForce;
          particle.vy += (dy / distance) * pullForce;
        }

        // Apply constant "fluid" forces (optional, for swirling effect)
        // You can experiment with these values or remove them
        particle.vx *= 0.96; // Damping
        particle.vy *= 0.96;
        
        // Simple "swirl" force (adjust magnitude as needed)
        // particle.vx += Math.sin(particle.y * 0.01) * 0.05;
        // particle.vy += Math.cos(particle.x * 0.01) * 0.05;

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--; // Decrease lifespan

        // Fade out particle
        particle.alpha = (particle.life / particle.maxLife) * 0.8; // Fade based on remaining life
        if (particle.alpha < 0) particle.alpha = 0;


        // Remove particle if it's dead or off-screen (with some padding)
        if (particle.life < 0 || 
            particle.x < -particle.size || particle.x > canvas.width + particle.size ||
            particle.y < -particle.size || particle.y > canvas.height + particle.size) {
          particlesRef.current.splice(i, 1);
          continue; // Skip drawing this particle
        }

        // Draw particle with radial gradient
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        const alphaFade = particle.alpha; // Use faded alpha
        
        gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, ${alphaFade})`);
        gradient.addColorStop(0.5, `hsla(${particle.hue + 30}, 90%, 60%, ${alphaFade * 0.6})`); // More vibrant colors
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas(); // Set initial size
    initParticles(); // Initialize particles (empty array at start)
    animate(); // Start animation loop

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave); // Added to stop spawning when mouse leaves

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
      className="absolute inset-0 pointer-events-none opacity-40" // Increased opacity of the canvas
    />
  );
};

export default FluidBackground;
