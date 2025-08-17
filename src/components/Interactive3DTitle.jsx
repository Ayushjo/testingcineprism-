"use client";

import { useRef, useState, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

function Letter({ char, position, index, isHovered, mousePosition }) {
  const meshRef = useRef();
  const originalPosition = useMemo(() => [...position], [position]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;

      if (isHovered) {
        // Separate and rotate letters on hover
        const separationDistance = 0.5;
        const targetX = originalPosition[0] + (index - 6) * separationDistance;
        const targetY = originalPosition[1] + Math.sin(time * 2 + index) * 0.2;
        const targetZ = originalPosition[2] + Math.cos(time + index) * 0.3;

        meshRef.current.position.x = THREE.MathUtils.lerp(
          meshRef.current.position.x,
          targetX,
          0.1
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          targetY,
          0.1
        );
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          targetZ,
          0.1
        );

        // Individual letter rotation
        meshRef.current.rotation.x = Math.sin(time * 2 + index) * 0.3;
        meshRef.current.rotation.y = Math.cos(time + index) * 0.2;
        meshRef.current.rotation.z = Math.sin(time * 0.5 + index) * 0.1;
      } else {
        // Return to original position
        meshRef.current.position.x = THREE.MathUtils.lerp(
          meshRef.current.position.x,
          originalPosition[0],
          0.1
        );
        meshRef.current.position.y = THREE.MathUtils.lerp(
          meshRef.current.position.y,
          originalPosition[1],
          0.1
        );
        meshRef.current.position.z = THREE.MathUtils.lerp(
          meshRef.current.position.z,
          originalPosition[2],
          0.1
        );

        // Gentle breathing animation
        meshRef.current.rotation.x = Math.sin(time * 0.5 + index * 0.2) * 0.05;
        meshRef.current.rotation.y = Math.cos(time * 0.3 + index * 0.1) * 0.03;
        meshRef.current.rotation.z = 0;
      }

      // Mouse-influenced gradient shift
      if (mousePosition) {
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - position[0], 2) +
            Math.pow(mousePosition.y - position[1], 2)
        );
        const influence = Math.max(0, 1 - distance / 2);

        // Color shift based on mouse proximity
        const hue = (time * 0.1 + index * 0.1 + influence) % 1;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.6);
        if (meshRef.current.material) {
          meshRef.current.material.color = color;
        }
      }
    }
  });

  return (
    <Text
      ref={meshRef}
      position={position}
      fontSize={0.8}
      color="#10b981"
      anchorX="center"
      anchorY="middle"
      font="/fonts/playfair-bold.woff"
      material-metalness={0.8}
      material-roughness={0.2}
      material-emissive="#10b981"
      material-emissiveIntensity={0.1}
    >
      {char}
    </Text>
  );
}

export default function Interactive3DTitle({ title = "CINÉPRISM" }) {
  const groupRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const { mouse } = useThree();

  const letters = useMemo(() => {
    return title.split("").map((char, index) => ({
      char,
      position: [(index - title.length / 2) * 0.6, 0, 0],
      index,
    }));
  }, [title]);

  const mousePosition = useMemo(
    () => ({
      x: mouse.x * 5,
      y: mouse.y * 3,
    }),
    [mouse]
  );

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle group rotation
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      groupRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.15) * 0.05;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      {letters.map((letter, index) => (
        <Letter
          key={index}
          char={letter.char}
          position={letter.position}
          index={letter.index}
          isHovered={isHovered}
          mousePosition={mousePosition}
        />
      ))}

      {/* Shadow plane */}
      <mesh position={[0, -1, -0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 2]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>

      {/* Ambient particles around title */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
          ]}
        >
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}
