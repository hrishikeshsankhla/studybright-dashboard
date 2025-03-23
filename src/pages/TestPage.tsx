
import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockExams, mockQuestions } from "@/data/mockData";
import { Answer, Question } from "@/types";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight, Clock, Pause, RotateCcw, CheckCheck } from "lucide-react";

interface TestState {
  currentQuestionIndex: number;
  answers: Answer[];
  timeRemaining: number; // in seconds
  isPaused: boolean;
}

const TestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const exam = mockExams.find((e) => e.id === id);
  const questions = useMemo(() => mockQuestions.slice(0, 5), []);  // Using first 5 mock questions
  
  const [showPauseDialog, setShowPauseDialog] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [testState, setTestState] = useState<TestState>({
    currentQuestionIndex: 0,
    answers: questions.map(q => ({ questionId: q.id, selectedOption: null, isMarkedForReview: false })),
    timeRemaining: (exam?.duration || 60) * 60, // Convert minutes to seconds
    isPaused: false,
  });
  
  // Format time remaining
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')} : ${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };
  
  // Timer effect
  useEffect(() => {
    if (testState.isPaused || testState.timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTestState(prev => {
        const newTimeRemaining = prev.timeRemaining - 1;
        if (newTimeRemaining <= 0) {
          clearInterval(timer);
          toast.warning("Time's up! Submitting your test...");
          setTimeout(() => handleSubmitTest(), 1000);
          return { ...prev, timeRemaining: 0 };
        }
        return { ...prev, timeRemaining: newTimeRemaining };
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [testState.isPaused, testState.timeRemaining]);
  
  if (!exam) {
    navigate("/exams");
    return null;
  }
  
  const currentQuestion = questions[testState.currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    setTestState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = {
        ...newAnswers[prev.currentQuestionIndex],
        selectedOption: optionIndex,
      };
      return { ...prev, answers: newAnswers };
    });
  };
  
  const handleClearResponse = () => {
    setTestState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = {
        ...newAnswers[prev.currentQuestionIndex],
        selectedOption: null,
      };
      return { ...prev, answers: newAnswers };
    });
  };
  
  const handleMarkForReview = () => {
    setTestState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = {
        ...newAnswers[prev.currentQuestionIndex],
        isMarkedForReview: !newAnswers[prev.currentQuestionIndex].isMarkedForReview,
      };
      return { ...prev, answers: newAnswers };
    });
  };
  
  const navigateToQuestion = (index: number) => {
    setTestState(prev => ({ ...prev, currentQuestionIndex: index }));
  };
  
  const handleSaveAndNext = () => {
    if (testState.currentQuestionIndex < questions.length - 1) {
      setTestState(prev => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1 }));
    }
  };
  
  const handlePauseTest = () => {
    setTestState(prev => ({ ...prev, isPaused: true }));
    setShowPauseDialog(true);
  };
  
  const handleResumeTest = () => {
    setTestState(prev => ({ ...prev, isPaused: false }));
    setShowPauseDialog(false);
  };
  
  const handleSubmitTest = () => {
    // In a real app, you would submit the test data to the server here
    navigate(`/test/${id}/results`);
  };
  
  // Get status for each question
  const getQuestionStatus = (index: number) => {
    const answer = testState.answers[index];
    if (answer.isMarkedForReview && answer.selectedOption !== null) {
      return "answered-review";
    } else if (answer.isMarkedForReview) {
      return "review";
    } else if (answer.selectedOption !== null) {
      return "answered";
    } else {
      return "unanswered";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container py-3 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded bg-brand-500 flex items-center justify-center mr-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L7 12H17L12 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-semibold">{exam.title}</h1>
              <p className="text-xs text-muted-foreground">{exam.examType}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-brand-500" />
              <span className="text-lg font-medium">
                {formatTime(testState.timeRemaining)}
              </span>
            </div>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={handlePauseTest}
            >
              <Pause className="h-4 w-4" />
              Pause
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setShowSubmitDialog(true)}
            >
              <CheckCheck className="h-4 w-4" />
              Submit Test
            </Button>
          </div>
        </div>
      </header>

      {/* Test content */}
      <div className="flex-1 container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Section */}
          <div className="lg:col-span-9">
            <Card className="p-6 shadow-sm border-none">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Question {testState.currentQuestionIndex + 1} of {questions.length}</h2>
                <div className="flex items-center">
                  <div className="text-xs bg-brand-100 text-brand-700 px-2 py-0.5 rounded-full">
                    Marks: +{currentQuestion.marks}
                  </div>
                  <div className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full ml-2">
                    Negative: -{exam.negativeMarking}
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg whitespace-pre-line mb-2">{currentQuestion.text}</p>
              </div>

              <div className="space-y-4 mb-8">
                <RadioGroup
                  value={testState.answers[testState.currentQuestionIndex].selectedOption?.toString() || ""}
                  onValueChange={(value) => handleOptionSelect(parseInt(value))}
                >
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-start p-4 rounded-md border ${
                        testState.answers[testState.currentQuestionIndex].selectedOption === index
                          ? "border-brand-500 bg-brand-50"
                          : "border-gray-200 hover:border-gray-300"
                      } transition-colors`}
                    >
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor={`option-${index}`}
                        className="ml-3 text-base cursor-pointer flex-1"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex flex-wrap gap-3 justify-between">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleClearResponse}
                    disabled={testState.answers[testState.currentQuestionIndex].selectedOption === null}
                  >
                    Clear Response
                  </Button>
                  <Button
                    variant={
                      testState.answers[testState.currentQuestionIndex].isMarkedForReview
                        ? "default"
                        : "outline"
                    }
                    className={
                      testState.answers[testState.currentQuestionIndex].isMarkedForReview
                        ? "bg-amber-500 hover:bg-amber-600"
                        : ""
                    }
                    onClick={handleMarkForReview}
                  >
                    {testState.answers[testState.currentQuestionIndex].isMarkedForReview
                      ? "Marked for Review"
                      : "Mark for Review"}
                  </Button>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    disabled={testState.currentQuestionIndex === 0}
                    onClick={() => navigateToQuestion(testState.currentQuestionIndex - 1)}
                    className="flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  <Button
                    onClick={handleSaveAndNext}
                    disabled={testState.currentQuestionIndex === questions.length - 1}
                    className="bg-brand-500 hover:bg-brand-600 flex items-center"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Question Palette */}
          <div className="lg:col-span-3">
            <Card className="shadow-sm border-none">
              <div className="p-4 border-b">
                <h3 className="font-medium">Question Palette</h3>
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-3 mb-4">
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <span>Not Answered</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                    <span>Marked for Review</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs">
                    <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                    <span>Answered & Marked</span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => {
                    const status = getQuestionStatus(index);
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className={`h-9 p-0 border ${
                          testState.currentQuestionIndex === index ? "border-brand-500 ring-2 ring-brand-200" : ""
                        } ${
                          status === "answered"
                            ? "bg-green-100 border-green-300 text-green-700"
                            : status === "unanswered"
                            ? "bg-red-100 border-red-300 text-red-700"
                            : status === "review"
                            ? "bg-purple-100 border-purple-300 text-purple-700"
                            : "bg-amber-100 border-amber-300 text-amber-700"
                        }`}
                        onClick={() => navigateToQuestion(index)}
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 flex justify-center">
                <Button 
                  className="w-full bg-brand-500 hover:bg-brand-600"
                  onClick={() => setShowSubmitDialog(true)}
                >
                  Submit Test
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Pause Dialog */}
      <Dialog open={showPauseDialog} onOpenChange={setShowPauseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Test Paused</DialogTitle>
            <DialogDescription>
              Your test is currently paused. The timer has been stopped.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <div className="text-center">
              <Clock className="h-12 w-12 mx-auto text-brand-500 mb-2" />
              <p className="text-sm text-muted-foreground">Time remaining: {formatTime(testState.timeRemaining)}</p>
            </div>
          </div>
          <DialogFooter>
            <Button 
              onClick={handleResumeTest}
              className="w-full bg-brand-500 hover:bg-brand-600"
            >
              Resume Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Submit Test</DialogTitle>
            <DialogDescription>
              Are you sure you want to submit your test? You won't be able to change your answers after submission.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center text-sm">
              <span>Total Questions</span>
              <span className="font-medium">{questions.length}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Answered</span>
              <span className="font-medium">
                {testState.answers.filter(a => a.selectedOption !== null).length}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Not Answered</span>
              <span className="font-medium">
                {testState.answers.filter(a => a.selectedOption === null).length}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span>Marked for Review</span>
              <span className="font-medium">
                {testState.answers.filter(a => a.isMarkedForReview).length}
              </span>
            </div>
          </div>
          <DialogFooter className="flex-col sm:flex-row sm:justify-between gap-4">
            <Button
              variant="outline"
              onClick={() => setShowSubmitDialog(false)}
              className="sm:flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitTest}
              className="sm:flex-1 bg-brand-500 hover:bg-brand-600"
            >
              Submit Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TestPage;
