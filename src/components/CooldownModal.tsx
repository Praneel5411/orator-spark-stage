import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Clock, Gem, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useGame } from '@/context/GameContext';
import { useState, useEffect } from 'react';

interface CooldownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CooldownModal = ({ isOpen, onClose }: CooldownModalProps) => {
  const { cooldownEndTime, resetHearts, gems, addGems } = useGame();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!cooldownEndTime) return;

    const updateTime = () => {
      const now = Date.now();
      const remaining = cooldownEndTime - now;
      
      if (remaining <= 0) {
        resetHearts();
        onClose();
        return;
      }

      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [cooldownEndTime, resetHearts, onClose]);

  const refillWithGems = () => {
    if (gems >= 50) {
      addGems(-50);
      resetHearts();
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="bg-card border border-border rounded-3xl p-8 max-w-sm w-full text-center"
          >
            {/* Broken heart */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, -10, 10, 0] }}
              transition={{ delay: 0.2 }}
              className="flex justify-center mb-6"
            >
              <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center">
                <Heart className="w-12 h-12 text-destructive" />
              </div>
            </motion.div>

            <h2 className="text-2xl font-bold text-foreground mb-2">Out of Hearts!</h2>
            <p className="text-muted-foreground mb-6">
              You've run out of lives. Wait for them to refill or use gems.
            </p>

            {/* Timer */}
            <div className="bg-secondary/50 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Hearts refill in:</span>
              </div>
              <span className="text-4xl font-bold text-primary">{timeLeft}</span>
            </div>

            {/* Refill option */}
            <Button
              onClick={refillWithGems}
              disabled={gems < 50}
              className="w-full h-14 gap-2 gradient-cyber glow-purple"
            >
              <Sparkles className="w-5 h-5" />
              Refill Hearts
              <div className="flex items-center gap-1 ml-2 bg-background/20 px-2 py-0.5 rounded-full">
                <Gem className="w-4 h-4" />
                <span>50</span>
              </div>
            </Button>

            <p className="text-sm text-muted-foreground mt-4">
              You have {gems} gems
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
