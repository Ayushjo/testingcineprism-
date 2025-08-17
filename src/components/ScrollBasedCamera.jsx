"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function ScrollBasedCamera({ scrollY }) {
  const { camera } = useThree();
  const targetPosition = useRef(new THREE.Vector3(0, 0, 5));
  const targetRotation = useRef(new THREE.Euler(0, 0, 0));

  useEffect(() => {
    const sections = [
      { start: 0, end: 1, position: [0, 0, 5], rotation: [0, 0, 0] },
      { start: 1, end: 2, position: [2, 1, 8], rotation: [0, 0.2, 0] },
      { start: 2, end: 3, position: [-1, 2, 6], rotation: [0.1, -0.1, 0] },
      { start: 3, end: 4, position: [0, 0, 10], rotation: [0, 0, 0] },
    ];

    const scrollProgress = scrollY / window.innerHeight;
    const currentSectionIndex = Math.floor(scrollProgress);
    const sectionProgress = scrollProgress - currentSectionIndex;

    const currentSection =
      sections[Math.min(currentSectionIndex, sections.length - 1)];
    const nextSection =
      sections[Math.min(currentSectionIndex + 1, sections.length - 1)];

    if (currentSection && nextSection) {
      // Interpolate camera position
      targetPosition.current.lerpVectors(
        new THREE.Vector3(...currentSection.position),
        new THREE.Vector3(...nextSection.position),
        sectionProgress
      );

      // Interpolate camera rotation
      const currentEuler = new THREE.Euler(...currentSection.rotation);
      const nextEuler = new THREE.Euler(...nextSection.rotation);
      const currentQuat = new THREE.Quaternion().setFromEuler(currentEuler);
      const nextQuat = new THREE.Quaternion().setFromEuler(nextEuler);

      const interpolatedQuat = new THREE.Quaternion().slerpQuaternions(
        currentQuat,
        nextQuat,
        sectionProgress
      );
      targetRotation.current.setFromQuaternion(interpolatedQuat);
    }
  }, [scrollY]);

  useFrame(() => {
    // Smooth camera movement
    camera.position.lerp(targetPosition.current, 0.05);
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      targetRotation.current.x,
      0.05
    );
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      targetRotation.current.y,
      0.05
    );
    camera.rotation.z = THREE.MathUtils.lerp(
      camera.rotation.z,
      targetRotation.current.z,
      0.05
    );
  });

  return null;
}
