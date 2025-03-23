
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Filter, Lock, Search } from "lucide-react";
import { mockExams } from "@/data/mockData";

const ExamsList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Filter exams based on search term and selected type
  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        exam.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || exam.examType.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  // Get unique exam types for filter
  const examTypes = ["all", ...Array.from(new Set(mockExams.map((exam) => exam.examType.toLowerCase())))];

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Available Exams</h1>
          <p className="text-muted-foreground">Browse and take mock tests for various government exams</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search exams..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Label>Filter by exam type:</Label>
          </div>
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {examTypes.map((type) => (
              <TabsTrigger
                key={type}
                value={type}
                className="capitalize"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.length > 0 ? (
          filteredExams.map((exam) => (
            <Card key={exam.id} className="overflow-hidden card-hover">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="inline-flex h-6 items-center rounded-full px-3 text-xs font-medium bg-brand-100 text-brand-700 mb-1">
                    {exam.examType}
                  </div>
                  {exam.isPremium && (
                    <Badge variant="outline" className="border-amber-500 text-amber-500 flex items-center gap-1">
                      <Lock className="h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                </div>
                <CardTitle className="line-clamp-2">{exam.title}</CardTitle>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {exam.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{exam.duration} mins</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Questions</span>
                    <span className="font-medium">{exam.totalQuestions}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Max Marks</span>
                    <span className="font-medium">{exam.maxMarks}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-muted-foreground">Negative Marking</span>
                    <span className="font-medium">{exam.negativeMarking} marks</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  asChild 
                  className={`w-full ${exam.isPremium ? 'bg-secondary hover:bg-secondary/80' : 'bg-brand-500 hover:bg-brand-600'}`}
                  disabled={exam.isPremium}
                >
                  <Link to={exam.isPremium ? "#" : `/test/${exam.id}/instructions`}>
                    {exam.isPremium ? "Upgrade to Access" : "Take Test"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="mx-auto w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-brand-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No exams found</h3>
            <p className="text-muted-foreground mb-4">
              We couldn't find any exams matching your search criteria.
            </p>
            <Button variant="outline" onClick={() => { setSearchTerm(""); setSelectedType("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamsList;
