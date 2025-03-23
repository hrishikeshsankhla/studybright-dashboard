
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { mockExams, mockResults } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Mock performance data
const performanceData = [
  { name: "SSC", score: 72 },
  { name: "Banking", score: 68 },
  { name: "Railways", score: 56 },
  { name: "UPSC", score: 64 },
];

const COLORS = ["#30A8D0", "#4ECDC4", "#FF6B6B", "#FFD166", "#56AB91"];

const Dashboard = () => {
  // Get recent results and upcoming exams
  const recentResults = mockResults.slice(0, 3);
  const recommendedExams = mockExams.filter(exam => !exam.isPremium).slice(0, 3);

  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Tests Taken</CardTitle>
            <CardDescription>Your test history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">{recentResults.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Average Score</CardTitle>
            <CardDescription>Across all tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">
              {Math.round(recentResults.reduce((acc, result) => acc + (result.score / result.maxScore) * 100, 0) / recentResults.length)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tests This Week</CardTitle>
            <CardDescription>Your recent activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">2</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle>Performance By Category</CardTitle>
            <CardDescription>Your scores across different exam types</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Score']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="score" fill="#30A8D0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Results</CardTitle>
            <CardDescription>Your last few test performances</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentResults.map((result, index) => {
                const exam = mockExams.find(e => e.id === result.examId);
                const percentage = Math.round((result.score / result.maxScore) * 100);
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{exam?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">{percentage}%</div>
                      <div className="text-sm text-muted-foreground">
                        {result.score}/{result.maxScore}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/analytics">View All Results</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recommended Exams</CardTitle>
            <CardDescription>Based on your performance and interests</CardDescription>
          </div>
          <Button asChild variant="outline">
            <Link to="/exams">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendedExams.map((exam, index) => (
              <Card key={index} className="overflow-hidden card-hover border-none shadow-sm">
                <CardHeader className="pb-2">
                  <div className="inline-flex h-6 items-center rounded-full px-3 text-xs font-medium bg-brand-100 text-brand-700 mb-1">
                    {exam.examType}
                  </div>
                  <CardTitle className="text-lg">{exam.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col text-sm gap-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration</span>
                      <span>{exam.duration} mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Questions</span>
                      <span>{exam.totalQuestions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Marks</span>
                      <span>{exam.maxMarks}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
                    <Link to={`/test/${exam.id}/instructions`}>Take Test</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
