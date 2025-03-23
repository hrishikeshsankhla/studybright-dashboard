
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, UserPlus, Edit, Trash2, MoreHorizontal, Shield, User, Mail, Lock } from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { toast } from "sonner";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  
  // Mock user data for demonstration
  const users = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "user", status: "active", lastLogin: "2023-08-15T14:30:00Z" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "admin", status: "active", lastLogin: "2023-08-20T09:15:00Z" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "user", status: "inactive", lastLogin: "2023-07-05T11:45:00Z" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "user", status: "active", lastLogin: "2023-08-18T16:20:00Z" },
    { id: "5", name: "Charlie Davis", email: "charlie@example.com", role: "moderator", status: "active", lastLogin: "2023-08-19T13:10:00Z" },
  ];
  
  // Filter users based on search term
  const filteredUsers = users.filter((user) => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteUser = () => {
    toast.success("User deleted successfully");
    setShowDeleteDialog(false);
    setUserToDelete(null);
  };
  
  const confirmDelete = (userId: string) => {
    setUserToDelete(userId);
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
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">Manage user accounts and permissions</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10 w-full sm:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-brand-500 hover:bg-brand-600 flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Add User</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                  </div>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                  </div>
                  <Input id="email" type="email" placeholder="Enter email address" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    <label htmlFor="password" className="text-sm font-medium">
                      Password
                    </label>
                  </div>
                  <Input id="password" type="password" placeholder="Create password" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <label htmlFor="role" className="text-sm font-medium">
                      Role
                    </label>
                  </div>
                  <Tabs defaultValue="user" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="user">User</TabsTrigger>
                      <TabsTrigger value="moderator">Moderator</TabsTrigger>
                      <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" className="bg-brand-500 hover:bg-brand-600">
                  Create User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Email</th>
                  <th className="text-left py-3 px-4 font-medium hidden md:table-cell">Role</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Status</th>
                  <th className="text-left py-3 px-4 font-medium hidden lg:table-cell">Last Login</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-brand-700">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-muted-foreground md:hidden">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">{user.email}</td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <Badge variant={user.role === 'admin' ? 'default' : user.role === 'moderator' ? 'outline' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        <div className={`inline-flex items-center gap-1.5 ${
                          user.status === 'active' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          <span className={`h-2 w-2 rounded-full ${
                            user.status === 'active' ? 'bg-green-600' : 'bg-red-600'
                          }`}></span>
                          <span className="capitalize">{user.status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        {new Date(user.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toast.success("Password reset link sent")}>
                              <Lock className="h-4 w-4 mr-2" />
                              <span>Reset Password</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => confirmDelete(user.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              <span>Delete</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-muted-foreground">
                      No users found
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
              Are you sure you want to delete this user? All associated data will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteUser}
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
