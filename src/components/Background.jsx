// components/Background.jsx
import React, { useEffect, useRef } from 'react';

const Background = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);

  // Perlin noise implementation
  const noise = (() => {
    const permutation = Array.from({ length: 256 }, (_, i) => i)
      .sort(() => Math.random() - 0.5);

    const p = [...permutation, ...permutation];

    const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
    
    const lerp = (t, a, b) => a + t * (b - a);
    
    const grad = (hash, x, y, z) => {
      const h = hash & 15;
      const u = h < 8 ? x : y;
      const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
      return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    };

    return (x, y, z) => {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      const Z = Math.floor(z) & 255;

      x -= Math.floor(x);
      y -= Math.floor(y);
      z -= Math.floor(z);

      const u = fade(x);
      const v = fade(y);
      const w = fade(z);

      const A = p[X] + Y;
      const AA = p[A] + Z;
      const AB = p[A + 1] + Z;
      const B = p[X + 1] + Y;
      const BA = p[B] + Z;
      const BB = p[B + 1] + Z;

      return lerp(w,
        lerp(v,
          lerp(u, grad(p[AA], x, y, z), grad(p[BA], x - 1, y, z)),
          lerp(u, grad(p[AB], x, y - 1, z), grad(p[BB], x - 1, y - 1, z))
        ),
        lerp(v,
          lerp(u, grad(p[AA + 1], x, y, z - 1), grad(p[BA + 1], x - 1, y, z - 1)),
          lerp(u, grad(p[AB + 1], x, y - 1, z - 1), grad(p[BB + 1], x - 1, y - 1, z - 1))
        )
      );
    };
  })();

  class Particle {
    constructor(x, y, config) {
      this.config = config;
      this.reset(x, y);
    }

    reset(x, y) {
      this.x = x;
      this.y = y;
      this.age = 0;
      this.maxAge = this.config.minAge + Math.random() * (this.config.maxAge - this.config.minAge);
      this.speed = this.config.particleSpeed * (0.8 + Math.random() * 0.4);
      this.vx = 0;
      this.vy = 0;
    }

    update(time, width, height) {
      const angle = noise(
        this.x * this.config.noiseScale,
        this.y * this.config.noiseScale,
        time * this.config.timeScale
      ) * Math.PI * 2;

      // Mouse influence
      const dx = this.x - mousePosRef.current.x;
      const dy = this.y - mousePosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const mouseEffect = Math.max(0, 1 - dist / this.config.mouseRadius);
      
      // make mouse eff strong
      this.vx = Math.cos(angle) * this.speed;
      this.vy = Math.sin(angle) * this.speed;
      
      if (dist < this.config.mouseRadius) {
        //strong replulsion
        this.vx += (dx / dist) * this.config.mouseInfluence;
        this.vy += (dy / dist) * this.config.mouseInfluence;
      
      }
      
      this.x += this.vx;
      this.y += this.vy;
      this.age++;

      if (this.age > this.maxAge || 
          this.x < 0 || this.x > width || 
          this.y < 0 || this.y > height) {
        this.reset(Math.random() * width, Math.random() * height);
      }

      return {
        alpha: Math.sin((this.age / this.maxAge) * Math.PI) * this.config.particleColor.a
      };
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    contextRef.current = ctx;
    let time = 0;

    // Configuration
    const config = {
      particleCount: 2500,
      particleSpeed: 1.2,
      particleSize: 1,
      particleColor: { r: 0, g: 255, b: 170, a: 0.35 }, // Reduced from 0.4 to 0.35,
      noiseScale: 0.003,
      timeScale: 0.0005,
      mouseInfluence: 1.0,
      mouseRadius: 100,
      fadeSpeed: 0.085,
      minAge: 50,
      maxAge: 150
    };

    const initParticles = () => {
      particlesRef.current = Array.from({ length: config.particleCount }, () => 
        new Particle(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          config
        )
      );
    };

    const setCanvasSize = () => {
      const docHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = docHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${docHeight}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };
    
    const handleMouseMove = (e) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    mousePosRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY + window.scrollY) * dpr  // Include scroll position
        };
    };


    const handleScroll = () => {
      const rect = canvas.getBoundingClientRect();
      mousePosRef.current = {
        ...mousePosRef.current,
        y: mousePosRef.current.y + window.scrollY
      };
    };

    const animate = () => {
      ctx.fillStyle = `rgba(26, 26, 26, ${config.fadeSpeed})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.strokeStyle = `rgba(${config.particleColor.r}, ${config.particleColor.g}, 
                             ${config.particleColor.b}, ${config.particleColor.a})`;
      ctx.lineWidth = config.particleSize;

      particlesRef.current.forEach(particle => {
        const { alpha } = particle.update(time, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${config.particleColor.r}, ${config.particleColor.g}, 
                               ${config.particleColor.b}, ${alpha})`;
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x + particle.vx, particle.y + particle.vy);
        ctx.stroke();
      });

      time += config.timeScale;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        background: '#1a1a1a',
      }}
    />
  );
};

export default Background;
