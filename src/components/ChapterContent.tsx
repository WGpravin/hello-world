import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  CheckCircle, 
  Star,
  BookOpen,
  PenTool,
  Target
} from 'lucide-react';
import { QuizComponent } from './QuizComponent';

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: any[];
  timeLimit: number;
  xpReward: number;
  chapterId: number;
  isCompleted: boolean;
}

interface Assignment {
  id: number;
  title: string;
  description: string;
  instructions: string[];
  xpReward: number;
  chapterId: number;
  isCompleted: boolean;
}

interface ChapterData {
  id: number;
  title: string;
  description: string;
  content: string[];
  quizzes: Quiz[];
  assignments: Assignment[];
}

interface ChapterContentProps {
  chapterId: number;
  onBack: () => void;
  onQuizComplete: (quizId: number, score: number, xpEarned: number) => void;
  onAssignmentSubmit: (assignmentId: number) => void;
}

export function ChapterContent({ chapterId, onBack, onQuizComplete, onAssignmentSubmit }: ChapterContentProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [activeTab, setActiveTab] = useState("content");

  // Sample chapter data
  const chapterData: ChapterData = {
    id: chapterId,
    title: "Grammar Fundamentals",
    description: "Master the basics of English grammar including nouns, verbs, and sentence structure",
    content: [
      "Grammar is the foundation of effective communication in English. In this chapter, we'll explore the fundamental building blocks of the English language.",
      "**Nouns** are words that name people, places, things, or ideas. Examples include: student, school, book, happiness.",
      "**Verbs** are action words or words that show a state of being. Examples include: run, study, is, become.",
      "**Adjectives** describe or modify nouns. They provide additional information about size, color, shape, or quality. Examples: big, red, round, beautiful.",
      "**Sentence Structure**: A basic English sentence follows the Subject-Verb-Object (SVO) pattern. For example: 'The student (subject) reads (verb) the book (object).'",
      "**Articles** (a, an, the) are used before nouns to specify whether we're talking about something general or specific.",
      "Understanding these basic components will help you construct clear and grammatically correct sentences in English."
    ],
    quizzes: [
      {
        id: 1,
        title: "Parts of Speech Quiz",
        description: "Test your knowledge of nouns, verbs, adjectives, and other parts of speech",
        timeLimit: 10,
        xpReward: 50,
        chapterId,
        isCompleted: false,
        questions: [
          {
            id: 1,
            question: "Which of the following is a noun?",
            options: ["Quickly", "Beautiful", "Happiness", "Running"],
            correctAnswer: 2,
            explanation: "Happiness is a noun because it names an idea or concept."
          },
          {
            id: 2,
            question: "In the sentence 'The cat runs quickly', what is the verb?",
            options: ["The", "Cat", "Runs", "Quickly"],
            correctAnswer: 2,
            explanation: "Runs is the verb because it shows the action that the cat is performing."
          },
          {
            id: 3,
            question: "Which word is an adjective in 'The red car is fast'?",
            options: ["Car", "Red", "Is", "Fast"],
            correctAnswer: 1,
            explanation: "Red is an adjective because it describes the color of the car."
          },
          {
            id: 4,
            question: "What type of word is 'the' in English grammar?",
            options: ["Noun", "Verb", "Article", "Adjective"],
            correctAnswer: 2,
            explanation: "The is a definite article used before nouns to specify particular items."
          },
          {
            id: 5,
            question: "Which sentence follows correct SVO structure?",
            options: [
              "Beautiful the garden is",
              "Students study hard",
              "Running in the park",
              "Books on the table"
            ],
            correctAnswer: 1,
            explanation: "Students (subject) study (verb) hard (object/complement) follows the SVO pattern."
          }
        ]
      },
      {
        id: 2,
        title: "Sentence Structure Quiz",
        description: "Practice identifying and constructing proper sentence structures",
        timeLimit: 15,
        xpReward: 75,
        chapterId,
        isCompleted: false,
        questions: [
          {
            id: 1,
            question: "What is the subject in 'The talented musician plays beautiful songs'?",
            options: ["Talented", "The talented musician", "Plays", "Beautiful songs"],
            correctAnswer: 1,
            explanation: "The talented musician is the complete subject, including the article and adjective."
          },
          {
            id: 2,
            question: "Which sentence is grammatically correct?",
            options: [
              "She don't like pizza",
              "She doesn't like pizza", 
              "She not like pizza",
              "She no like pizza"
            ],
            correctAnswer: 1,
            explanation: "She doesn't like pizza uses the correct form of the negative with third person singular."
          },
          {
            id: 3,
            question: "What makes this sentence incorrect: 'The students is studying'?",
            options: [
              "Wrong verb tense",
              "Subject-verb disagreement",
              "Missing object",
              "Wrong word order"
            ],
            correctAnswer: 1,
            explanation: "Students is plural, so it should be 'are studying' not 'is studying'."
          }
        ]
      }
    ],
    assignments: [
      {
        id: 1,
        title: "Grammar Analysis Exercise",
        description: "Analyze sentences and identify parts of speech",
        instructions: [
          "Read the following sentences carefully",
          "Identify all nouns, verbs, and adjectives in each sentence",
          "Explain the role of each word in the sentence structure",
          "Write your analysis in complete sentences"
        ],
        xpReward: 100,
        chapterId,
        isCompleted: false
      },
      {
        id: 2,
        title: "Sentence Construction Challenge",
        description: "Create your own sentences using proper grammar rules",
        instructions: [
          "Write 10 sentences using the SVO structure",
          "Include at least one adjective in each sentence",
          "Use different types of nouns (people, places, things, ideas)",
          "Ensure proper subject-verb agreement in all sentences"
        ],
        xpReward: 120,
        chapterId,
        isCompleted: false
      }
    ]
  };

  if (selectedQuiz) {
    return (
      <QuizComponent
        quiz={selectedQuiz}
        onComplete={(score, xpEarned) => {
          onQuizComplete(selectedQuiz.id, score, xpEarned);
          setSelectedQuiz(null);
        }}
        onBack={() => setSelectedQuiz(null)}
      />
    );
  }

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
              <h1 className="text-xl font-semibold">{chapterData.title}</h1>
              <p className="text-gray-400 text-sm">{chapterData.description}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="content" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <BookOpen className="h-4 w-4 mr-2" />
              Lesson Content
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              Quizzes
            </TabsTrigger>
            <TabsTrigger value="assignments" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              <PenTool className="h-4 w-4 mr-2" />
              Assignments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-400" />
                  Chapter Content
                </CardTitle>
              </CardHeader>
              <CardContent className="prose prose-invert max-w-none">
                <div className="space-y-4">
                  {chapterData.content.map((paragraph, index) => (
                    <p key={index} className="text-gray-300 leading-relaxed">
                      {paragraph.split('**').map((part, i) => 
                        i % 2 === 1 ? <strong key={i} className="text-white font-semibold">{part}</strong> : part
                      )}
                    </p>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <div className="grid gap-6">
              {chapterData.quizzes.map((quiz) => (
                <Card key={quiz.id} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-white">{quiz.title}</h3>
                          {quiz.isCompleted && (
                            <Badge className="bg-green-600 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400">{quiz.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-blue-400">{quiz.questions.length} Questions</span>
                          <span className="text-yellow-400">{quiz.timeLimit} Minutes</span>
                          <span className="text-green-400">+{quiz.xpReward} XP</span>
                        </div>
                      </div>
                      <Button 
                        onClick={() => setSelectedQuiz(quiz)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Play className="h-4 w-4 mr-2" />
                        {quiz.isCompleted ? 'Retake Quiz' : 'Start Quiz'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="assignments" className="space-y-6">
            <div className="grid gap-6">
              {chapterData.assignments.map((assignment) => (
                <Card key={assignment.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                          {assignment.isCompleted && (
                            <Badge className="bg-green-600 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-400">{assignment.description}</p>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400">+{assignment.xpReward} XP</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-white mb-2">Instructions:</h4>
                        <ul className="space-y-1">
                          {assignment.instructions.map((instruction, index) => (
                            <li key={index} className="text-gray-300 text-sm flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              {instruction}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <Button 
                        onClick={() => onAssignmentSubmit(assignment.id)}
                        disabled={assignment.isCompleted}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        {assignment.isCompleted ? 'Submitted' : 'Submit Assignment'}
                      </Button>
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