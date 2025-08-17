"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function FilmFrame({ position, rotation, imageUrl, title }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.rotation.z =
        rotation[2] + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  return (
    <group ref={meshRef} position={position} rotation={rotation}>
      {/* Film frame border */}
      <mesh>
        <planeGeometry args={[1.2, 1.6]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Movie poster area */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial color="#2d3748" />
      </mesh>

      {/* Film perforations */}
      {[-0.7, -0.35, 0, 0.35, 0.7].map((y, i) => (
        <group key={i}>
          <mesh position={[-0.65, y, 0.02]}>
            <circleGeometry args={[0.03]} />
            <meshStandardMaterial color="#000" />
          </mesh>
          <mesh position={[0.65, y, 0.02]}>
            <circleGeometry args={[0.03]} />
            <meshStandardMaterial color="#000" />
          </mesh>
        </group>
      ))}

      {/* Movie title */}
      <Text
        position={[0, -0.9, 0.02]}
        fontSize={0.08}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {title}
      </Text>
    </group>
  );
}

function FilmTunnel() {
  const groupRef = useRef();
  const { camera } = useThree();

  const tunnelRings = useMemo(() => {
    const rings = [];
    const movies = [
      "DUNE",
      "INTERSTELLAR",
      "OPPENHEIMER",
      "FLEABAG",
      "BLADE RUNNER",
      "INCEPTION",
      "PARASITE",
      "MOONLIGHT",
    ];

    for (let ring = 0; ring < 8; ring++) {
      const frames = [];
      const radius = 3 + ring * 0.5;
      const frameCount = 8;

      for (let i = 0; i < frameCount; i++) {
        const angle = (i / frameCount) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = -ring * 4 - 5;

        frames.push({
          position: [x, y, z],
          rotation: [0, 0, angle + Math.PI / 2],
          title: movies[i % movies.length],
        });
      }
      rings.push(frames);
    }
    return rings;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollProgress = window.scrollY / window.innerHeight;
      groupRef.current.position.z = scrollProgress * 10;

      // Mouse-controlled camera movement
      const mouse = state.mouse;
      camera.position.x = mouse.x * 0.5;
      camera.position.y = mouse.y * 0.3;
      camera.lookAt(0, 0, -10);
    }
  });

  return (
    <group ref={groupRef}>
      {tunnelRings.map((ring, ringIndex) =>
        ring.map((frame, frameIndex) => (
          <FilmFrame
            key={`${ringIndex}-${frameIndex}`}
            position={frame.position}
            rotation={frame.rotation}
            title={frame.title}
          />
        ))
      )}
    </group>
  );
}

function FilmGrainParticles() {
  const particlesRef = useRef();
  const { camera } = useThree();

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 200; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 30,
          (Math.random() - 0.5) * 50,
        ],
        scale: Math.random() * 0.02 + 0.01,
        speed: Math.random() * 0.5 + 0.1,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((particle, i) => {
        particle.position.z += particles[i].speed;
        if (particle.position.z > 5) {
          particle.position.z = -25;
          particle.position.x = (Math.random() - 0.5) * 30;
          particle.position.y = (Math.random() - 0.5) * 30;
        }
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {particles.map((particle, index) => (
        <mesh key={index} position={particle.position} scale={particle.scale}>
          <sphereGeometry args={[1, 4, 4]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function CinematicLighting() {
  return (
    <>
      <ambientLight intensity={0.1} />

      {/* Key light from front */}
      <directionalLight
        position={[0, 5, 10]}
        intensity={0.8}
        color="#10b981"
        castShadow
      />

      {/* Rim light from behind */}
      <directionalLight
        position={[0, -2, -10]}
        intensity={0.3}
        color="#3b82f6"
      />

      {/* Spotlight for tunnel effect */}
      <spotLight
        position={[0, 0, 5]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
        target-position={[0, 0, -20]}
      />
    </>
  );
}

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <CinematicLighting />
      <FilmTunnel />
      <FilmGrainParticles />

      <mesh position={[0, 0, -30]}>
        <ringGeometry args={[2, 3, 32]} />
        <meshBasicMaterial
          color="#10b981"
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}
