import { motion } from 'framer-motion';
import { Flame, Heart, Gem, Crown } from 'lucide-react';
import { useGame } from '@/context/GameContext';

export const Header = () => {
  const { hearts, streak, gems, xp } = useGame();

  return (
    <motion.header 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border"
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-xl gradient-cyber flex items-center justify-center glow-purple">
            <Crown className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg text-foreground">Orator</span>
        </motion.div>

        <div className="flex items-center gap-4">
          {/* Streak */}
          <motion.div 
            className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Flame className="w-5 h-5 text-neon-orange" />
            <span className="font-bold text-foreground">{streak}</span>
          </motion.div>

          {/* Hearts */}
          <motion.div 
            className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart className="w-5 h-5 text-destructive fill-destructive" />
            <span className="font-bold text-foreground">{hearts}</span>
          </motion.div>

          {/* Gems */}
          <motion.div 
            className="flex items-center gap-1.5 bg-secondary/50 px-3 py-1.5 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Gem className="w-5 h-5 text-neon-blue" />
            <span className="font-bold text-foreground">{gems}</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};
