import { motion } from "framer-motion";
import OptimizedImage from "./OptimizedImage";

// Your exact imports
import DuneImage from "../assets/Dune.jpg";
import InterstellarImage from "../assets/Interstellar.jpg";
import HowToLoseImage from "../assets/howtoloseaguys.jpg";
import OppenHeimerImage from "../assets/oppenheimer.jpg";
import OppenHeimerFireImage from "../assets/oppenheimerfire.jpg";
import FleabagImage2 from "../assets/fleebag2.jpg";
import PastLivesImage from "../assets/pastlives.jpg";
import SpiderManImage from "../assets/spiderman.jpg";
import BatmanImage from "../assets/batman.jpg";
import BladeRunnerImg from "../assets/bladerunner.jpg";
import DuneFanImage from "../assets/dunefan.jpg";
import SinnerImage from "../assets/sinners.jpg";
import TennetImage from "../assets/tennet.jpg";
import AliceImage from "../assets/alicedarling.jpg";
import DarkKnightImage from "../assets/darkknight.jpg";
import DunkKirkImage from "../assets/dunkirk.jpg";

// Utility function
function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}

const GridLineHorizontal = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(255, 255, 255, 0.08)",
        "--height": "1px",
        "--width": "5px",
        "--fade-stop": "90%",
        "--offset": offset || "200px",
        "--color-dark": "rgba(255, 255, 255, 0.08)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};

const GridLineVertical = ({ className, offset }) => {
  return (
    <div
      style={{
        "--background": "#ffffff",
        "--color": "rgba(255, 255, 255, 0.08)",
        "--height": "5px",
        "--width": "1px",
        "--fade-stop": "90%",
        "--offset": offset || "150px",
        "--color-dark": "rgba(255, 255, 255, 0.08)",
        maskComposite: "exclude",
      }}
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className
      )}
    />
  );
};

export const ThreeDMarquee = ({ images, className }) => {
  // Split the images array into 4 equal parts
  const chunkSize = Math.ceil(images.length / 4);
  const chunks = Array.from({ length: 4 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn("mx-auto block h-full w-full overflow-hidden", className)}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-[2500px] shrink-0 scale-75 sm:scale-90 lg:scale-125">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-80 right-[50%] grid size-full origin-top-left grid-cols-4 gap-12 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 150 : -150 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 12 : 18,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-12"
              >
                <GridLineVertical className="-left-4" offset="120px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="30px" />
                    <motion.div
                      whileHover={{
                        y: -15,
                        scale: 1.08,
                      }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                    >
                      <OptimizedImage
                        src={image}
                        alt={`Movie Poster ${imageIndex + 1}`}
                        className="aspect-[2/3] w-48 rounded-xl object-cover ring ring-white/15 hover:shadow-2xl hover:ring-emerald-400/40 transition-all duration-300"
                        width={192}
                        height={288}
                      />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
