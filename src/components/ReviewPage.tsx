import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Trophy, 
  Star, 
  TrendingUp,
  Calendar,
  Target,
  BookOpen,
  Award,
  BarChart3
} from 'lucide-react';

interface ReviewPageProps {
  onBack: () => void;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earnedDate: string;
  xpReward: number;
}

interface QuizResult {
  id: number;
  quizTitle: string;
  chapterTitle: string;
  score: number;
  totalQuestions: number;
  completedDate: string;
  xpEarned: number;
  timeSpent: number; // in minutes
}

interface ProgressData {
  level: number;
  currentXP: number;
  totalXP: number;
  completedChapters: number;
  totalChapters: number;
  quizzesCompleted: number;
  assignmentsSubmitted: number;
  averageScore: number;
  studyStreak: number;
}

export function ReviewPage({ onBack }: ReviewPageProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const progressData: ProgressData = {
    level: 3,
    currentXP: 850,
    totalXP: 1000,
    completedChapters: 2,
    totalChapters: 5,
    quizzesCompleted: 8,
    assignmentsSubmitted: 3,
    averageScore: 87,
    studyStreak: 12
  };

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first quiz",
      icon: "🎯",
      earnedDate: "2025-01-05",
      xpReward: 25
    },
    {
      id: 2,
      title: "Perfect Score",
      description: "Score 100% on any quiz",
      icon: "🏆",
      earnedDate: "2025-01-08",
      xpReward: 50
    },
    {
      id: 3,
      title: "Grammar Master",
      description: "Complete Grammar Fundamentals chapter",
      icon: "📚",
      earnedDate: "2025-01-12",
      xpReward: 100
    },
    {
      id: 4,
      title: "Study Streak",
      description: "Study for 7 consecutive days",
      icon: "🔥",
      earnedDate: "2025-01-15",
      xpReward: 75
    },
    {
      id: 5,
      title: "Quick Learner",
      description: "Complete a quiz in under 5 minutes",
      icon: "⚡",
      earnedDate: "2025-01-18",
      xpReward: 40
    }
  ];

  const quizResults: QuizResult[] = [
    {
      id: 1,
      quizTitle: "Parts of Speech Quiz",
      chapterTitle: "Grammar Fundamentals",
      score: 5,
      totalQuestions: 5,
      completedDate: "2025-01-08",
      xpEarned: 50,
      timeSpent: 8
    },
    {
      id: 2,
      quizTitle: "Sentence Structure Quiz",
      chapterTitle: "Grammar Fundamentals",
      score: 2,
      totalQuestions: 3,
      completedDate: "2025-01-10",
      xpEarned: 60,
      timeSpent: 12
    },
    {
      id: 3,
      quizTitle: "Basic Vocabulary Test",
      chapterTitle: "Vocabulary Building",
      score: 9,
      totalQuestions: 10,
      completedDate: "2025-01-15",
      xpEarned: 120,
      timeSpent: 15
    },
    {
      id: 4,
      quizTitle: "Word Usage Quiz",
      chapterTitle: "Vocabulary Building",
      score: 7,
      totalQuestions: 8,
      completedDate: "2025-01-18",
      xpEarned: 105,
      timeSpent: 10
    }
  ];

  const weeklyData = [
    { day: 'Mon', xp: 120 },
    { day: 'Tue', xp: 85 },
    { day: 'Wed', xp: 150 },
    { day: 'Thu', xp: 95 },
    { day: 'Fri', xp: 180 },
    { day: 'Sat', xp: 110 },
    { day: 'Sun', xp: 200 }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 80) return 'text-blue-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Review & Progress</h1>
              <p className="text-gray-400 text-sm">Track your learning journey and achievements</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="overview" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Trophy className="h-4 w-4 mr-2" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="history" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Calendar className="h-4 w-4 mr-2" />
              Quiz History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Progress Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Current Level</p>
                      <p className="text-2xl font-bold text-blue-400">{progressData.level}</p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-400" />
                  </div>
                  <div className="mt-2">
                    <Progress value={(progressData.currentXP / progressData.totalXP) * 100} className="h-2" />
                    <p className="text-xs text-gray-400 mt-1">
                      {progressData.currentXP} / {progressData.totalXP} XP
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Average Score</p>
                      <p className="text-2xl font-bold text-green-400">{progressData.averageScore}%</p>
                    </div>
                    <Target className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Study Streak</p>
                      <p className="text-2xl font-bold text-orange-400">{progressData.studyStreak}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-900 border-gray-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Quizzes Done</p>
                      <p className="text-2xl font-bold text-purple-400">{progressData.quizzesCompleted}</p>
                    </div>
                    <BookOpen className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly XP Chart */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-400" />
                  Weekly XP Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyData.map((day, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-12 text-sm text-gray-400">{day.day}</div>
                      <div className="flex-1">
                        <div className="bg-gray-800 rounded-full h-4 relative overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full transition-all duration-300"
                            style={{ width: `${(day.xp / 200) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div className="w-16 text-sm text-right text-gray-300">{day.xp} XP</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chapter Progress */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Chapter Completion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Overall Progress</span>
                    <span className="text-white">
                      {progressData.completedChapters} / {progressData.totalChapters} chapters
                    </span>
                  </div>
                  <Progress 
                    value={(progressData.completedChapters / progressData.totalChapters) * 100} 
                    className="h-3"
                  />
                  <p className="text-gray-400 text-sm">
                    {Math.round((progressData.completedChapters / progressData.totalChapters) * 100)}% complete
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="text-4xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-white">{achievement.title}</h3>
                          <Badge className="bg-yellow-600 text-white">
                            <Star className="h-3 w-3 mr-1" />
                            +{achievement.xpReward} XP
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                        <div className="flex items-center mt-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          Earned on {formatDate(achievement.earnedDate)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <div className="space-y-4">
              {quizResults.map((result) => (
                <Card key={result.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-white">{result.quizTitle}</h3>
                        <p className="text-gray-400 text-sm">{result.chapterTitle}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-500 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {formatDate(result.completedDate)}
                          </span>
                          <span className="text-blue-400">
                            Time: {result.timeSpent} minutes
                          </span>
                          <span className="text-green-400 flex items-center">
                            <Star className="h-3 w-3 mr-1" />
                            +{result.xpEarned} XP
                          </span>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <div className={`text-2xl font-bold ${getScoreColor(result.score, result.totalQuestions)}`}>
                          {result.score}/{result.totalQuestions}
                        </div>
                        <div className="text-gray-400 text-sm">
                          {Math.round((result.score / result.totalQuestions) * 100)}%
                        </div>
                        <Badge 
                          className={`${
                            (result.score / result.totalQuestions) >= 0.9 ? 'bg-green-600' :
                            (result.score / result.totalQuestions) >= 0.8 ? 'bg-blue-600' :
                            (result.score / result.totalQuestions) >= 0.7 ? 'bg-yellow-600' : 'bg-red-600'
                          } text-white`}
                        >
                          {(result.score / result.totalQuestions) >= 0.9 ? 'Excellent' :
                           (result.score / result.totalQuestions) >= 0.8 ? 'Great' :
                           (result.score / result.totalQuestions) >= 0.7 ? 'Good' : 'Needs Work'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}