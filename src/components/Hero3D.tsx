import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FloatingBook = () => {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(t / 4) / 8;
    mesh.current.rotation.y = Math.sin(t / 4) / 8;
    mesh.current.position.y = (1 + Math.sin(t / 1.5)) / 10;
  });

  return (
    <group ref={mesh}>
      {/* Stylized Book Cover */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 4, 0.5]} />
        <meshStandardMaterial color="#10b981" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Pages */}
      <mesh position={[0.1, 0, 0]}>
        <boxGeometry args={[2.8, 3.8, 0.45]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* Spine */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[0.1, 4, 0.55]} />
        <meshStandardMaterial color="#065f46" />
      </mesh>
    </group>
  );
};

const BackgroundElements = () => {
  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Sphere args={[1, 32, 32]} position={[-5, 2, -5]}>
          <MeshDistortMaterial color="#34d399" speed={2} distort={0.4} />
        </Sphere>
      </Float>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Sphere args={[0.5, 32, 32]} position={[6, -3, -2]}>
          <MeshDistortMaterial color="#6ee7b7" speed={3} distort={0.6} />
        </Sphere>
      </Float>
    </>
  );
};

export const Hero3D = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
          <FloatingBook />
        </Float>
        
        <BackgroundElements />
      </Canvas>
    </div>
  );
};
