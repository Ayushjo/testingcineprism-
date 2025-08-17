"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function IrisWipe({ isActive, progress }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && isActive) {
      const scale = 1 - progress * 0.95;
      meshRef.current.scale.setScalar(Math.max(0.05, scale));
    }
  });

  if (!isActive) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 10]}>
      <ringGeometry args={[0, 20, 32]} />
      <meshBasicMaterial color="#000000" side={THREE.DoubleSide} />
    </mesh>
  );
}

function FilmBurn({ isActive, progress }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current && isActive) {
      meshRef.current.material.opacity = progress;
      meshRef.current.rotation.z = state.clock.elapsedTime * 2;
    }
  });

  if (!isActive) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 9]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial
        color="#ff4500"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

function FadeToBlack({ isActive, progress }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current && isActive) {
      meshRef.current.material.opacity = progress;
    }
  });

  if (!isActive) return null;

  return (
    <mesh ref={meshRef} position={[0, 0, 8]}>
      <planeGeometry args={[50, 50]} />
      <meshBasicMaterial color="#000000" transparent opacity={0} />
    </mesh>
  );
}

export default function CinematicTransitions({
  currentSection,
  transitionProgress,
  transitionType,
}) {
  return (
    <>
      <IrisWipe
        isActive={transitionType === "iris"}
        progress={transitionProgress}
      />
      <FilmBurn
        isActive={transitionType === "burn"}
        progress={transitionProgress}
      />
      <FadeToBlack
        isActive={transitionType === "fade"}
        progress={transitionProgress}
      />
    </>
  );
}
