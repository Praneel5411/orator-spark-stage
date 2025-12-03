import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mic, MicOff, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SpinWheel } from './SpinWheel';
import { AudioVisualizer } from './AudioVisualizer';
import { SuccessModal } from './SuccessModal';
import { useNavigate } from 'react-router-dom';
import { useGame } from '@/context/GameContext';

type GamePhase = 'spin' | 'countdown' | 'speaking' | 'results';

export const TableTopics = () => {
  const [phase, setPhase] = useState<GamePhase>('spin');
  const [prompt, setPrompt] = useState('');
  const [countdown, setCountdown] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isRecording, setIsRecording] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();
  const { gainXP, completeLevel } = useGame();

  const handlePromptResult = (result: string) => {
    setPrompt(result);
    setTimeout(() => {
      setPhase('countdown');
    }, 1000);
  };

  useEffect(() => {
    if (phase === 'countdown' && countdown > 0) {
      const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'countdown' && countdown === 0) {
      setPhase('speaking');
      setIsRecording(true);
    }
  }, [phase, countdown]);

  useEffect(() => {
    if (phase === 'speaking' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'speaking' && timeLeft === 0) {
      setIsRecording(false);
      setShowSuccess(true);
      gainXP(100);
      completeLevel(7);
    }
  }, [phase, timeLeft, gainXP, completeLevel]);

  const stopEarly = () => {
    setIsRecording(false);
    setShowSuccess(true);
    gainXP(Math.floor((60 - timeLeft) * 1.5));
  };

  const reset = () => {
    setPhase('spin');
    setPrompt('');
    setCountdown(3);
    setTimeLeft(60);
    setIsRecording(false);
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
          <h1 className="text-xl font-bold">Table Topics</h1>
          <div className="w-10" />
        </motion.div>

        <AnimatePresence mode="wait">
          {phase === 'spin' && (
            <motion.div
              key="spin"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <p className="text-muted-foreground mb-8">
                Spin the wheel to get your impromptu speaking prompt!
              </p>
              <SpinWheel onResult={handlePromptResult} />
            </motion.div>
          )}

          {phase === 'countdown' && (
            <motion.div
              key="countdown"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="bg-card border border-border rounded-2xl p-6 mb-8"
              >
                <p className="text-sm text-muted-foreground mb-2">Your prompt:</p>
                <p className="text-xl font-bold text-foreground">"{prompt}"</p>
              </motion.div>

              <motion.div
                key={countdown}
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-8xl font-bold text-primary text-glow-purple"
              >
                {countdown}
              </motion.div>
              <p className="text-muted-foreground mt-4">Get ready to speak!</p>
            </motion.div>
          )}

          {phase === 'speaking' && (
            <motion.div
              key="speaking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Prompt Card */}
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                className="bg-card border border-border rounded-2xl p-6 mb-8"
              >
                <p className="text-sm text-muted-foreground mb-2">Your prompt:</p>
                <p className="text-lg font-semibold text-foreground">"{prompt}"</p>
              </motion.div>

              {/* Timer */}
              <motion.div
                className="text-center mb-8"
                animate={timeLeft <= 10 ? { scale: [1, 1.1, 1] } : {}}
                transition={{ repeat: timeLeft <= 10 ? Infinity : 0, duration: 0.5 }}
              >
                <div className="inline-flex items-center gap-3 bg-secondary px-6 py-3 rounded-full">
                  <Clock className={`w-6 h-6 ${timeLeft <= 10 ? 'text-destructive' : 'text-primary'}`} />
                  <span className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-destructive' : 'text-foreground'}`}>
                    {timeLeft}s
                  </span>
                </div>
              </motion.div>

              {/* Audio Visualizer */}
              <div className="bg-card border border-border rounded-3xl p-6 mb-8">
                <AudioVisualizer isActive={isRecording} />
              </div>

              {/* Stop Button */}
              <Button
                onClick={stopEarly}
                className="w-full h-14 bg-destructive hover:bg-destructive/90 gap-2"
              >
                <MicOff className="w-5 h-5" />
                Stop Speaking
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          reset();
        }}
        xpEarned={Math.floor((60 - timeLeft) * 1.5)}
        stats={{
          fillerWords: Math.floor(Math.random() * 5),
          avgWpm: Math.floor(Math.random() * 40) + 120,
          duration: 60 - timeLeft,
        }}
      />
    </div>
  );
};
