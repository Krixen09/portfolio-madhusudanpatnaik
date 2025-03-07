
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SecurityScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x33c3f0, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Create shield geometry (icosahedron)
    const shieldGeometry = new THREE.IcosahedronGeometry(2, 1);
    const shieldMaterial = new THREE.MeshPhongMaterial({
      color: 0x33c3f0,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
      emissive: 0x33c3f0,
      emissiveIntensity: 0.2,
    });
    
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    scene.add(shield);
    
    // Create inner shield
    const innerShieldGeometry = new THREE.IcosahedronGeometry(1.8, 1);
    const innerShieldMaterial = new THREE.MeshPhongMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
    });
    
    const innerShield = new THREE.Mesh(innerShieldGeometry, innerShieldMaterial);
    scene.add(innerShield);
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
      
      // Color
      colors[i] = Math.random() * 0.2 + 0.8; // R: mostly blue
      colors[i + 1] = Math.random() * 0.2 + 0.8; // G: mostly blue
      colors[i + 2] = Math.random() * 0.2 + 0.8; // B: full blue
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    // Handle mouse movement for interactive rotation
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Update shield rotation based on mouse position
      targetX = mouseX * 0.3;
      targetY = mouseY * 0.3;
      shield.rotation.y += 0.05 * (targetX - shield.rotation.y);
      shield.rotation.x += 0.05 * (targetY - shield.rotation.x);
      
      innerShield.rotation.y += 0.05 * (targetX - innerShield.rotation.y) + 0.005;
      innerShield.rotation.x += 0.05 * (targetY - innerShield.rotation.x) + 0.005;
      
      // Rotate particles
      particles.rotation.y += 0.0005;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full absolute top-0 left-0"
    />
  );
};

export default SecurityScene;
