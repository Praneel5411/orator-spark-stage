import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { Leaderboard } from '@/components/Leaderboard';

const LeaderboardPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Leaderboard />
      <BottomNav />
    </div>
  );
};

export default LeaderboardPage;
