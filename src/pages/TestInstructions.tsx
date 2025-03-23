
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { mockExams } from "@/data/mockData";
import { ArrowLeft, Clock, FileText, AlertTriangle } from "lucide-react";

const TestInstructions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  // Find the exam by ID
  const exam = mockExams.find((e) => e.id === id);
  
  if (!exam) {
    return (
      <div className="container py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Exam not found</h1>
        <Button asChild>
          <Link to="/exams">Back to Exams</Link>
        </Button>
      </div>
    );
  }

  const handleStartTest = () => {
    if (agreedToTerms) {
      navigate(`/test/${id}`);
    }
  };

  return (
    <div className="container max-w-4xl py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button asChild variant="ghost" className="p-0 mr-4">
          <Link to="/exams">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Exams
          </Link>
        </Button>
      </div>
      
      <Card className="border-none shadow-md">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
            <div>
              <div className="inline-flex h-6 items-center rounded-full px-3 text-xs font-medium bg-brand-100 text-brand-700 mb-2">
                {exam.examType}
              </div>
              <CardTitle className="text-2xl">{exam.title}</CardTitle>
            </div>
            <div className="flex items-center bg-brand-50 px-4 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-brand-500 mr-2" />
              <span className="font-semibold">{exam.duration} Minutes</span>
            </div>
          </div>
          <CardDescription>{exam.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-secondary/50 rounded-lg">
            <div>
              <div className="text-muted-foreground text-sm">Total Questions</div>
              <div className="font-semibold">{exam.totalQuestions}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Maximum Marks</div>
              <div className="font-semibold">{exam.maxMarks}</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Per Question</div>
              <div className="font-semibold">{exam.maxMarks / exam.totalQuestions} marks</div>
            </div>
            <div>
              <div className="text-muted-foreground text-sm">Negative Marking</div>
              <div className="font-semibold">{exam.negativeMarking} marks</div>
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 text-brand-500 mr-2" />
              <h3 className="text-lg font-semibold">Test Instructions</h3>
            </div>
            <Separator className="mb-4" />
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">1</span>
                <span>The test contains {exam.totalQuestions} questions divided into {exam.sections.length} sections.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">2</span>
                <span>Each question has 4 options, out of which only one is correct.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">3</span>
                <span>You have to finish the test in {exam.duration} minutes.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">4</span>
                <span>You will be awarded {exam.maxMarks / exam.totalQuestions} mark for each correct answer and {exam.negativeMarking} will be deducted for each wrong answer.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">5</span>
                <span>There is no negative marking for the questions that you have not attempted.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">6</span>
                <span>You can write this test only once. Make sure that you complete the test before you submit it and/or close the browser.</span>
              </li>
            </ul>
          </div>
          
          <div>
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-5 w-5 text-brand-500 mr-2" />
              <h3 className="text-lg font-semibold">Navigation Instructions</h3>
            </div>
            <Separator className="mb-4" />
            <ul className="space-y-3 text-sm">
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">1</span>
                <span>The Question Palette displayed on the right side of screen will show the status of each question using colored icons.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">2</span>
                <span>You can click on the question numbers in the Question Palette to navigate directly to a specific question.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">3</span>
                <span>Use the "Save & Next" button to save your answer and proceed to the next question.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">4</span>
                <span>Use the "Mark for Review & Next" button if you want to mark a question for review and proceed to the next question.</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 h-5 w-5 rounded-full bg-brand-100 flex items-center justify-center text-xs font-medium">5</span>
                <span>You can submit the test at any time by clicking the "Submit Test" button. Confirm your submission in the dialog that appears.</span>
              </li>
            </ul>
          </div>
          
          <div className="flex items-center space-x-2 bg-brand-50 p-4 rounded-lg">
            <Checkbox 
              id="terms" 
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="h-5 w-5"
            />
            <Label htmlFor="terms" className="text-sm">
              I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification.
            </Label>
          </div>
        </CardContent>
        
        <CardFooter>
          <div className="flex flex-col-reverse sm:flex-row w-full gap-4">
            <Button 
              variant="outline" 
              asChild 
              className="sm:flex-1"
            >
              <Link to="/exams">Cancel</Link>
            </Button>
            <Button 
              onClick={handleStartTest}
              disabled={!agreedToTerms}
              className="sm:flex-1 bg-brand-500 hover:bg-brand-600"
            >
              I am ready to begin
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TestInstructions;
