
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mockExams } from "@/data/mockData";
import { ArrowLeft, Edit, Plus, Search, Trash2, Copy } from "lucide-react";
import { toast } from "sonner";

const AdminExams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [examToDelete, setExamToDelete] = useState<string | null>(null);
  
  // Filter exams based on search term
  const filteredExams = mockExams.filter((exam) => 
    exam.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    exam.examType.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteExam = () => {
    toast.success("Exam deleted successfully");
    setShowDeleteDialog(false);
    setExamToDelete(null);
  };
  
  const confirmDelete = (examId: string) => {
    setExamToDelete(examId);
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
          <h1 className="text-3xl font-bold mb-2">Test Management</h1>
          <p className="text-muted-foreground">Create, edit, and manage test papers</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exams..."
              className="pl-10 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                <span>New Test</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Test</DialogTitle>
                <DialogDescription>
                  Fill in the details to create a new test paper
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input id="title" className="col-span-3" placeholder="Enter test title" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="exam-type" className="text-right">
                    Exam Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select exam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ssc">SSC</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="railways">Railways</SelectItem>
                      <SelectItem value="upsc">UPSC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input id="description" className="col-span-3" placeholder="Enter test description" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration (mins)
                  </Label>
                  <Input id="duration" type="number" className="col-span-3" placeholder="60" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="total-questions" className="text-right">
                    Total Questions
                  </Label>
                  <Input id="total-questions" type="number" className="col-span-3" placeholder="100" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="max-marks" className="text-right">
                    Maximum Marks
                  </Label>
                  <Input id="max-marks" type="number" className="col-span-3" placeholder="200" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="negative-marking" className="text-right">
                    Negative Marking
                  </Label>
                  <Input id="negative-marking" type="number" step="0.01" className="col-span-3" placeholder="0.25" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="is-premium" className="text-right">
                    Premium Test
                  </Label>
                  <div className="flex items-center space-x-2 col-span-3">
                    <Switch id="is-premium" />
                    <Label htmlFor="is-premium">Mark as premium content</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-brand-500 hover:bg-brand-600">Create Test</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>All Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Title</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Type</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Duration</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Questions</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Status</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredExams.length > 0 ? (
                  filteredExams.map((exam) => (
                    <tr key={exam.id} className="hover:bg-muted/50">
                      <td className="py-3 px-4">{exam.title}</td>
                      <td className="py-3 px-4 hidden md:table-cell">{exam.examType}</td>
                      <td className="py-3 px-4 hidden md:table-cell">{exam.duration} mins</td>
                      <td className="py-3 px-4 hidden lg:table-cell">{exam.totalQuestions}</td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          exam.isPremium 
                            ? "bg-amber-100 text-amber-700" 
                            : "bg-green-100 text-green-700"
                        }`}>
                          {exam.isPremium ? "Premium" : "Free"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Copy className="h-4 w-4" />
                            <span className="sr-only">Duplicate</span>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() => confirmDelete(exam.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-muted-foreground">
                      No exams found
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
              Are you sure you want to delete this test? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteExam}
            >
              Delete Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminExams;
