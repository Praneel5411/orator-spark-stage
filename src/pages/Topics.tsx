import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { TableTopics } from '@/components/TableTopics';

const Topics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TableTopics />
      <BottomNav />
    </div>
  );
};

export default Topics;
