import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle, 
  Clock,
  Star,
  Calendar,
  Upload,
  Eye
} from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  description: string;
  chapterTitle: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  xpEarned?: number;
  instructions: string[];
  submissionDate?: string;
  feedback?: string;
}

interface AssignmentsPageProps {
  onBack: () => void;
}

export function AssignmentsPage({ onBack }: AssignmentsPageProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [assignments] = useState<Assignment[]>([
    {
      id: 1,
      title: "Grammar Analysis Exercise",
      description: "Analyze sentences and identify parts of speech",
      chapterTitle: "Grammar Fundamentals",
      dueDate: "2025-01-15",
      status: "submitted",
      grade: 95,
      xpEarned: 100,
      submissionDate: "2025-01-10",
      feedback: "Excellent work! Your analysis was thorough and accurate. Keep up the great work!",
      instructions: [
        "Read the following sentences carefully",
        "Identify all nouns, verbs, and adjectives in each sentence",
        "Explain the role of each word in the sentence structure",
        "Write your analysis in complete sentences"
      ]
    },
    {
      id: 2,
      title: "Sentence Construction Challenge",
      description: "Create your own sentences using proper grammar rules",
      chapterTitle: "Grammar Fundamentals",
      dueDate: "2025-01-20",
      status: "pending",
      instructions: [
        "Write 10 sentences using the SVO structure",
        "Include at least one adjective in each sentence",
        "Use different types of nouns (people, places, things, ideas)",
        "Ensure proper subject-verb agreement in all sentences"
      ]
    },
    {
      id: 3,
      title: "Vocabulary Application Essay",
      description: "Write a short essay using new vocabulary words",
      chapterTitle: "Vocabulary Building",
      dueDate: "2025-01-25",
      status: "pending",
      instructions: [
        "Choose 15 vocabulary words from Chapter 2",
        "Write a 300-word essay incorporating all words naturally",
        "Ensure proper context usage for each vocabulary word",
        "Include a word count at the end"
      ]
    },
    {
      id: 4,
      title: "Reading Comprehension Report",
      description: "Complete reading exercises and submit analysis",
      chapterTitle: "Reading Comprehension",
      dueDate: "2025-02-01",
      status: "graded",
      grade: 88,
      xpEarned: 180,
      submissionDate: "2025-01-28",
      feedback: "Good understanding of the text. Work on providing more detailed explanations in your analysis.",
      instructions: [
        "Read the assigned passage thoroughly",
        "Answer all comprehension questions",
        "Provide detailed explanations for your answers",
        "Submit within the deadline"
      ]
    }
  ]);

  const getStatusBadge = (status: string, grade?: number) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-600 text-white"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-600 text-white"><Upload className="h-3 w-3 mr-1" />Submitted</Badge>;
      case 'graded':
        const color = grade && grade >= 90 ? 'bg-green-600' : grade && grade >= 80 ? 'bg-blue-600' : 'bg-orange-600';
        return <Badge className={`${color} text-white`}><CheckCircle className="h-3 w-3 mr-1" />Graded</Badge>;
      default:
        return null;
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return assignment.status === "pending";
    if (activeTab === "submitted") return assignment.status === "submitted";
    if (activeTab === "graded") return assignment.status === "graded";
    return true;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
              <h1 className="text-xl font-semibold">Assignments</h1>
              <p className="text-gray-400 text-sm">Track and manage your assignments</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total</p>
                  <p className="text-2xl font-bold text-white">{assignments.length}</p>
                </div>
                <FileText className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {assignments.filter(a => a.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Submitted</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {assignments.filter(a => a.status === 'submitted').length}
                  </p>
                </div>
                <Upload className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Graded</p>
                  <p className="text-2xl font-bold text-green-400">
                    {assignments.filter(a => a.status === 'graded').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="all" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              All Assignments
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Pending
            </TabsTrigger>
            <TabsTrigger value="submitted" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Submitted
            </TabsTrigger>
            <TabsTrigger value="graded" className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
              Graded
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            <div className="space-y-4">
              {filteredAssignments.map((assignment) => (
                <Card key={assignment.id} className="bg-gray-900 border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-white">{assignment.title}</h3>
                          {getStatusBadge(assignment.status, assignment.grade)}
                        </div>
                        <p className="text-gray-400">{assignment.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-blue-400">{assignment.chapterTitle}</span>
                          <span className="text-gray-400 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            Due: {formatDate(assignment.dueDate)}
                          </span>
                          {assignment.status === 'pending' && (
                            <span className={`flex items-center ${
                              getDaysUntilDue(assignment.dueDate) <= 3 ? 'text-red-400' : 'text-yellow-400'
                            }`}>
                              <Clock className="h-3 w-3 mr-1" />
                              {getDaysUntilDue(assignment.dueDate)} days left
                            </span>
                          )}
                          {assignment.xpEarned && (
                            <span className="text-green-400 flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              +{assignment.xpEarned} XP
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {assignment.grade && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{assignment.grade}%</div>
                            <p className="text-gray-400 text-xs">Grade</p>
                          </div>
                        )}
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

                      {assignment.submissionDate && (
                        <div className="bg-gray-800 rounded-lg p-3">
                          <p className="text-gray-400 text-sm">
                            Submitted on {formatDate(assignment.submissionDate)}
                          </p>
                          {assignment.feedback && (
                            <div className="mt-2">
                              <h5 className="font-medium text-white text-sm mb-1">Feedback:</h5>
                              <p className="text-gray-300 text-sm">{assignment.feedback}</p>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="flex gap-2">
                        {assignment.status === 'pending' && (
                          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <Upload className="h-4 w-4 mr-2" />
                            Submit Assignment
                          </Button>
                        )}
                        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
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