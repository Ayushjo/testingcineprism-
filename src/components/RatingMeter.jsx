"use client";
import { motion } from "framer-motion";

const RatingMeter = ({ rating = 75, size = "md" }) => {
  // Size configurations
  const sizeConfig = {
    sm: { width: 80, height: 40, strokeWidth: 6, fontSize: "text-lg" },
    md: { width: 120, height: 60, strokeWidth: 8, fontSize: "text-2xl" },
    lg: { width: 160, height: 80, strokeWidth: 10, fontSize: "text-3xl" },
  };

  const config = sizeConfig[size];

  // Clamp rating between 0 and 100
  const clampedRating = Math.max(0, Math.min(100, rating));

  // Calculate needle angle (-90 to 90 degrees)
  const needleAngle = (clampedRating / 100) * 180 - 90;

  // Color spectrum based on rating
  const getColorForRating = (rating) => {
    if (rating >= 90)
      return { color: "rgb(34, 197, 94)", glow: "rgba(34, 197, 94, 0.3)" }; // Strong green
    if (rating >= 85)
      return { color: "rgb(74, 222, 128)", glow: "rgba(74, 222, 128, 0.3)" }; // Light green
    if (rating >= 80)
      return { color: "rgb(132, 204, 22)", glow: "rgba(132, 204, 22, 0.3)" }; // Lime
    if (rating >= 75)
      return { color: "rgb(163, 163, 163)", glow: "rgba(163, 163, 163, 0.3)" }; // Light gray
    if (rating >= 70)
      return { color: "rgb(250, 204, 21)", glow: "rgba(250, 204, 21, 0.3)" }; // Yellow
    if (rating >= 65)
      return { color: "rgb(251, 146, 60)", glow: "rgba(251, 146, 60, 0.3)" }; // Orange
    if (rating >= 60)
      return { color: "rgb(248, 113, 113)", glow: "rgba(248, 113, 113, 0.3)" }; // Light red
    return { color: "rgb(239, 68, 68)", glow: "rgba(239, 68, 68, 0.3)" }; // Strong red
  };

  const ratingColor = getColorForRating(clampedRating);

  // Create gradient segments for the arc
  const createGradientSegments = () => {
    const segments = [];
    const segmentCount = 20;

    for (let i = 0; i < segmentCount; i++) {
      const startAngle = -90 + (i * 180) / segmentCount;
      const endAngle = -90 + ((i + 1) * 180) / segmentCount;
      const segmentRating = (i + 1) * (100 / segmentCount);
      const segmentColor = getColorForRating(segmentRating);

      // Calculate arc path
      const radius = (config.width - config.strokeWidth) / 2;
      const centerX = config.width / 2;
      const centerY = config.height - 10;

      const startX = centerX + radius * Math.cos((startAngle * Math.PI) / 180);
      const startY = centerY + radius * Math.sin((startAngle * Math.PI) / 180);
      const endX = centerX + radius * Math.cos((endAngle * Math.PI) / 180);
      const endY = centerY + radius * Math.sin((endAngle * Math.PI) / 180);

      const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

      const pathData = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

      segments.push({
        path: pathData,
        color: segmentColor.color,
        opacity: clampedRating >= segmentRating ? 1 : 0.2,
      });
    }

    return segments;
  };

  const gradientSegments = createGradientSegments();

  return (
    <div
      className="relative flex items-end justify-center"
      style={{ width: config.width, height: config.height }}
    >
      {/* SVG Speedometer */}
      <svg
        viewBox={`0 0 ${config.width} ${config.height}`}
        className="w-full h-full overflow-visible"
      >
        <defs>
          {/* Active rating glow */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Speedometer Arc Segments */}
        {gradientSegments.map((segment, index) => (
          <motion.path
            key={index}
            d={segment.path}
            fill="none"
            stroke={segment.color}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            opacity={segment.opacity}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 0.8,
              delay: index * 0.02,
              ease: "easeOut",
            }}
            filter={segment.opacity === 1 ? "url(#glow)" : "none"}
          />
        ))}

        {/* Tick marks */}
        {[0, 25, 50, 75, 100].map((tick, index) => {
          const angle = -90 + (tick / 100) * 180;
          const radius = (config.width - config.strokeWidth) / 2;
          const centerX = config.width / 2;
          const centerY = config.height - 10;

          const tickStartX =
            centerX + (radius - 8) * Math.cos((angle * Math.PI) / 180);
          const tickStartY =
            centerY + (radius - 8) * Math.sin((angle * Math.PI) / 180);
          const tickEndX =
            centerX + (radius + 2) * Math.cos((angle * Math.PI) / 180);
          const tickEndY =
            centerY + (radius + 2) * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.line
              key={tick}
              x1={tickStartX}
              y1={tickStartY}
              x2={tickEndX}
              y2={tickEndY}
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            />
          );
        })}
      </svg>

      {/* Animated Needle */}
      <motion.div
        className="absolute bottom-2"
        style={{
          left: "50%",
          transformOrigin: "50% 100%",
        }}
        initial={{ rotate: -90, scale: 0 }}
        animate={{ rotate: needleAngle, scale: 1 }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
      >
        <div className="relative -translate-x-1/2">
          {/* Needle shaft */}
          <div
            className="rounded-full shadow-lg"
            style={{
              width: "3px",
              height: `${config.height * 0.6}px`,
              background: `linear-gradient(to top, ${ratingColor.color}, rgba(255, 255, 255, 0.8))`,
              boxShadow: `0 0 10px ${ratingColor.glow}`,
            }}
          />
          {/* Needle tip */}
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 rounded-full"
            style={{
              width: "6px",
              height: "6px",
              backgroundColor: ratingColor.color,
              boxShadow: `0 0 8px ${ratingColor.glow}`,
            }}
          />
          {/* Needle base */}
          <div
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full border-2"
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: "rgb(30, 41, 59)",
              borderColor: ratingColor.color,
              boxShadow: `0 0 12px ${ratingColor.glow}`,
            }}
          />
        </div>
      </motion.div>

      {/* Rating Display */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="text-center">
          <div
            className={`font-black ${config.fontSize} tracking-tight`}
            style={{ color: ratingColor.color }}
          >
            {Math.round(clampedRating)}
          </div>
          <div className="text-xs text-slate-400 font-medium">RATING</div>
        </div>
      </motion.div>
    </div>
  );
};

export default RatingMeter;
