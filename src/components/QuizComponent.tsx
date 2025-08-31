import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Star, 
  Trophy, 
  ArrowLeft,
  Clock,
  Zap
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
  xpReward: number;
  chapterId: number;
}

interface QuizComponentProps {
  quiz: Quiz;
  onComplete: (score: number, xpEarned: number) => void;
  onBack: () => void;
}

export function QuizComponent({ quiz, onComplete, onBack }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(quiz.questions.length).fill(-1));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convert to seconds
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleFinishQuiz();
    }
  }, [timeLeft, quizStarted, showResults]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFinishQuiz = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    return (calculateScore() / quiz.questions.length) * 100;
  };

  const getXPEarned = () => {
    const scorePercentage = getScorePercentage();
    if (scorePercentage >= 90) return quiz.xpReward;
    if (scorePercentage >= 80) return Math.floor(quiz.xpReward * 0.8);
    if (scorePercentage >= 70) return Math.floor(quiz.xpReward * 0.6);
    if (scorePercentage >= 60) return Math.floor(quiz.xpReward * 0.4);
    return Math.floor(quiz.xpReward * 0.2);
  };

  const getBadgeEarned = () => {
    const scorePercentage = getScorePercentage();
    if (scorePercentage >= 95) return "Perfect Score";
    if (scorePercentage >= 90) return "Excellent";
    if (scorePercentage >= 80) return "Great Job";
    if (scorePercentage >= 70) return "Good Work";
    return null;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gray-700 max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                <Zap className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-white">{quiz.title}</CardTitle>
            <p className="text-gray-400">{quiz.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-400">{quiz.questions.length}</div>
                <p className="text-gray-400">Questions</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-yellow-400">{quiz.timeLimit}</div>
                <p className="text-gray-400">Minutes</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-400">{quiz.xpReward}</div>
                <p className="text-gray-400">Max XP</p>
              </div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-white mb-2">Quiz Instructions:</h3>
              <ul className="text-gray-400 space-y-1 text-sm">
                <li>• Choose the best answer for each question</li>
                <li>• You can navigate between questions freely</li>
                <li>• Your final score determines XP earned</li>
                <li>• Complete within the time limit to get full credit</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={onBack} className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Chapter
              </Button>
              <Button 
                onClick={() => setQuizStarted(true)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const scorePercentage = getScorePercentage();
    const xpEarned = getXPEarned();
    const badge = getBadgeEarned();

    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <Card className="bg-gray-900 border-gray-700 max-w-2xl w-full">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full ${scorePercentage >= 70 ? 'bg-gradient-to-r from-green-600 to-blue-600' : 'bg-gradient-to-r from-red-600 to-orange-600'}`}>
                {scorePercentage >= 70 ? (
                  <Trophy className="h-8 w-8 text-white" />
                ) : (
                  <XCircle className="h-8 w-8 text-white" />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl text-white">
              {scorePercentage >= 90 ? "Excellent Work!" : 
               scorePercentage >= 70 ? "Great Job!" : 
               "Keep Practicing!"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-white">{scorePercentage.toFixed(0)}%</div>
              <p className="text-gray-400">{score} out of {quiz.questions.length} questions correct</p>
              
              <div className="flex justify-center items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">+{xpEarned}</div>
                  <p className="text-gray-400 text-sm">XP Earned</p>
                </div>
                {badge && (
                  <div className="text-center">
                    <Badge className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      {badge}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h3 className="font-medium text-white mb-4">Question Review:</h3>
              <div className="space-y-3">
                {quiz.questions.map((question, index) => {
                  const isCorrect = selectedAnswers[index] === question.correctAnswer;
                  const wasAnswered = selectedAnswers[index] !== -1;
                  
                  return (
                    <div key={question.id} className="flex items-center justify-between p-2 rounded border border-gray-700">
                      <span className="text-gray-300">Question {index + 1}</span>
                      <div className="flex items-center space-x-2">
                        {!wasAnswered ? (
                          <XCircle className="h-4 w-4 text-gray-500" />
                        ) : isCorrect ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-400" />
                        )}
                        <span className={`text-sm ${!wasAnswered ? 'text-gray-500' : isCorrect ? 'text-green-400' : 'text-red-400'}`}>
                          {!wasAnswered ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Button 
              onClick={() => onComplete(score, xpEarned)}
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Continue Learning
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="text-gray-400 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Exit Quiz
          </Button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-yellow-400">
              <Clock className="h-4 w-4 mr-1" />
              {formatTime(timeLeft)}
            </div>
            <div className="text-gray-400">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="text-gray-400 text-sm mt-2">{progress.toFixed(0)}% Complete</p>
        </div>

        {/* Question */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-white">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`w-full text-left p-4 h-auto border-gray-600 hover:bg-gray-800 ${
                  selectedAnswers[currentQuestion] === index 
                    ? 'bg-blue-600 border-blue-500 text-white' 
                    : 'bg-gray-800 text-gray-300'
                }`}
                onClick={() => handleAnswerSelect(index)}
              >
                <div className="flex items-center">
                  <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="border-gray-600 text-gray-300 hover:bg-gray-800 disabled:opacity-50"
          >
            Previous
          </Button>
          
          {currentQuestion === quiz.questions.length - 1 ? (
            <Button 
              onClick={handleFinishQuiz}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              Finish Quiz
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === -1}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}