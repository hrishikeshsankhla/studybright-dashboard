
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { mockExams, mockResults } from "@/data/mockData";
import { CalendarDays, TrendingUp, BarChart2, PieChart as PieChartIcon } from "lucide-react";

const COLORS = ["#30A8D0", "#4ECDC4", "#FF6B6B", "#FFD166", "#56AB91", "#F9C80E"];

// Sample data for charts
const performanceTrend = [
  { date: "Jan", score: 65 },
  { date: "Feb", score: 59 },
  { date: "Mar", score: 80 },
  { date: "Apr", score: 81 },
  { date: "May", score: 76 },
  { date: "Jun", score: 85 },
];

const examTypeData = [
  { name: "SSC", count: 12, avgScore: 72 },
  { name: "Banking", count: 8, avgScore: 68 },
  { name: "Railways", count: 5, avgScore: 75 },
  { name: "UPSC", count: 3, avgScore: 62 },
  { name: "State PSC", count: 4, avgScore: 70 },
];

const subjectData = [
  { name: "General Intelligence", score: 75 },
  { name: "General Knowledge", score: 65 },
  { name: "Quantitative Aptitude", score: 80 },
  { name: "English", score: 70 },
  { name: "Reasoning", score: 85 },
];

const timeData = [
  { name: "Weekdays", avgTime: 45 },
  { name: "Weekends", avgTime: 65 },
  { name: "Morning", avgTime: 55 },
  { name: "Afternoon", avgTime: 40 },
  { name: "Evening", avgTime: 60 },
];

const Analytics = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Analytics</h1>
      <p className="text-muted-foreground mb-6">
        Track your performance and identify areas for improvement
      </p>

      <Tabs defaultValue="overview" className="mb-8">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="exams" className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>Test History</span>
          </TabsTrigger>
          <TabsTrigger value="subjects" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>Subject Analysis</span>
          </TabsTrigger>
          <TabsTrigger value="time" className="flex items-center gap-2">
            <PieChartIcon className="h-4 w-4" />
            <span>Time Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tests Taken</CardTitle>
                <CardDescription>Total exams completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-brand-500">32</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Score</CardTitle>
                <CardDescription>Across all tests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-brand-500">72%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Highest Score</CardTitle>
                <CardDescription>Your best performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-brand-500">92%</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Practice Time</CardTitle>
                <CardDescription>Total hours spent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-brand-500">48h</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Your scores over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Score']}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Line type="monotone" dataKey="score" stroke="#30A8D0" strokeWidth={2} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Exam Category Distribution</CardTitle>
                <CardDescription>Tests taken by category</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={examTypeData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      dataKey="count"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {examTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="exams">
          <Card>
            <CardHeader>
              <CardTitle>Test History</CardTitle>
              <CardDescription>Your performance across different exams</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockExams.map((exam, index) => ({
                      name: exam.title.split(" ").slice(0, 2).join(" "),
                      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
                    }))}
                    margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Score (%)" dataKey="score" fill="#30A8D0" radius={[5, 5, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>Your strengths and weaknesses</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius={80} data={subjectData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar name="Score" dataKey="score" stroke="#30A8D0" fill="#30A8D0" fillOpacity={0.6} />
                    <Tooltip />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Improvement Areas</CardTitle>
                <CardDescription>Focus on these to improve your overall score</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    layout="vertical"
                    data={subjectData.sort((a, b) => a.score - b.score)}
                    margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" />
                    <Tooltip />
                    <Bar dataKey="score" fill="#30A8D0" radius={[0, 5, 5, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="time">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Duration Analysis</CardTitle>
                <CardDescription>Average time spent on tests</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Bar name="Average Time (minutes)" dataKey="avgTime" fill="#30A8D0" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Question Time Distribution</CardTitle>
                <CardDescription>How you allocate time during tests</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Easy Questions", value: 25 },
                        { name: "Medium Questions", value: 45 },
                        { name: "Hard Questions", value: 30 },
                      ]}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {COLORS.map((color, index) => (
                        <Cell key={`cell-${index}`} fill={color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Personalized Recommendations</CardTitle>
          <CardDescription>Based on your performance analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-brand-50 rounded-lg">
              <h3 className="font-medium mb-2 text-brand-700">Focus on Quantitative Aptitude</h3>
              <p className="text-muted-foreground">
                You're performing well in this area. Continue practicing to maintain your advantage.
              </p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <h3 className="font-medium mb-2 text-red-700">Improve General Knowledge</h3>
              <p className="text-muted-foreground">
                This is your weakest section. We recommend taking more focused tests in this area.
              </p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <h3 className="font-medium mb-2 text-amber-700">Time Management</h3>
              <p className="text-muted-foreground">
                You're spending too much time on hard questions. Try to allocate your time more efficiently.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium mb-2 text-green-700">SSC Exams Strength</h3>
              <p className="text-muted-foreground">
                You're performing exceptionally well in SSC-type exams. Consider focusing on these for better results.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
