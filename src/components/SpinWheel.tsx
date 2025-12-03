import { motion } from 'framer-motion';
import { useState } from 'react';

interface SpinWheelProps {
  onResult: (prompt: string) => void;
}

const prompts = [
  "Sell me this broken toaster",
  "Explain TikTok to a grandma",
  "Pitch a reality TV show about accountants",
  "Describe your dream vacation to a 5-year-old",
  "Convince someone to adopt a pet rock",
  "Explain why pizza is the perfect food",
  "Pitch yourself as a superhero",
  "Describe your morning routine as if it were an epic adventure",
];

const colors = [
  'hsl(270, 100%, 65%)', // purple
  'hsl(330, 100%, 60%)', // pink
  'hsl(150, 100%, 50%)', // green
  'hsl(200, 100%, 60%)', // blue
  'hsl(25, 100%, 55%)',  // orange
  'hsl(270, 100%, 65%)', // purple
  'hsl(330, 100%, 60%)', // pink
  'hsl(150, 100%, 50%)', // green
];

export const SpinWheel = ({ onResult }: SpinWheelProps) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const extraDegrees = Math.random() * 360;
    const totalRotation = rotation + (spins * 360) + extraDegrees;
    
    setRotation(totalRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const normalizedRotation = extraDegrees;
      const segmentAngle = 360 / prompts.length;
      const index = Math.floor((360 - normalizedRotation) / segmentAngle) % prompts.length;
      onResult(prompts[index]);
    }, 4000);
  };

  const segmentAngle = 360 / prompts.length;

  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Pointer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
        <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-t-[24px] border-t-foreground" />
      </div>

      {/* Wheel */}
      <motion.div
        className="w-full h-full rounded-full relative overflow-hidden border-4 border-foreground/20"
        animate={{ rotate: rotation }}
        transition={{ duration: 4, ease: [0.2, 0.8, 0.3, 1] }}
        style={{ transformOrigin: 'center center' }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {prompts.map((_, index) => {
            const startAngle = index * segmentAngle;
            const endAngle = (index + 1) * segmentAngle;
            const startRad = (startAngle - 90) * (Math.PI / 180);
            const endRad = (endAngle - 90) * (Math.PI / 180);
            
            const x1 = 50 + 50 * Math.cos(startRad);
            const y1 = 50 + 50 * Math.sin(startRad);
            const x2 = 50 + 50 * Math.cos(endRad);
            const y2 = 50 + 50 * Math.sin(endRad);

            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

            return (
              <path
                key={index}
                d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={colors[index]}
                stroke="hsl(var(--background))"
                strokeWidth="0.5"
              />
            );
          })}
        </svg>

        {/* Center button */}
        <motion.button
          onClick={spin}
          disabled={isSpinning}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-foreground text-background font-bold text-sm shadow-2xl disabled:opacity-50"
        >
          {isSpinning ? '...' : 'SPIN'}
        </motion.button>
      </motion.div>
    </div>
  );
};
