import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Crown, Flame, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const leaderboardData = [
  { rank: 1, name: 'SpeechQueen', xp: 12450, streak: 45, avatar: '👸' },
  { rank: 2, name: 'TalkMaster2000', xp: 11200, streak: 32, avatar: '🎭' },
  { rank: 3, name: 'VocalVibes', xp: 10890, streak: 28, avatar: '🎤' },
  { rank: 4, name: 'DebateChamp', xp: 9750, streak: 21, avatar: '🏆' },
  { rank: 5, name: 'You', xp: 8500, streak: 3, avatar: '🌟', isUser: true },
  { rank: 6, name: 'Eloquent_Ed', xp: 7800, streak: 15, avatar: '📚' },
  { rank: 7, name: 'PersuasionPro', xp: 7200, streak: 12, avatar: '💼' },
  { rank: 8, name: 'VoiceVirtuoso', xp: 6900, streak: 9, avatar: '🎵' },
];

export const Leaderboard = () => {
  const navigate = useNavigate();

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-warning" />;
      case 2:
        return <Medal className="w-6 h-6 text-muted-foreground" />;
      case 3:
        return <Medal className="w-6 h-6 text-neon-orange" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
    }
  };

  const getRankBg = (rank: number, isUser?: boolean) => {
    if (isUser) return 'bg-primary/20 border-primary';
    switch (rank) {
      case 1:
        return 'bg-warning/10 border-warning/30';
      case 2:
        return 'bg-muted-foreground/10 border-muted-foreground/30';
      case 3:
        return 'bg-neon-orange/10 border-neon-orange/30';
      default:
        return 'bg-card border-border';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold">Leaderboard</h1>
          <div className="w-10" />
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-end justify-center gap-4 mb-10"
        >
          {/* 2nd Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-muted-foreground/20 flex items-center justify-center text-3xl mb-2 border-2 border-muted-foreground">
              {leaderboardData[1].avatar}
            </div>
            <p className="text-sm font-bold text-foreground truncate max-w-[80px]">
              {leaderboardData[1].name}
            </p>
            <p className="text-xs text-muted-foreground">{leaderboardData[1].xp.toLocaleString()} XP</p>
            <div className="w-20 h-16 bg-muted-foreground/20 rounded-t-xl mt-2 flex items-center justify-center">
              <span className="text-2xl font-bold text-muted-foreground">2</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Crown className="w-8 h-8 text-warning mb-1" />
            </motion.div>
            <div className="w-20 h-20 rounded-full bg-warning/20 flex items-center justify-center text-4xl mb-2 border-2 border-warning glow-purple">
              {leaderboardData[0].avatar}
            </div>
            <p className="text-sm font-bold text-foreground truncate max-w-[80px]">
              {leaderboardData[0].name}
            </p>
            <p className="text-xs text-muted-foreground">{leaderboardData[0].xp.toLocaleString()} XP</p>
            <div className="w-24 h-24 bg-warning/20 rounded-t-xl mt-2 flex items-center justify-center">
              <span className="text-3xl font-bold text-warning">1</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-neon-orange/20 flex items-center justify-center text-3xl mb-2 border-2 border-neon-orange">
              {leaderboardData[2].avatar}
            </div>
            <p className="text-sm font-bold text-foreground truncate max-w-[80px]">
              {leaderboardData[2].name}
            </p>
            <p className="text-xs text-muted-foreground">{leaderboardData[2].xp.toLocaleString()} XP</p>
            <div className="w-20 h-12 bg-neon-orange/20 rounded-t-xl mt-2 flex items-center justify-center">
              <span className="text-2xl font-bold text-neon-orange">3</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Full List */}
        <div className="space-y-3">
          {leaderboardData.map((user, index) => (
            <motion.div
              key={user.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-4 p-4 rounded-2xl border ${getRankBg(user.rank, user.isUser)}`}
            >
              <div className="w-8 flex items-center justify-center">
                {getRankIcon(user.rank)}
              </div>

              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl">
                {user.avatar}
              </div>

              <div className="flex-1">
                <p className={`font-bold ${user.isUser ? 'text-primary' : 'text-foreground'}`}>
                  {user.name}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Zap className="w-4 h-4 text-primary" />
                    {user.xp.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Flame className="w-4 h-4 text-neon-orange" />
                    {user.streak}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
