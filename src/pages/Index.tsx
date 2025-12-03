import { Header } from '@/components/Header';
import { BottomNav } from '@/components/BottomNav';
import { SkillTree } from '@/components/SkillTree';
import { CooldownModal } from '@/components/CooldownModal';
import { useGame } from '@/context/GameContext';

const Index = () => {
  const { hearts, cooldownEndTime, resetHearts } = useGame();
  const showCooldown = hearts === 0 && cooldownEndTime !== null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SkillTree />
      <BottomNav />
      <CooldownModal 
        isOpen={showCooldown} 
        onClose={resetHearts} 
      />
    </div>
  );
};

export default Index;
