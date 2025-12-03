import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Zap, Clock, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  xpEarned: number;
  stats: {
    fillerWords: number;
    avgWpm: number;
    duration: number;
  };
}

export const SuccessModal = ({ isOpen, onClose, xpEarned, stats }: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#22c55e', '#ec4899', '#3b82f6'],
      });
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-card border border-border rounded-3xl p-8 max-w-sm w-full"
          >
            {/* Trophy */}
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="w-24 h-24 rounded-full gradient-success flex items-center justify-center glow-green">
                <Trophy className="w-12 h-12 text-success-foreground" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">Lesson Complete!</h2>
              <div className="flex items-center justify-center gap-1">
                {[1, 2, 3].map((star) => (
                  <motion.div
                    key={star}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.4 + star * 0.1 }}
                  >
                    <Star className="w-8 h-8 text-warning fill-warning" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* XP Earned */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="bg-primary/20 rounded-2xl p-4 mb-6 text-center"
            >
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-6 h-6 text-primary" />
                <span className="text-3xl font-bold text-primary">+{xpEarned} XP</span>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-3 mb-8"
            >
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-destructive" />
                  <span className="text-muted-foreground">Filler Words</span>
                </div>
                <span className="font-bold text-foreground">{stats.fillerWords}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">Average WPM</span>
                </div>
                <span className="font-bold text-foreground">{stats.avgWpm}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-success" />
                  <span className="text-muted-foreground">Duration</span>
                </div>
                <span className="font-bold text-foreground">{stats.duration}s</span>
              </div>
            </motion.div>

            {/* Continue Button */}
            <Button
              onClick={onClose}
              className="w-full h-14 text-lg gradient-cyber glow-purple"
            >
              Continue
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
