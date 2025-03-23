
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { mockExams, mockQuestions, mockResults } from "@/data/mockData";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight, Download, Share2 } from "lucide-react";
import { useState } from "react";

const COLORS = ["#30A8D0", "#FF6B6B", "#FFD166"];

const TestResults = () => {
  const { id } = useParams();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Find exam, result (mocked for demo)
  const exam = mockExams.find(e => e.id === id);
  const result = mockResults[0]; // Just using the first result for demo
  const questions = mockQuestions.slice(0, 5); // Using first 5 mock questions
  
  if (!exam || !result) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Result not found</h1>
        <Button asChild>
          <Link to="/exams">Back to Exams</Link>
        </Button>
      </div>
    );
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  
  // Performance data for charts
  const pieData = [
    { name: "Correct", value: result.correctAnswers },
    { name: "Incorrect", value: result.incorrectAnswers },
    { name: "Unattempted", value: result.unattempted }
  ];
  
  const sectionPerformance = exam.sections.map(section => ({
    name: section.name.split(" ")[0], // Taking just the first word for brevity in chart
    score: Math.floor(Math.random() * section.questionCount), // Random score for demo
    total: section.questionCount
  }));
  
  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button asChild variant="ghost" className="p-0 mr-4">
          <Link to="/dashboard">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      <h1 className="text-3xl font-bold mb-2">Test Results</h1>
      <p className="text-muted-foreground mb-6">{exam.title}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Your Score</CardTitle>
            <CardDescription>Total marks obtained</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">{result.score}/{result.maxScore}</div>
            <div className="text-sm text-muted-foreground">{Math.round((result.score / result.maxScore) * 100)}% score</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Time Taken</CardTitle>
            <CardDescription>Total time spent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">
              {Math.floor(result.timeTaken / 60)}:{(result.timeTaken % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-sm text-muted-foreground">Out of {exam.duration} minutes</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Rank</CardTitle>
            <CardDescription>Your position</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">42</div>
            <div className="text-sm text-muted-foreground">Out of 547 test takers</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex justify-center items-center">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    dataKey="value"
                    labelLine={false}
                    label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Section-wise Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-80 flex justify-center items-center">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sectionPerformance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar name="Score" dataKey="score" fill="#30A8D0" />
                  <Bar name="Total" dataKey="total" fill="#d3d3d3" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Question-wise Analysis</CardTitle>
          <CardDescription>Review your performance on each question</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">
                Question {currentQuestionIndex + 1} of {questions.length}
              </h3>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentQuestionIndex === 0}
                  onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentQuestionIndex === questions.length - 1}
                  onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 ${
                  currentQuestion.correctOption === 0 ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                }`}>
                  {currentQuestion.correctOption === 0 ? 
                    <CheckCircle className="h-4 w-4" /> : 
                    <XCircle className="h-4 w-4" />
                  }
                </div>
                <span className="font-medium">{currentQuestion.text}</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-6">
              <RadioGroup value="0">
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex items-start p-4 rounded-md border ${
                      index === currentQuestion.correctOption
                        ? "border-green-500 bg-green-50"
                        : index === 0
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <label htmlFor={`option-${index}`} className="ml-3 flex-1">
                      <div className="flex justify-between">
                        <span>{option}</span>
                        {index === currentQuestion.correctOption && (
                          <CheckCircle className="h-5 w-5 text-green-600" />
                        )}
                        {index === 0 && index !== currentQuestion.correctOption && (
                          <XCircle className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                    </label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            <div className="bg-brand-50 p-4 rounded-lg">
              <div className="flex items-start mb-2">
                <AlertCircle className="h-5 w-5 text-brand-500 mr-2 mt-0.5" />
                <h4 className="font-medium">Explanation</h4>
              </div>
              <p>{currentQuestion.explanation}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button asChild className="bg-brand-500 hover:bg-brand-600">
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
        <Button asChild variant="outline" className="flex items-center">
          <Link to="#" download>
            <Download className="h-4 w-4 mr-2" />
            Download Results
          </Link>
        </Button>
        <Button variant="outline" className="flex items-center">
          <Share2 className="h-4 w-4 mr-2" />
          Share Results
        </Button>
      </div>
    </div>
  );
};

export default TestResults;
