import { useState, useEffect } from 'react';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { ChapterContent } from './components/ChapterContent';
import { AssignmentsPage } from './components/AssignmentsPage';
import { ReviewPage } from './components/ReviewPage';
import { toast } from 'sonner@2.0.3';
import { Toaster } from './components/ui/sonner';

interface User {
  name: string;
  email: string;
  level: number;
  xp: number;
  totalXp: number;
  badges: string[];
}

type AppState = 
  | { screen: 'auth' }
  | { screen: 'dashboard' }
  | { screen: 'chapter'; chapterId: number }
  | { screen: 'assignments' }
  | { screen: 'review' };

export default function App() {
  const [appState, setAppState] = useState<AppState>({ screen: 'auth' });
  const [user, setUser] = useState<User | null>(null);

  // Initialize with sample user data for demo purposes
  useEffect(() => {
    // In a real app, this would check for existing authentication
    const sampleUser: User = {
      name: "Demo Student",
      email: "demo@eduquest.com",
      level: 3,
      xp: 850,
      totalXp: 1000,
      badges: ["First Steps", "Perfect Score", "Grammar Master"]
    };
    
    // Uncomment the line below to start with authenticated user for demo
    // setUser(sampleUser);
    // setAppState({ screen: 'dashboard' });
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate login process
    const newUser: User = {
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email: email,
      level: 1,
      xp: 0,
      totalXp: 100,
      badges: []
    };
    
    setUser(newUser);
    setAppState({ screen: 'dashboard' });
    toast.success("Welcome to EduQuest! Ready to start learning?");
  };

  const handleSignup = (email: string, password: string, name: string) => {
    // Simulate signup process
    const newUser: User = {
      name: name,
      email: email,
      level: 1,
      xp: 0,
      totalXp: 100,
      badges: []
    };
    
    setUser(newUser);
    setAppState({ screen: 'dashboard' });
    toast.success(`Welcome to EduQuest, ${name}! Your learning journey begins now.`);
  };

  const handleLogout = () => {
    setUser(null);
    setAppState({ screen: 'auth' });
    toast.info("You've been logged out. See you next time!");
  };

  const handleSelectChapter = (chapterId: number) => {
    setAppState({ screen: 'chapter', chapterId });
  };

  const handleQuizComplete = (quizId: number, score: number, xpEarned: number) => {
    if (!user) return;

    // Update user XP and potentially level
    const newXP = user.xp + xpEarned;
    let newLevel = user.level;
    let newTotalXP = user.totalXp;
    let newBadges = [...user.badges];

    // Check for level up
    if (newXP >= user.totalXp) {
      newLevel = user.level + 1;
      newTotalXP = user.totalXp + (newLevel * 100); // Increase XP needed for next level
      toast.success(`🎉 Level Up! You're now Level ${newLevel}!`);
    }

    // Award badges based on performance
    if (score === 5 && !newBadges.includes("Perfect Score")) {
      newBadges.push("Perfect Score");
      toast.success("🏆 Achievement Unlocked: Perfect Score!");
    }

    if (user.level === 1 && !newBadges.includes("First Steps")) {
      newBadges.push("First Steps");
      toast.success("🎯 Achievement Unlocked: First Steps!");
    }

    setUser({
      ...user,
      xp: newXP,
      level: newLevel,
      totalXp: newTotalXP,
      badges: newBadges
    });

    toast.success(`Quiz completed! +${xpEarned} XP earned`);
  };

  const handleAssignmentSubmit = (assignmentId: number) => {
    const xpEarned = 100; // Base XP for assignment submission
    
    if (!user) return;

    const newXP = user.xp + xpEarned;
    let newLevel = user.level;
    let newTotalXP = user.totalXp;

    // Check for level up
    if (newXP >= user.totalXp) {
      newLevel = user.level + 1;
      newTotalXP = user.totalXp + (newLevel * 100);
      toast.success(`🎉 Level Up! You're now Level ${newLevel}!`);
    }

    setUser({
      ...user,
      xp: newXP,
      level: newLevel,
      totalXp: newTotalXP
    });

    toast.success(`Assignment submitted! +${xpEarned} XP earned`);
  };

  // Render current screen
  const renderCurrentScreen = () => {
    if (!user) {
      return (
        <AuthPage
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      );
    }

    switch (appState.screen) {
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            onLogout={handleLogout}
            onSelectChapter={handleSelectChapter}
            onViewAssignments={() => setAppState({ screen: 'assignments' })}
            onViewReview={() => setAppState({ screen: 'review' })}
          />
        );
      
      case 'chapter':
        return (
          <ChapterContent
            chapterId={appState.chapterId}
            onBack={() => setAppState({ screen: 'dashboard' })}
            onQuizComplete={handleQuizComplete}
            onAssignmentSubmit={handleAssignmentSubmit}
          />
        );
      
      case 'assignments':
        return (
          <AssignmentsPage
            onBack={() => setAppState({ screen: 'dashboard' })}
          />
        );
      
      case 'review':
        return (
          <ReviewPage
            onBack={() => setAppState({ screen: 'dashboard' })}
          />
        );
      
      default:
        return (
          <AuthPage
            onLogin={handleLogin}
            onSignup={handleSignup}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {renderCurrentScreen()}
      <Toaster 
        theme="dark" 
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#f3f4f6',
            border: '1px solid #374151'
          }
        }}
      />
    </div>
  );
}