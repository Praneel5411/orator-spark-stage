import { motion } from 'framer-motion';
import { Lock, Check, Play, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SkillNodeProps {
  id: number;
  title: string;
  status: 'locked' | 'active' | 'completed';
  icon: React.ReactNode;
  xpReward: number;
  position: 'left' | 'center' | 'right';
  delay?: number;
}

export const SkillNode = ({ id, title, status, icon, xpReward, position, delay = 0 }: SkillNodeProps) => {
  const navigate = useNavigate();

  const getPositionClass = () => {
    switch (position) {
      case 'left': return 'self-start ml-8';
      case 'right': return 'self-end mr-8';
      default: return 'self-center';
    }
  };

  const handleClick = () => {
    if (status !== 'locked') {
      navigate(`/practice?level=${id}`);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: delay * 0.1, type: 'spring', stiffness: 200 }}
      className={`relative ${getPositionClass()}`}
    >
      {/* Connector line */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-border to-transparent" />
      
      <motion.button
        onClick={handleClick}
        disabled={status === 'locked'}
        whileHover={status !== 'locked' ? { scale: 1.1 } : {}}
        whileTap={status !== 'locked' ? { scale: 0.95 } : {}}
        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${
          status === 'locked' 
            ? 'bg-muted border-2 border-border opacity-50 cursor-not-allowed'
            : status === 'completed'
            ? 'bg-gradient-to-br from-success/20 to-success/10 border-2 border-success glow-green'
            : 'bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary glow-purple animate-glow-pulse'
        }`}
      >
        {/* Status indicator */}
        <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center">
          {status === 'locked' && (
            <div className="bg-muted rounded-full p-1.5">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
          {status === 'completed' && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="bg-success rounded-full p-1.5"
            >
              <Check className="w-4 h-4 text-success-foreground" />
            </motion.div>
          )}
          {status === 'active' && (
            <motion.div 
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="bg-primary rounded-full p-1.5"
            >
              <Play className="w-4 h-4 text-primary-foreground" />
            </motion.div>
          )}
        </div>

        {/* Icon */}
        <div className={`${status === 'locked' ? 'text-muted-foreground' : status === 'completed' ? 'text-success' : 'text-primary'}`}>
          {icon}
        </div>

        {/* Stars for completed */}
        {status === 'completed' && (
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
            {[1, 2, 3].map((star) => (
              <motion.div
                key={star}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: star * 0.1 }}
              >
                <Star className="w-3 h-3 text-warning fill-warning" />
              </motion.div>
            ))}
          </div>
        )}
      </motion.button>

      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: delay * 0.1 + 0.2 }}
        className="mt-3 text-center"
      >
        <p className={`text-sm font-semibold ${status === 'locked' ? 'text-muted-foreground' : 'text-foreground'}`}>
          {title}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">+{xpReward} XP</p>
      </motion.div>
    </motion.div>
  );
};
