import React, { useEffect, useRef } from 'react';

// Define a Particle interface to describe the properties of each fluid element
interface Particle {
  x: number;
  y: number;
  vx: number; // velocity x
  vy: number; // velocity y
  ax: number; // acceleration x
  ay: number; // acceleration y
  size: number;
  color: [number, number, number]; // RGB color components
  alpha: number; // Transparency
}

const FluidBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  // Store mouse position and whether the mouse is currently interacting with the canvas
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0, active: false }); 
  const particlesRef = useRef<Particle[]>([]);

  // EXPANDED COLOR PALETTE: Using vibrant colors for a dynamic effect
  const fluidColors = [
    [0, 200, 255],   // Bright Cyan
    [50, 150, 255],  // Bright Blue
    [255, 255, 50],  // Bright Yellow
    [180, 255, 50],  // Lively Green
    [255, 100, 100], // Soft Red/Pink
    [255, 50, 150],  // Magenta/Pink
    [255, 150, 50],  // Orange
    [150, 50, 255],  // Purple
  ];

  // A counter to cycle through the fluidColors array for mouse-driven particles
  let colorCycleIndex = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust canvas size to match the parent element's dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
      // Re-initialize particles to spread them across the new dimensions
      initParticles(); 
    };

    // Update mouse position and set active flag
    const handleMouseMove = (e: MouseEvent) => {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
      } else {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
      mouseRef.current.active = true;
    };

    // Deactivate mouse when it leaves the canvas area
    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    // Initialize particles across the canvas
    const initParticles = () => {
      particlesRef.current = [];
      const numInitialParticles = 150; 
      for (let i = 0; i < numInitialParticles; i++) {
        // Pick a random color from the expanded palette for initial particles
        const color = fluidColors[Math.floor(Math.random() * fluidColors.length)];

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1.5, // Initial velocity
          vy: (Math.random() - 0.5) * 1.5,
          ax: 0, // Initial acceleration
          ay: 0,
          size: Math.random() * 20 + 10,
          color: [...color],
          // MODIFICATION: Increased initial alpha for more color presence
          alpha: 0.2 + Math.random() * 0.1, 
        });
      }
    };

    // The main animation loop
    const animate = () => {
      // Clear canvas using 'source-over' with a very faint, almost transparent dark color.
      ctx.globalCompositeOperation = 'source-over';
      // MODIFICATION: Slightly increased alpha for a faster fade, preventing clutter
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // MODIFICATION: Changed blend mode from 'screen' to 'lighten'
      // This is the key change to prevent colors from adding up to white.
      ctx.globalCompositeOperation = 'lighten'; 

      // If mouse is active, add new "force" particles at the mouse position
      if (mouseRef.current.active) {
        const mouseVx = mouseRef.current.x - mouseRef.current.px;
        const mouseVy = mouseRef.current.y - mouseRef.current.py;

        const color = fluidColors[colorCycleIndex % fluidColors.length];
        colorCycleIndex = (colorCycleIndex + 1) % fluidColors.length;

        for (let i = 0; i < 7; i++) {
          particlesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 20,
            y: mouseRef.current.y + (Math.random() - 0.5) * 20,
            vx: mouseVx * 0.4 + (Math.random() - 0.5) * 4,
            vy: mouseVy * 0.4 + (Math.random() - 0.5) * 4,
            ax: 0, ay: 0,
            size: Math.random() * 25 + 8,
            color: [...color],
            // MODIFICATION: Increased alpha for more vibrant mouse trails
            alpha: 0.7, 
          });
        }
      } else {
        if (Math.random() < 0.1) {
          const randomColor = fluidColors[Math.floor(Math.random() * fluidColors.length)];
          particlesRef.current.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            ax: 0, ay: 0,
            size: Math.random() * 15 + 5,
            color: [...randomColor],
            alpha: 0.05 + Math.random() * 0.05,
          });
        }
      }

      // Update and draw each particle
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];

        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 1) {
            const forceStrength = 0.02;
            particle.ax += (dx / distance) * forceStrength;
            particle.ay += (dy / distance) * forceStrength;
          }
        } else {
            particle.ax += (canvas.width / 2 - particle.x) * 0.0001;
            particle.ay += (canvas.height / 2 - particle.y) * 0.0001;
        }

        particle.vx += particle.ax;
        particle.vy += particle.ay;

        particle.vx *= 0.96;
        particle.vy *= 0.96;
        particle.ax *= 0.85;
        particle.ay *= 0.85;

        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // MODIFICATION: Adjusted alpha decay to keep colors on screen a bit longer
        particle.alpha *= mouseRef.current.active ? 0.985 : 0.992; 

        if (particle.alpha < 0.005) {
          particlesRef.current.splice(i, 1);
          continue; 
        }

        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        gradient.addColorStop(0, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha})`);
        gradient.addColorStop(0.5, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha * 0.6})`);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); 
        ctx.fill();
      }

      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;

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
      className="absolute inset-0 pointer-events-none opacity-50" 
      aria-hidden="true"
    />
  );
};

export default FluidBackground;
