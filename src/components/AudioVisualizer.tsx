import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AudioVisualizerProps {
  isActive: boolean;
  variant?: 'default' | 'danger' | 'success';
}

export const AudioVisualizer = ({ isActive, variant = 'default' }: AudioVisualizerProps) => {
  const [bars, setBars] = useState<number[]>(Array(20).fill(0.2));

  useEffect(() => {
    if (!isActive) {
      setBars(Array(20).fill(0.2));
      return;
    }

    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.random() * 0.8 + 0.2));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  const getColor = () => {
    switch (variant) {
      case 'danger': return 'bg-destructive';
      case 'success': return 'bg-success';
      default: return 'bg-primary';
    }
  };

  const getGlow = () => {
    switch (variant) {
      case 'danger': return 'shadow-[0_0_10px_hsl(var(--destructive))]';
      case 'success': return 'shadow-[0_0_10px_hsl(var(--success))]';
      default: return 'shadow-[0_0_10px_hsl(var(--primary))]';
    }
  };

  return (
    <div className="flex items-center justify-center gap-1 h-32">
      {bars.map((height, index) => (
        <motion.div
          key={index}
          className={`w-2 rounded-full ${getColor()} ${getGlow()}`}
          animate={{
            height: isActive ? `${height * 100}%` : '20%',
          }}
          transition={{
            duration: 0.1,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};
