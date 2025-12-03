import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Zap, Gauge, ArrowLeft, Heart, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AudioVisualizer } from './AudioVisualizer';
import { Speedometer } from './Speedometer';
import { useGame } from '@/context/GameContext';
import { useNavigate } from 'react-router-dom';
import { SuccessModal } from './SuccessModal';

type GameMode = 'um-zapper' | 'speed-trap';

const fillerWords = ['um', 'uh', 'like', 'you know', 'basically', 'actually'];
const samplePhrases = [
  "I think that, um, the best way to approach this is...",
  "So basically, like, what I'm trying to say is...",
  "You know, uh, it's actually pretty simple when you think about it.",
  "Like, the thing is, um, we need to focus on...",
  "Actually, uh, I believe that we should consider...",
];

export const GameArena = () => {
  const [mode, setMode] = useState<GameMode>('um-zapper');
  const [isRecording, setIsRecording] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [fillerCount, setFillerCount] = useState(0);
  const [showFlash, setShowFlash] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [gameTime, setGameTime] = useState(30);
  
  const { hearts, loseHeart, gainXP, completeLevel } = useGame();
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRecording && gameTime > 0) {
      interval = setInterval(() => {
        setGameTime(prev => prev - 1);
      }, 1000);
    } else if (gameTime === 0 && isRecording) {
      setIsRecording(false);
      handleGameEnd();
    }

    return () => clearInterval(interval);
  }, [isRecording, gameTime]);

  const handleGameEnd = () => {
    setShowSuccess(true);
    gainXP(50);
    completeLevel(1);
  };

  const simulateSpeech = useCallback(() => {
    const phrase = samplePhrases[Math.floor(Math.random() * samplePhrases.length)];
    setTranscript(prev => prev + ' ' + phrase);
    
    // Check for filler words
    fillerWords.forEach(word => {
      if (phrase.toLowerCase().includes(word)) {
        setFillerCount(prev => prev + 1);
        setShowFlash(true);
        loseHeart();
        setTimeout(() => setShowFlash(false), 500);
      }
    });

    // Simulate WPM
    setWpm(Math.floor(Math.random() * 60) + 120);
  }, [loseHeart]);

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTranscript('');
      setFillerCount(0);
      setGameTime(30);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      {/* Flash overlay for filler detection */}
      <AnimatePresence>
        {showFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-destructive z-40 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`w-5 h-5 ${i < hearts ? 'text-destructive fill-destructive' : 'text-muted-foreground'}`}
                />
              ))}
            </div>
            <div className="bg-secondary px-3 py-1 rounded-full">
              <span className="text-sm font-bold">{gameTime}s</span>
            </div>
          </div>
        </motion.div>

        {/* Mode Selector */}
        <div className="flex gap-2 mb-8">
          <Button
            variant={mode === 'um-zapper' ? 'default' : 'secondary'}
            onClick={() => setMode('um-zapper')}
            className="flex-1 gap-2"
          >
            <Zap className="w-4 h-4" />
            Um Zapper
          </Button>
          <Button
            variant={mode === 'speed-trap' ? 'default' : 'secondary'}
            onClick={() => setMode('speed-trap')}
            className="flex-1 gap-2"
          >
            <Gauge className="w-4 h-4" />
            Speed Trap
          </Button>
        </div>

        {/* Main Game Area */}
        <motion.div
          layout
          className="bg-card rounded-3xl p-6 border border-border"
        >
          {mode === 'um-zapper' ? (
            <>
              <h2 className="text-xl font-bold text-center mb-2">Speak Without Fillers</h2>
              <p className="text-muted-foreground text-center text-sm mb-6">
                Avoid saying "Um," "Uh," "Like," or "You know"
              </p>

              <AudioVisualizer 
                isActive={isRecording} 
                variant={showFlash ? 'danger' : 'default'}
              />

              {/* Filler Counter */}
              <motion.div 
                className="mt-6 text-center"
                animate={showFlash ? { scale: [1, 1.2, 1] } : {}}
              >
                <span className="text-4xl font-bold text-foreground">{fillerCount}</span>
                <p className="text-muted-foreground text-sm">Filler Words Detected</p>
              </motion.div>
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold text-center mb-2">Watch Your Speed</h2>
              <p className="text-muted-foreground text-center text-sm mb-6">
                Keep between 120-160 WPM for optimal pacing
              </p>

              <Speedometer wpm={wpm} />

              <div className="mt-12">
                <AudioVisualizer 
                  isActive={isRecording} 
                  variant={wpm > 160 ? 'danger' : wpm >= 120 ? 'success' : 'default'}
                />
              </div>
            </>
          )}

          {/* Transcript */}
          {transcript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-secondary/50 rounded-xl"
            >
              <p className="text-sm text-muted-foreground line-clamp-3">{transcript}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Controls */}
        <div className="flex gap-4 mt-8">
          <motion.div 
            className="flex-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={toggleRecording}
              className={`w-full h-16 text-lg gap-3 ${
                isRecording 
                  ? 'bg-destructive hover:bg-destructive/90' 
                  : 'gradient-cyber glow-purple'
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-6 h-6" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="w-6 h-6" />
                  Start Speaking
                </>
              )}
            </Button>
          </motion.div>
        </div>

        {/* Simulate Speech Button (for demo) */}
        <motion.div className="mt-4">
          <Button
            variant="secondary"
            onClick={simulateSpeech}
            disabled={!isRecording}
            className="w-full gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Simulate Speech (Demo)
          </Button>
        </motion.div>
      </div>

      <SuccessModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          navigate('/');
        }}
        xpEarned={50}
        stats={{
          fillerWords: fillerCount,
          avgWpm: wpm,
          duration: 30 - gameTime,
        }}
      />
    </div>
  );
};
