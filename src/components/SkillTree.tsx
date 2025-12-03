import { motion } from 'framer-motion';
import { Volume2, Gauge, MessageSquare, Brain, Sparkles, Zap, Target, Award } from 'lucide-react';
import { SkillNode } from './SkillNode';
import { useGame } from '@/context/GameContext';

const sections = [
  {
    title: 'Novice: Vocal Power',
    color: 'primary',
    nodes: [
      { id: 1, title: 'Volume Control', icon: <Volume2 className="w-8 h-8" />, xpReward: 50 },
      { id: 2, title: 'Pacing 101', icon: <Gauge className="w-8 h-8" />, xpReward: 50 },
      { id: 3, title: 'Clarity', icon: <MessageSquare className="w-8 h-8" />, xpReward: 75 },
    ],
  },
  {
    title: 'Pro: The "Um" Slayer',
    color: 'destructive',
    nodes: [
      { id: 4, title: 'Filler Words', icon: <Zap className="w-8 h-8" />, xpReward: 100 },
      { id: 5, title: 'Pause Power', icon: <Target className="w-8 h-8" />, xpReward: 100 },
      { id: 6, title: 'Flow Master', icon: <Sparkles className="w-8 h-8" />, xpReward: 125 },
    ],
  },
  {
    title: 'Master: Impromptu',
    color: 'success',
    nodes: [
      { id: 7, title: 'Quick Think', icon: <Brain className="w-8 h-8" />, xpReward: 150 },
      { id: 8, title: 'Story Craft', icon: <Award className="w-8 h-8" />, xpReward: 150 },
    ],
  },
];

export const SkillTree = () => {
  const { completedLevels, currentLevel } = useGame();

  const getNodeStatus = (nodeId: number): 'locked' | 'active' | 'completed' => {
    if (completedLevels.includes(nodeId)) return 'completed';
    if (nodeId <= currentLevel) return 'active';
    return 'locked';
  };

  const positions: ('left' | 'center' | 'right')[] = ['center', 'left', 'right', 'center', 'right', 'left', 'center', 'left'];

  let nodeIndex = 0;

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      <div className="max-w-md mx-auto">
        {sections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: sectionIndex * 0.2 }}
            className="mb-12"
          >
            {/* Section Header */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: sectionIndex * 0.2 }}
              className="mb-8"
            >
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${section.color}/20 border border-${section.color}/30`}>
                <div className={`w-2 h-2 rounded-full bg-${section.color} animate-pulse`} />
                <span className={`text-sm font-bold text-${section.color}`}>{section.title}</span>
              </div>
            </motion.div>

            {/* Nodes */}
            <div className="flex flex-col gap-8">
              {section.nodes.map((node) => {
                const position = positions[nodeIndex % positions.length];
                const currentIndex = nodeIndex;
                nodeIndex++;
                
                return (
                  <SkillNode
                    key={node.id}
                    id={node.id}
                    title={node.title}
                    status={getNodeStatus(node.id)}
                    icon={node.icon}
                    xpReward={node.xpReward}
                    position={position}
                    delay={currentIndex}
                  />
                );
              })}
            </div>
          </motion.div>
        ))}

        {/* End decoration */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          className="flex flex-col items-center mt-8"
        >
          <div className="w-16 h-16 rounded-full gradient-cyber flex items-center justify-center glow-purple">
            <Award className="w-8 h-8 text-primary-foreground" />
          </div>
          <p className="mt-3 text-muted-foreground text-sm font-medium">Master Orator</p>
        </motion.div>
      </div>
    </div>
  );
};
