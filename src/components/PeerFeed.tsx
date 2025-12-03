import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Flame, Turtle, Eye, Play, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface FeedItem {
  id: number;
  username: string;
  avatar: string;
  prompt: string;
  duration: string;
  reactions: {
    fire: number;
    slow: number;
    eye: number;
  };
}

const feedItems: FeedItem[] = [
  {
    id: 1,
    username: 'SpeechQueen',
    avatar: '👸',
    prompt: 'Convince me to try skydiving',
    duration: '0:45',
    reactions: { fire: 234, slow: 12, eye: 89 },
  },
  {
    id: 2,
    username: 'TalkMaster2000',
    avatar: '🎭',
    prompt: 'Explain blockchain to a toddler',
    duration: '1:02',
    reactions: { fire: 567, slow: 23, eye: 145 },
  },
  {
    id: 3,
    username: 'VocalVibes',
    avatar: '🎤',
    prompt: 'Pitch a movie about sentient pizza',
    duration: '0:58',
    reactions: { fire: 892, slow: 5, eye: 234 },
  },
  {
    id: 4,
    username: 'DebateChamp',
    avatar: '🏆',
    prompt: 'Argue why cats are better than dogs',
    duration: '1:15',
    reactions: { fire: 1205, slow: 45, eye: 378 },
  },
];

export const PeerFeed = () => {
  const navigate = useNavigate();
  const [reactions, setReactions] = useState<{ [key: number]: string | null }>({});
  const [mutedItems, setMutedItems] = useState<{ [key: number]: boolean }>({});

  const handleReaction = (itemId: number, type: 'fire' | 'slow' | 'eye') => {
    setReactions(prev => ({
      ...prev,
      [itemId]: prev[itemId] === type ? null : type,
    }));
  };

  const toggleMute = (itemId: number) => {
    setMutedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-32">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-16 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl px-4 py-3"
      >
        <div className="max-w-md mx-auto flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Hype Feed</h1>
          <div className="w-10" />
        </div>
      </motion.div>

      {/* Feed */}
      <div className="pt-16 snap-y snap-mandatory">
        {feedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="h-[calc(100vh-12rem)] snap-start px-4"
          >
            <div className="h-full max-w-md mx-auto flex flex-col">
              {/* Video Placeholder */}
              <div className="flex-1 relative bg-card rounded-3xl overflow-hidden border border-border">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                
                {/* Animated background */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ repeat: Infinity, duration: 3 }}
                    className="w-64 h-64 rounded-full gradient-cyber blur-3xl"
                  />
                </div>

                {/* Play button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute inset-0 flex items-center justify-center z-20"
                >
                  <div className="w-20 h-20 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-10 h-10 text-foreground fill-foreground ml-1" />
                  </div>
                </motion.button>

                {/* User info */}
                <div className="absolute bottom-4 left-4 right-16 z-20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                      {item.avatar}
                    </div>
                    <div>
                      <p className="font-bold text-foreground">{item.username}</p>
                      <p className="text-sm text-muted-foreground">{item.duration}</p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground bg-background/50 backdrop-blur-sm px-3 py-2 rounded-xl">
                    "{item.prompt}"
                  </p>
                </div>

                {/* Mute button */}
                <button
                  onClick={() => toggleMute(item.id)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center"
                >
                  {mutedItems[item.id] ? (
                    <VolumeX className="w-5 h-5 text-foreground" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-foreground" />
                  )}
                </button>

                {/* Reactions sidebar */}
                <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-4">
                  <motion.button
                    onClick={() => handleReaction(item.id, 'fire')}
                    whileTap={{ scale: 1.2 }}
                    className={`flex flex-col items-center gap-1 ${
                      reactions[item.id] === 'fire' ? 'text-neon-orange' : 'text-foreground'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      reactions[item.id] === 'fire' ? 'bg-neon-orange/20' : 'bg-background/50'
                    } backdrop-blur-sm`}>
                      <Flame className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold">
                      {item.reactions.fire + (reactions[item.id] === 'fire' ? 1 : 0)}
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleReaction(item.id, 'slow')}
                    whileTap={{ scale: 1.2 }}
                    className={`flex flex-col items-center gap-1 ${
                      reactions[item.id] === 'slow' ? 'text-neon-blue' : 'text-foreground'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      reactions[item.id] === 'slow' ? 'bg-neon-blue/20' : 'bg-background/50'
                    } backdrop-blur-sm`}>
                      <Turtle className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold">
                      {item.reactions.slow + (reactions[item.id] === 'slow' ? 1 : 0)}
                    </span>
                  </motion.button>

                  <motion.button
                    onClick={() => handleReaction(item.id, 'eye')}
                    whileTap={{ scale: 1.2 }}
                    className={`flex flex-col items-center gap-1 ${
                      reactions[item.id] === 'eye' ? 'text-neon-green' : 'text-foreground'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      reactions[item.id] === 'eye' ? 'bg-neon-green/20' : 'bg-background/50'
                    } backdrop-blur-sm`}>
                      <Eye className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold">
                      {item.reactions.eye + (reactions[item.id] === 'eye' ? 1 : 0)}
                    </span>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
