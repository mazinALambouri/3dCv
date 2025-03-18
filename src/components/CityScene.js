import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Sky } from '@react-three/drei';
import * as THREE from 'three';

function Mountain({ position, height, radius }) {
  return (
    <group position={position}>
      {/* Main mountain body */}
      <mesh>
        <coneGeometry args={[radius, height, 32]} />
        <meshStandardMaterial 
          color="#2ecc71"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      {/* Snow cap */}
      <mesh position={[0, height * 0.8, 0]}>
        <coneGeometry args={[radius * 0.6, height * 0.2, 32]} />
        <meshStandardMaterial 
          color="#ecf0f1"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>
    </group>
  );
}

function Island() {
  const islandRef = useRef();
  const mountains = [];

  // Create mountains
  for (let i = 0; i < 20; i++) {
    const height = Math.random() * 15 + 5;
    const radius = Math.random() * 4 + 3;
    const position = [
      (Math.random() - 0.5) * 30,
      0,
      (Math.random() - 0.5) * 30,
    ];
    mountains.push({ height, radius, position });
  }

  return (
    <group ref={islandRef}>
      {/* Island ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <circleGeometry args={[35, 64]} />
        <meshStandardMaterial 
          color="#27ae60"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Beach sand */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <ringGeometry args={[35, 40, 64]} />
        <meshStandardMaterial 
          color="#f1c40f"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Mountains */}
      {mountains.map((mountain, index) => (
        <Mountain key={index} {...mountain} />
      ))}

      {/* Roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[20, 25, 32]} />
        <meshStandardMaterial color="#34495e" />
      </mesh>
    </group>
  );
}

function Ocean() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial
        color="#0077be"
        metalness={0.1}
        roughness={0.2}
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Biker() {
  const bikerRef = useRef();
  const timeRef = useRef(0);

  useFrame((state, delta) => {
    timeRef.current += delta;
    const radius = 22;
    const speed = 0.5;
    
    bikerRef.current.position.x = Math.cos(timeRef.current * speed) * radius;
    bikerRef.current.position.z = Math.sin(timeRef.current * speed) * radius;
    bikerRef.current.rotation.y = timeRef.current * speed + Math.PI / 2;
  });

  return (
    <group ref={bikerRef}>
      {/* Bike */}
      <mesh>
        <boxGeometry args={[2, 0.5, 4]} />
        <meshStandardMaterial color="#e74c3c" />
      </mesh>
      {/* Wheels */}
      <mesh position={[-1, 0.5, 1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[1, 0.5, 1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[-1, 0.5, -1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[1, 0.5, -1.5]}>
        <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
}

function CityScene() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[40, 30, 40]} />
        <OrbitControls 
          enableDamping 
          dampingFactor={0.05}
          minDistance={30}
          maxDistance={60}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          enableRotate={true}
          rotateSpeed={0.5}
          target={[0, 0, 0]}
          enablePan={false}
        />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
        />
        <Sky 
          distance={450000} 
          sunPosition={[10, 10, 10]} 
          inclination={0.5} 
          azimuth={0.25} 
          rayleigh={0.5}
          turbidity={10}
        />
        <Island />
        <Ocean />
        <Biker />
        <Environment preset="sunset" />
        <fog attach="fog" args={['#a8d1ff', 40, 150]} />
        <color attach="background" args={['#a8d1ff']} />
      </Canvas>
    </div>
  );
}

export default CityScene; 