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

  // Define the two main color groups observed in the reference image
  // Adjusted for higher brightness and saturation to stand out more
  const colorGroup1 = [
    [0, 200, 255], // Brighter Cyan
    [50, 150, 255], // Brighter Blue
  ];
  const colorGroup2 = [
    [255, 255, 50],   // Brighter Yellow
    [180, 255, 50],   // Brighter Greenish Yellow
  ];

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
      const numInitialParticles = 200; // Increased initial particle count for a denser field
      for (let i = 0; i < numInitialParticles; i++) {
        // Randomly assign particles to one of the two color groups
        const isGroup1 = Math.random() < 0.5;
        const colors = isGroup1 ? colorGroup1 : colorGroup2;
        const color = colors[Math.floor(Math.random() * colors.length)];

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2, // Higher initial velocity for more motion
          vy: (Math.random() - 0.5) * 2,
          ax: 0, // Initial acceleration
          ay: 0,
          size: Math.random() * 25 + 15, // Slightly larger base size for better visibility
          color: [...color], // Copy array to avoid direct mutation
          alpha: 0.15 + Math.random() * 0.08, // Higher initial alpha for more visible particles
        });
      }
    };

    // The main animation loop
    const animate = () => {
      // Clear canvas using 'source-over' with a very faint, almost transparent dark color.
      // This creates subtle trails that don't excessively darken the light background.
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'; // Very low alpha black for subtle trails
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set blend mode to 'screen' or 'lighter' for additive color blending.
      // 'screen' can work well to blend bright colors on a light background.
      ctx.globalCompositeOperation = 'screen'; // Changed from 'lighter' to 'screen'

      // If mouse is active, add new "force" particles at the mouse position
      if (mouseRef.current.active) {
        // Calculate velocity of the mouse for inherited motion
        const mouseVx = mouseRef.current.x - mouseRef.current.px;
        const mouseVy = mouseRef.current.y - mouseRef.current.py;

        // Determine which color group to use based on mouse X position
        const currentColorGroup = mouseRef.current.x < canvas.width / 2 ? colorGroup1 : colorGroup2;
        const color = currentColorGroup[Math.floor(Math.random() * currentColorGroup.length)];

        // Add multiple smaller particles right at the mouse position
        for (let i = 0; i < 7; i++) { // Increased to 7 particles per frame for denser emission
          particlesRef.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 20, // Slight random offset
            y: mouseRef.current.y + (Math.random() - 0.5) * 20,
            vx: mouseVx * 0.4 + (Math.random() - 0.5) * 4, // More inherited velocity, higher scatter
            vy: mouseVy * 0.4 + (Math.random() - 0.5) * 4,
            ax: 0, ay: 0,
            size: Math.random() * 25 + 8, // Smaller new particles
            color: [...color],
            alpha: 0.5, // Higher initial alpha for new particles to be more visible
          });
        }
      }

      // Update and draw each particle
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const particle = particlesRef.current[i];

        // Apply a stronger pull towards the mouse for direct following
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x;
          const dy = mouseRef.current.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 1) {
            const forceStrength = 0.02; // Stronger pull for responsiveness
            particle.ax += (dx / distance) * forceStrength;
            particle.ay += (dy / distance) * forceStrength;
          }
        } else {
            // Gentle pull towards center when mouse is inactive
            particle.ax += (canvas.width / 2 - particle.x) * 0.0001;
            particle.ay += (canvas.height / 2 - particle.y) * 0.0001;
        }

        // Update velocity based on acceleration
        particle.vx += particle.ax;
        particle.vy += particle.ay;

        // Apply damping (friction) to velocity and acceleration
        particle.vx *= 0.96; // Adjusted damping for a balance of flow and fade
        particle.vy *= 0.96;
        particle.ax *= 0.85; // Dampen acceleration more aggressively for smoother changes
        particle.ay *= 0.85;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Reduce alpha over time for fading trails
        particle.alpha *= 0.98; // Faster alpha decay for more dynamic, less persistent small particles
        if (particle.alpha < 0.005) { // Remove particles if they become too transparent
          particlesRef.current.splice(i, 1);
          continue; 
        }

        // Boundary wrap around to keep particles on screen
        if (particle.x < -particle.size) particle.x = canvas.width + particle.size;
        if (particle.x > canvas.width + particle.size) particle.x = -particle.size;
        if (particle.y < -particle.size) particle.y = canvas.height + particle.size;
        if (particle.y > canvas.height + particle.size) particle.y = -particle.size;
        
        // Draw particle as a radial gradient for a soft glow
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size
        );
        
        // Use full alpha for color stop 0 to ensure initial brightness, then fade
        gradient.addColorStop(0, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha * 1.0})`); // Full alpha at center
        gradient.addColorStop(0.5, `rgba(${particle.color[0]}, ${particle.color[1]}, ${particle.color[2]}, ${particle.alpha * 0.6})`); // Fade to 60% alpha
        gradient.addColorStop(1, 'transparent'); // Fully transparent at edge

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2); 
        ctx.fill();
      }

      // Store current mouse position for calculating velocity in the next frame
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;

      // Request next animation frame for a smooth loop
      animationRef.current = requestAnimationFrame(animate);
    };

    // Set up initial canvas size and start animation
    resizeCanvas();
    initParticles(); // Populate with initial particles
    animate(); 

    // Add event listeners for dynamic resizing and mouse interaction
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave); 

    // Cleanup function to remove event listeners and cancel animation frame
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
      // Overall opacity of the canvas element. This allows the section's background to show through.
      // Adjusted slightly higher to make the effect more prominent.
      className="absolute inset-0 pointer-events-none opacity-50" 
      aria-hidden="true"
    />
  );
};

export default FluidBackground;
