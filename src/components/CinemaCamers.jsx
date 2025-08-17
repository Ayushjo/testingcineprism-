"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CameraBody() {
  const bodyRef = useRef();

  useFrame((state) => {
    if (bodyRef.current) {
      bodyRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      bodyRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={bodyRef}>
      {/* Main camera body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2, 1.2, 1.5]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Camera lens */}
      <mesh position={[0, 0, 0.8]}>
        <cylinderGeometry args={[0.4, 0.5, 0.3, 16]} />
        <meshStandardMaterial color="#1a202c" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Lens glass with reflection */}
      <mesh position={[0, 0, 0.95]}>
        <cylinderGeometry args={[0.35, 0.35, 0.05, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.0}
          transparent
          opacity={0.8}
          envMapIntensity={2}
        />
      </mesh>

      {/* Camera viewfinder */}
      <mesh position={[0, 0.8, -0.3]}>
        <boxGeometry args={[0.6, 0.4, 0.4]} />
        <meshStandardMaterial color="#1a202c" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* Film reel */}
      <mesh position={[-1.2, 0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.1, 16]} />
        <meshStandardMaterial color="#4a5568" metalness={0.6} roughness={0.5} />
      </mesh>

      {/* Camera handle */}
      <mesh position={[0.8, 0.8, 0]}>
        <boxGeometry args={[0.3, 0.6, 0.3]} />
        <meshStandardMaterial color="#2d3748" metalness={0.5} roughness={0.6} />
      </mesh>

      {/* Tripod legs */}
      {[0, 120, 240].map((angle, i) => {
        const x = Math.cos((angle * Math.PI) / 180) * 1.5;
        const z = Math.sin((angle * Math.PI) / 180) * 1.5;
        return (
          <mesh
            key={i}
            position={[x, -1.5, z]}
            rotation={[0, (angle * Math.PI) / 180, 0.3]}
          >
            <cylinderGeometry args={[0.05, 0.08, 2, 8]} />
            <meshStandardMaterial
              color="#4a5568"
              metalness={0.7}
              roughness={0.4}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function LightBeam() {
  const beamRef = useRef();

  useFrame((state) => {
    if (beamRef.current) {
      beamRef.current.material.opacity =
        0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
    }
  });

  return (
    <mesh ref={beamRef} position={[0, 0, 3]} rotation={[Math.PI / 2, 0, 0]}>
      <coneGeometry args={[2, 6, 8, 1, true]} />
      <meshBasicMaterial
        color="#10b981"
        transparent
        opacity={0.1}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function CinemaCamera() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={0.8}>
      <CameraBody />
      <LightBeam />

      {/* Floating film strips around camera */}
      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh
            key={i}
            position={[x, Math.sin(angle * 2) * 0.5, z]}
            rotation={[0, angle + Math.PI / 2, 0]}
          >
            <planeGeometry args={[0.3, 1.5]} />
            <meshStandardMaterial color="#1a202c" transparent opacity={0.7} />
          </mesh>
        );
      })}

      {/* Ambient lighting for camera */}
      <pointLight position={[2, 2, 2]} intensity={0.5} color="#10b981" />
      <pointLight position={[-2, -1, 2]} intensity={0.3} color="#3b82f6" />
    </group>
  );
}
