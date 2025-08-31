import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  BookOpen, 
  Trophy, 
  Star, 
  Lock, 
  CheckCircle, 
  Play, 
  FileText,
  Target,
  Calendar,
  LogOut
} from 'lucide-react';

interface User {
  name: string;
  email: string;
  level: number;
  xp: number;
  totalXp: number;
  badges: string[];
}

interface Chapter {
  id: number;
  title: string;
  description: string;
  isUnlocked: boolean;
  isCompleted: boolean;
  xpReward: number;
  quizCount: number;
  assignmentCount: number;
}

interface DashboardProps {
  user: User;
  onLogout: () => void;
  onSelectChapter: (chapterId: number) => void;
  onViewAssignments: () => void;
  onViewReview: () => void;
}

export function Dashboard({ user, onLogout, onSelectChapter, onViewAssignments, onViewReview }: DashboardProps) {
  const [chapters] = useState<Chapter[]>([
    {
      id: 1,
      title: "Grammar Fundamentals",
      description: "Master the basics of English grammar including nouns, verbs, and sentence structure",
      isUnlocked: true,
      isCompleted: false,
      xpReward: 100,
      quizCount: 3,
      assignmentCount: 2
    },
    {
      id: 2,
      title: "Vocabulary Building",
      description: "Expand your English vocabulary with common words and phrases",
      isUnlocked: false,
      isCompleted: false,
      xpReward: 150,
      quizCount: 4,
      assignmentCount: 3
    },
    {
      id: 3,
      title: "Reading Comprehension",
      description: "Improve your reading skills with various text types and exercises",
      isUnlocked: false,
      isCompleted: false,
      xpReward: 200,
      quizCount: 5,
      assignmentCount: 4
    },
    {
      id: 4,
      title: "Writing Skills",
      description: "Learn to write effectively in English with proper structure and style",
      isUnlocked: false,
      isCompleted: false,
      xpReward: 250,
      quizCount: 4,
      assignmentCount: 5
    },
    {
      id: 5,
      title: "Advanced Grammar",
      description: "Master complex grammar concepts and advanced sentence structures",
      isUnlocked: false,
      isCompleted: false,
      xpReward: 300,
      quizCount: 6,
      assignmentCount: 4
    }
  ]);

  const xpProgress = (user.xp / user.totalXp) * 100;
  const completedChapters = chapters.filter(ch => ch.isCompleted).length;
  const totalQuizzes = chapters.reduce((acc, ch) => acc + ch.quizCount, 0);
  const totalAssignments = chapters.reduce((acc, ch) => acc + ch.assignmentCount, 0);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">EduQuest</h1>
              <p className="text-gray-400 text-sm">Welcome back, {user.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-400">Level {user.level}</p>
              <p className="text-sm font-medium">{user.xp} / {user.totalXp} XP</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onLogout} className="text-gray-400 hover:text-white">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Level Progress</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">Level {user.level}</div>
              <Progress value={xpProgress} className="mt-2" />
              <p className="text-xs text-gray-400 mt-1">{user.xp} / {user.totalXp} XP</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Chapters</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{completedChapters}/{chapters.length}</div>
              <p className="text-xs text-gray-400">Completed</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Quizzes</CardTitle>
              <Target className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalQuizzes}</div>
              <p className="text-xs text-gray-400">Available</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Assignments</CardTitle>
              <FileText className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalAssignments}</div>
              <p className="text-xs text-gray-400">Total</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button 
            onClick={onViewAssignments}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <FileText className="h-4 w-4 mr-2" />
            View Assignments
          </Button>
          <Button 
            onClick={onViewReview}
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Review Progress
          </Button>
        </div>

        {/* Achievements */}
        <Card className="bg-gray-900 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
              Recent Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {user.badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                  <Trophy className="h-3 w-3 mr-1" />
                  {badge}
                </Badge>
              ))}
              {user.badges.length === 0 && (
                <p className="text-gray-400">Complete your first quiz to earn achievements!</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Chapters */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Course Chapters</CardTitle>
            <p className="text-gray-400">Progress through chapters to unlock new content</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {chapters.map((chapter) => (
                <Card 
                  key={chapter.id} 
                  className={`${
                    chapter.isUnlocked 
                      ? 'bg-gray-800 border-gray-600 hover:bg-gray-750 cursor-pointer' 
                      : 'bg-gray-800/50 border-gray-700'
                  } transition-colors`}
                  onClick={() => chapter.isUnlocked && onSelectChapter(chapter.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg ${
                          chapter.isCompleted 
                            ? 'bg-green-600' 
                            : chapter.isUnlocked 
                              ? 'bg-blue-600' 
                              : 'bg-gray-700'
                        }`}>
                          {chapter.isCompleted ? (
                            <CheckCircle className="h-6 w-6 text-white" />
                          ) : chapter.isUnlocked ? (
                            <Play className="h-6 w-6 text-white" />
                          ) : (
                            <Lock className="h-6 w-6 text-gray-400" />
                          )}
                        </div>
                        <div>
                          <h3 className={`font-medium ${chapter.isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                            {chapter.title}
                          </h3>
                          <p className={`text-sm ${chapter.isUnlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                            {chapter.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className={`text-xs ${chapter.isUnlocked ? 'text-blue-400' : 'text-gray-600'}`}>
                              {chapter.quizCount} Quizzes
                            </span>
                            <span className={`text-xs ${chapter.isUnlocked ? 'text-purple-400' : 'text-gray-600'}`}>
                              {chapter.assignmentCount} Assignments
                            </span>
                            <span className={`text-xs ${chapter.isUnlocked ? 'text-yellow-400' : 'text-gray-600'}`}>
                              +{chapter.xpReward} XP
                            </span>
                          </div>
                        </div>
                      </div>
                      {chapter.isCompleted && (
                        <Badge variant="secondary" className="bg-green-600 text-white">
                          Completed
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}