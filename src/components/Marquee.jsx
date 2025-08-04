"use client";

import React, { useRef, Children } from "react";
import { motion, useAnimationFrame } from "framer-motion";

export default function Marquee({ children, speed = 50 }) {
  const marqueeRef = useRef(null);
  const xTranslation = useRef(0);
  const isHovering = useRef(false);

  useAnimationFrame((time, delta) => {
    if (!marqueeRef.current) return;

    // Pause animation if the user is hovering
    if (isHovering.current) return;

    // Calculate the distance to move
    const moveBy = (delta / 1000) * speed;

    // Decrement the translation value
    xTranslation.current -= moveBy;

    // When the first set of items has moved completely off-screen,
    // instantly reset the position to the start.
    if (xTranslation.current <= -marqueeRef.current.scrollWidth / 2) {
      xTranslation.current = 0;
    }

    // Apply the transform style to the element
    marqueeRef.current.style.transform = `translateX(${xTranslation.current}px)`;
  });

  return (
    <div
      className="overflow-x-hidden py-4"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
      onMouseEnter={() => (isHovering.current = true)}
      onMouseLeave={() => (isHovering.current = false)}
    >
      <motion.div className="flex gap-6 w-max" ref={marqueeRef}>
        {/* Render the children twice for the seamless loop */}
        {children}
        {Children.map(children, (child) =>
          React.cloneElement(child, {
            ...child.props,
            key: `${child.props.key}-duplicate`,
            "aria-hidden": true,
          })
        )}
      </motion.div>
    </div>
  );
}
