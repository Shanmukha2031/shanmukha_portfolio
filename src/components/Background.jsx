import React, { useEffect, useRef } from 'react';

const NetworkBackground = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const nodesRef = useRef([]);
  
  class Node {
    constructor(x, y, config) {
      this.config = config;
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * config.nodeSpeed;
      this.vy = (Math.random() - 0.5) * config.nodeSpeed;
      this.size = 1.5; // Smaller nodes for better performance with higher density
    }

    update(width, height) {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x <= 0 || this.x >= width) this.vx *= -1;
      if (this.y <= 0 || this.y >= height) this.vy *= -1;

      const dx = this.x - mousePosRef.current.x;
      const dy = this.y - mousePosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < this.config.mouseRadius) {
        const force = (this.config.mouseRadius - dist) / this.config.mouseRadius;
        const repulsion = this.config.mouseRepulsion * force;
        
        // Stronger repulsion effect
        this.vx += (dx / dist) * repulsion * 2;
        this.vy += (dy / dist) * repulsion * 2;
        
        // Add circular motion around mouse
        this.vx += dy / dist * repulsion;
        this.vy -= dx / dist * repulsion;
      }

      const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (speed > this.config.maxSpeed) {
        this.vx = (this.vx / speed) * this.config.maxSpeed;
        this.vy = (this.vy / speed) * this.config.maxSpeed;
      }

      // More dynamic movement
      this.vx += (Math.random() - 0.5) * 0.3;
      this.vy += (Math.random() - 0.5) * 0.3;
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    contextRef.current = ctx;

    const config = {
      nodeCount: 800, // Significantly increased node count
      nodeSpeed: 1.2,
      maxSpeed: 2.5,
      connectionDistance: 200, // Increased connection distance
      mouseRadius: 200, // Larger mouse influence
      mouseRepulsion: 1.2, // Stronger mouse effect
      backgroundColor: '#1a1a1a',
      nodeColor: '#00ffaa',
      connectionColor: 'rgba(0, 255, 170, 0.3)', // Increased base opacity
      minConnectionOpacity: 0.2 // Higher minimum opacity
    };

    const initNodes = () => {
      nodesRef.current = Array.from({ length: config.nodeCount }, () => 
        new Node(
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
      initNodes();
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      mousePosRef.current = {
        x: (e.clientX - rect.left) * dpr,
        y: (e.clientY + window.scrollY) * dpr
      };
    };

    const handleScroll = () => {
      mousePosRef.current = {
        ...mousePosRef.current,
        y: mousePosRef.current.y + window.scrollY
      };
    };

    const drawNode = (node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
      ctx.fillStyle = config.nodeColor;
      ctx.fill();
    };

    const drawConnections = () => {
      const nodes = nodesRef.current;
      
      // Draw all base connections
      ctx.lineWidth = 0.8; // Thinner lines for better performance
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < config.connectionDistance) {
            // Calculate distance from mouse for additional opacity
            const mouseDx = (nodeA.x + nodeB.x) / 2 - mousePosRef.current.x;
            const mouseDy = (nodeA.y + nodeB.y) / 2 - mousePosRef.current.y;
            const mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
            const mouseInfluence = Math.max(0, 1 - mouseDistance / (config.mouseRadius * 1.5));
            
            // Enhanced opacity calculation
            const normalizedDist = 1 - distance / config.connectionDistance;
            const baseAlpha = Math.max(
              config.minConnectionOpacity,
              normalizedDist * 0.4
            );
            
            // Increase opacity for connections near mouse
            const alpha = baseAlpha + mouseInfluence * 0.3;

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(0, 255, 170, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      // Enhance connections near mouse
      const mouseX = mousePosRef.current.x;
      const mouseY = mousePosRef.current.y;
      
      ctx.lineWidth = 1;
      nodes.forEach((nodeA, i) => {
        const dx = nodeA.x - mouseX;
        const dy = nodeA.y - mouseY;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);
        
        if (distToMouse < config.mouseRadius * 1.5) {
          nodes.slice(i + 1).forEach(nodeB => {
            const distance = Math.sqrt(
              Math.pow(nodeA.x - nodeB.x, 2) + 
              Math.pow(nodeA.y - nodeB.y, 2)
            );
            
            if (distance < config.connectionDistance) {
              const alpha = 0.4 * (1 - distToMouse / (config.mouseRadius * 1.5));
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.strokeStyle = `rgba(0, 255, 170, ${alpha})`;
              ctx.stroke();
            }
          });
        }
      });
    };

    const animate = () => {
      ctx.fillStyle = config.backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      nodesRef.current.forEach(node => node.update(canvas.width, canvas.height));
      drawConnections();
      nodesRef.current.forEach(drawNode);

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

export default NetworkBackground;
