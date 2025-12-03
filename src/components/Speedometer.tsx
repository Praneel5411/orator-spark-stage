import { motion } from 'framer-motion';

interface SpeedometerProps {
  wpm: number;
  maxWpm?: number;
}

export const Speedometer = ({ wpm, maxWpm = 200 }: SpeedometerProps) => {
  const percentage = Math.min((wpm / maxWpm) * 100, 100);
  const rotation = (percentage / 100) * 180 - 90;
  const isTooFast = wpm > 160;
  const isGoodPace = wpm >= 120 && wpm <= 160;

  const getColor = () => {
    if (isTooFast) return 'text-destructive';
    if (isGoodPace) return 'text-success';
    return 'text-primary';
  };

  const getGradient = () => {
    if (isTooFast) return 'from-destructive to-destructive/50';
    if (isGoodPace) return 'from-success to-success/50';
    return 'from-primary to-primary/50';
  };

  return (
    <div className="relative w-48 h-24 mx-auto">
      {/* Background arc */}
      <svg className="w-full h-full" viewBox="0 0 200 100">
        <defs>
          <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--success))" />
            <stop offset="60%" stopColor="hsl(var(--warning))" />
            <stop offset="100%" stopColor="hsl(var(--destructive))" />
          </linearGradient>
        </defs>
        
        {/* Background track */}
        <path
          d="M 20 95 A 80 80 0 0 1 180 95"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="12"
          strokeLinecap="round"
        />
        
        {/* Active arc */}
        <motion.path
          d="M 20 95 A 80 80 0 0 1 180 95"
          fill="none"
          stroke="url(#arcGradient)"
          strokeWidth="12"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage / 100 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </svg>

      {/* Needle */}
      <motion.div
        className="absolute bottom-0 left-1/2 origin-bottom"
        style={{ width: 4, height: 60, marginLeft: -2 }}
        animate={{ rotate: rotation }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
      >
        <div className={`w-full h-full bg-gradient-to-t ${getGradient()} rounded-full`} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground" />
      </motion.div>

      {/* WPM Display */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center"
        animate={{ scale: isTooFast ? [1, 1.1, 1] : 1 }}
        transition={{ repeat: isTooFast ? Infinity : 0, duration: 0.5 }}
      >
        <span className={`text-3xl font-bold ${getColor()}`}>{wpm}</span>
        <span className="text-sm text-muted-foreground ml-1">WPM</span>
      </motion.div>

      {/* Labels */}
      <div className="absolute bottom-0 left-4 text-xs text-muted-foreground">Slow</div>
      <div className="absolute bottom-0 right-4 text-xs text-muted-foreground">Fast</div>
    </div>
  );
};
