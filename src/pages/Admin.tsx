
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { FileText, Users, Database, Settings } from "lucide-react";

const COLORS = ["#30A8D0", "#4ECDC4", "#FF6B6B", "#FFD166"];

// Mock data for charts
const userActivityData = [
  { name: "Jan", value: 120 },
  { name: "Feb", value: 150 },
  { name: "Mar", value: 180 },
  { name: "Apr", value: 220 },
  { name: "May", value: 280 },
  { name: "Jun", value: 260 },
];

const testTypeData = [
  { name: "SSC", value: 35 },
  { name: "Banking", value: 25 },
  { name: "Railways", value: 20 },
  { name: "UPSC", value: 20 },
];

const Admin = () => {
  return (
    <div className="container py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-6">Manage tests, questions, and view analytics</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
            <CardDescription>Active users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">1,248</div>
            <div className="text-sm text-muted-foreground">
              <span className="text-green-500">↑ 12%</span> from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Tests</CardTitle>
            <CardDescription>Total available tests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">72</div>
            <div className="text-sm text-muted-foreground">
              <span className="text-green-500">↑ 8</span> new this month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Question Bank</CardTitle>
            <CardDescription>Total available questions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">4,582</div>
            <div className="text-sm text-muted-foreground">
              Across all subjects
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tests Taken</CardTitle>
            <CardDescription>Total attempts by users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-brand-500">8,745</div>
            <div className="text-sm text-muted-foreground">
              <span className="text-green-500">↑ 24%</span> from last month
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Monthly test attempts</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={userActivityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend />
                <Bar name="Test Attempts" dataKey="value" fill="#30A8D0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Distribution</CardTitle>
            <CardDescription>By exam category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={testTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {testTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-6">Management Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="overflow-hidden card-hover">
          <CardHeader className="pb-2">
            <FileText className="h-8 w-8 text-brand-500 mb-2" />
            <CardTitle>Test Management</CardTitle>
            <CardDescription>Create and modify test papers</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Create new test papers</li>
              <li>Set test parameters</li>
              <li>Organize by categories</li>
              <li>Schedule future tests</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
              <Link to="/admin/exams">Manage Tests</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden card-hover">
          <CardHeader className="pb-2">
            <Database className="h-8 w-8 text-brand-500 mb-2" />
            <CardTitle>Question Bank</CardTitle>
            <CardDescription>Add and edit questions</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Add new questions</li>
              <li>Organize by topics</li>
              <li>Set difficulty levels</li>
              <li>Add detailed solutions</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
              <Link to="/admin/questions">Manage Questions</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="overflow-hidden card-hover">
          <CardHeader className="pb-2">
            <Users className="h-8 w-8 text-brand-500 mb-2" />
            <CardTitle>User Management</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>View user profiles</li>
              <li>Manage permissions</li>
              <li>Track user activity</li>
              <li>Handle user support</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-brand-500 hover:bg-brand-600">
              <Link to="/admin/users">Manage Users</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
