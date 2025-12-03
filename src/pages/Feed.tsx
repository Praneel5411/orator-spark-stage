import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { PeerFeed } from '@/components/PeerFeed';

const Feed = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PeerFeed />
      <BottomNav />
    </div>
  );
};

export default Feed;
