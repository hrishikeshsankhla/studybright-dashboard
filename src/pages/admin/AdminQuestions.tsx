
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockQuestions, mockExams } from "@/data/mockData";
import { ArrowLeft, Edit, Plus, Search, Trash2, Upload, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

const AdminQuestions = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<string | null>(null);
  
  // Filter questions based on search term
  const filteredQuestions = mockQuestions.filter((question) => 
    question.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteQuestion = () => {
    toast.success("Question deleted successfully");
    setShowDeleteDialog(false);
    setQuestionToDelete(null);
  };
  
  const confirmDelete = (questionId: string) => {
    setQuestionToDelete(questionId);
    setShowDeleteDialog(true);
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex items-center mb-6">
        <Button asChild variant="ghost" className="p-0 mr-4">
          <Link to="/admin">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Admin Dashboard
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Question Bank</h1>
          <p className="text-muted-foreground">Manage test questions and answers</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              className="pl-10 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>Add Question</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px]">
              <DialogHeader>
                <DialogTitle>Add New Question</DialogTitle>
                <DialogDescription>
                  Create a new question for the question bank
                </DialogDescription>
              </DialogHeader>
              <Tabs defaultValue="single">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="single">Single Question</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                </TabsList>
                <TabsContent value="single" className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="section">Exam Section</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {mockExams[0].sections.map((section) => (
                          <SelectItem key={section.id} value={section.id}>
                            {section.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="question-text">Question Text</Label>
                    <Textarea
                      id="question-text"
                      placeholder="Enter the question text"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label>Options</Label>
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num} className="flex gap-3 items-center">
                        <div className="flex h-5 w-5 shrink-0 rounded-full border border-primary text-primary-foreground shadow items-center justify-center">
                          {num}
                        </div>
                        <Input placeholder={`Option ${num}`} />
                        <Button variant="outline" size="icon" className="h-9 w-9 shrink-0">
                          <CheckCircle className="h-4 w-4" />
                          <span className="sr-only">Mark as correct</span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="explanation">Explanation</Label>
                    <Textarea
                      id="explanation"
                      placeholder="Explain the correct answer"
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="marks">Marks</Label>
                      <Input id="marks" type="number" placeholder="2" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="difficulty">Difficulty Level</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="bulk" className="space-y-4 py-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center space-y-2">
                    <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="text-lg font-medium">
                      Drag and drop your question file here
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Supported formats: CSV, Excel
                    </div>
                    <div className="pt-4">
                      <Button variant="outline">
                        Browse Files
                        <input type="file" className="sr-only" />
                      </Button>
                    </div>
                  </div>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Instructions</h4>
                    <ul className="text-sm space-y-2 list-disc pl-4">
                      <li>Download the template file to see the required format</li>
                      <li>Each row represents one question</li>
                      <li>Make sure to mark the correct option</li>
                      <li>Provide an explanation for each answer</li>
                    </ul>
                    <Button variant="link" className="text-sm p-0 h-auto mt-2">
                      Download Template
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button type="submit" className="bg-brand-500 hover:bg-brand-600">
                  Save Question
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Question List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium w-6/12">Question</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Section</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Marks</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((question) => {
                    const section = mockExams[0].sections.find(s => s.id === question.sectionId);
                    return (
                      <tr key={question.id} className="hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <div className="line-clamp-2">{question.text}</div>
                        </td>
                        <td className="py-3 px-4 hidden md:table-cell">
                          {section?.name || "General"}
                        </td>
                        <td className="py-3 px-4 hidden lg:table-cell">{question.marks}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() => confirmDelete(question.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                      No questions found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this question? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteQuestion}
            >
              Delete Question
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminQuestions;
