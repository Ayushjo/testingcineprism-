"use client";

import { useRef, useMemo, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Text, Html } from "@react-three/drei";

function MoviePoster({
  position,
  rotation,
  movie,
  onHover,
  onLeave,
  onClick,
  isHovered,
}) {
  const meshRef = useRef();
  const { camera, mouse } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle breathing animation
      const breathe =
        Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.05;
      meshRef.current.scale.setScalar(1 + breathe);

      // Gentle rotation
      meshRef.current.rotation.y =
        rotation[1] + Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.x =
        rotation[0] + Math.cos(state.clock.elapsedTime * 0.2) * 0.05;

      // Hover effects
      if (isHovered) {
        // Tilt toward cursor
        const mouseX = mouse.x * 0.3;
        const mouseY = mouse.y * 0.3;
        meshRef.current.rotation.y += mouseX;
        meshRef.current.rotation.x += mouseY;

        // Scale up and glow
        meshRef.current.scale.setScalar(1.2 + breathe);
      }

      // Parallax movement based on scroll
      const scrollProgress = window.scrollY / window.innerHeight;
      meshRef.current.position.z = position[2] + scrollProgress * 2;
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onPointerOver={() => onHover(movie)}
      onPointerOut={onLeave}
      onClick={() => onClick(movie)}
    >
      {/* Poster frame */}
      <mesh>
        <boxGeometry args={[1.2, 1.8, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Poster image area */}
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[1.1, 1.7]} />
        <meshStandardMaterial color={movie.color} />
      </mesh>

      {/* Movie title */}
      <Text
        position={[0, -1.1, 0.03]}
        fontSize={0.08}
        color="#10b981"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        {movie.title}
      </Text>

      {/* Rating stars */}
      <Text
        position={[0, -1.25, 0.03]}
        fontSize={0.06}
        color="#fbbf24"
        anchorX="center"
        anchorY="middle"
      >
        {"★".repeat(movie.rating)}
      </Text>

      {/* Glow effect when hovered */}
      {isHovered && (
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[1.5, 2.1]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.2} />
        </mesh>
      )}
    </group>
  );
}

function ReviewOverlay({ movie, onClose }) {
  if (!movie) return null;

  return (
    <Html center>
      <div className="bg-slate-900/95 backdrop-blur-sm border border-emerald-500/30 rounded-lg p-6 max-w-md text-white shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-emerald-400">{movie.title}</h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="flex items-center mb-3">
          <span className="text-yellow-400 mr-2">
            {"★".repeat(movie.rating)}
          </span>
          <span className="text-slate-300">{movie.rating}/5</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          {movie.review}
        </p>
        <div className="text-xs text-slate-400">
          Reviewed by The Cinéprism • {movie.date}
        </div>
      </div>
    </Html>
  );
}

export default function FloatingPostersGallery() {
  const groupRef = useRef();
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const movies = useMemo(
    () => [
      {
        id: 1,
        title: "DUNE",
        rating: 5,
        color: "#d97706",
        review:
          "A masterpiece of science fiction cinema that perfectly balances epic scope with intimate character moments. Villeneuve's vision brings Herbert's complex world to life with stunning visuals and powerful performances.",
        date: "Oct 2021",
      },
      {
        id: 2,
        title: "INTERSTELLAR",
        rating: 5,
        color: "#1e40af",
        review:
          "Nolan's ambitious space odyssey combines hard science with emotional storytelling. A visually stunning exploration of love, sacrifice, and humanity's place in the universe.",
        date: "Nov 2014",
      },
      {
        id: 3,
        title: "OPPENHEIMER",
        rating: 4,
        color: "#dc2626",
        review:
          "A haunting biographical drama that captures the moral complexity of scientific discovery. Cillian Murphy delivers a career-defining performance as the father of the atomic bomb.",
        date: "Jul 2023",
      },
      {
        id: 4,
        title: "PARASITE",
        rating: 5,
        color: "#059669",
        review:
          "Bong Joon-ho's darkly comic thriller is a masterclass in social commentary. A genre-defying film that seamlessly blends horror, comedy, and drama.",
        date: "May 2019",
      },
      {
        id: 5,
        title: "BLADE RUNNER 2049",
        rating: 5,
        color: "#7c3aed",
        review:
          "A worthy successor that expands the original's themes while creating its own identity. Villeneuve crafts a visually stunning meditation on what it means to be human.",
        date: "Oct 2017",
      },
      {
        id: 6,
        title: "MOONLIGHT",
        rating: 4,
        color: "#0891b2",
        review:
          "A tender, poetic coming-of-age story told with remarkable sensitivity. Barry Jenkins creates an intimate portrait of identity, masculinity, and self-discovery.",
        date: "Oct 2016",
      },
    ],
    []
  );

  const posterPositions = useMemo(() => {
    return movies.map((_, index) => {
      const angle = (index / movies.length) * Math.PI * 2;
      const radius = 4 + Math.sin(index) * 1.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle * 0.7) * 2;
      const z = Math.sin(index * 0.5) * 3 - 2;

      return {
        position: [x, y, z],
        rotation: [
          Math.random() * 0.2 - 0.1,
          angle + Math.PI / 2,
          Math.random() * 0.1 - 0.05,
        ],
      };
    });
  }, [movies.length]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {movies.map((movie, index) => (
          <MoviePoster
            key={movie.id}
            position={posterPositions[index].position}
            rotation={posterPositions[index].rotation}
            movie={movie}
            onHover={setHoveredMovie}
            onLeave={() => setHoveredMovie(null)}
            onClick={setSelectedMovie}
            isHovered={hoveredMovie?.id === movie.id}
          />
        ))}
      </group>

      {/* Ambient floating particles */}
      <group>
        {Array.from({ length: 50 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              (Math.random() - 0.5) * 20,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
          >
            <sphereGeometry args={[0.01, 8, 8]} />
            <meshBasicMaterial color="#10b981" transparent opacity={0.3} />
          </mesh>
        ))}
      </group>

      {/* Review overlay */}
      <ReviewOverlay
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
      />
    </>
  );
}
