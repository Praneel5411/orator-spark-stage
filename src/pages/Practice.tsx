import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { GameArena } from '@/components/GameArena';

const Practice = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <GameArena />
      <BottomNav />
    </div>
  );
};

export default Practice;
