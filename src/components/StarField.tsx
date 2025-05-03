import React, { useEffect, useRef, useState } from 'react';

interface StarFieldProps {
  starCount?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
}

const StarField: React.FC<StarFieldProps> = ({
  starCount = 200,
  minSize = 1,
  maxSize = 3,
  speed = 0.05,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setDimensions({ width: canvas.width, height: canvas.height });
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create stars with varied properties
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * dimensions.width,
      y: Math.random() * dimensions.height,
      size: Math.random() * (maxSize - minSize) + minSize,
      speed: Math.random() * speed + 0.01,
      brightness: Math.random() * 0.5 + 0.5,
      color: Math.random() > 0.7 ? (Math.random() > 0.5 ? 'gold' : 'lightblue') : 'white',
      twinkleSpeed: Math.random() * 0.02 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    // Create shooting stars
    const shootingStars = Array.from({ length: 3 }, () => ({
      x: Math.random() * dimensions.width,
      y: 0,
      length: Math.random() * 80 + 40,
      speed: Math.random() * 15 + 10,
      delay: Math.random() * 5000,
      active: false,
    }));

    let animationFrameId: number;
    let lastTime = 0;
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Draw and animate stars
      stars.forEach(star => {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (0.8 + twinkle * 0.4), 0, Math.PI * 2);
        
        const gradient = ctx.createRadialGradient(
          star.x, star.y, 0,
          star.x, star.y, star.size * 2
        );
        
        const alpha = star.brightness * (0.7 + twinkle * 0.3);
        
        if (star.color === 'gold') {
          gradient.addColorStop(0, `rgba(255, 223, 186, ${alpha})`);
          gradient.addColorStop(1, 'rgba(255, 223, 186, 0)');
        } else if (star.color === 'lightblue') {
          gradient.addColorStop(0, `rgba(186, 223, 255, ${alpha})`);
          gradient.addColorStop(1, 'rgba(186, 223, 255, 0)');
        } else {
          gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Move star
        star.y += star.speed * deltaTime * 0.1;
        
        // Reset if off screen
        if (star.y > dimensions.height) {
          star.y = 0;
          star.x = Math.random() * dimensions.width;
        }
      });

      // Animate shooting stars
      shootingStars.forEach(star => {
        if (!star.active) {
          if (Math.random() < 0.001) {
            star.active = true;
            star.x = Math.random() * dimensions.width;
            star.y = 0;
          }
        } else {
          ctx.beginPath();
          const gradient = ctx.createLinearGradient(
            star.x, star.y,
            star.x + star.length, star.y + star.length
          );
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
          gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.moveTo(star.x, star.y);
          ctx.lineTo(star.x + star.length, star.y + star.length);
          ctx.stroke();
          
          star.x += star.speed;
          star.y += star.speed;
          
          if (star.x > dimensions.width || star.y > dimensions.height) {
            star.active = false;
          }
        }
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate(0);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, starCount, minSize, maxSize, speed]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default StarField;