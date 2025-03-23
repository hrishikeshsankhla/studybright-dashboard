
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronDown, LogOut, Menu, User, X } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

interface NavbarProps {
  user?: {
    name: string;
    isAdmin: boolean;
  } | null;
  onLogout?: () => void;
}

const Navbar = ({ user, onLogout }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Hide navbar on test page
  if (location.pathname.includes('/test/')) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm transition-all">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="h-8 w-8 rounded bg-brand-500 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L7 12H17L12 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-semibold text-brand-500">TestPrep</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link>
            <Link to="/exams" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Exams</Link>
            <Link to="/analytics" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Analytics</Link>
            {user?.isAdmin && (
              <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Admin</Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-8 px-2">
                    <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-brand-500" />
                    </div>
                    <span className="hidden sm:inline-block text-sm font-medium">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button asChild className="bg-brand-500 hover:bg-brand-600">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden animate-fade-in">
          <nav className="flex flex-col space-y-4">
            <Link to="/dashboard" className="text-sm font-medium py-2 hover:text-brand-500" onClick={closeMenu}>Dashboard</Link>
            <Link to="/exams" className="text-sm font-medium py-2 hover:text-brand-500" onClick={closeMenu}>Exams</Link>
            <Link to="/analytics" className="text-sm font-medium py-2 hover:text-brand-500" onClick={closeMenu}>Analytics</Link>
            {user?.isAdmin && (
              <Link to="/admin" className="text-sm font-medium py-2 hover:text-brand-500" onClick={closeMenu}>Admin</Link>
            )}
            {!user && (
              <>
                <Link to="/login" className="text-sm font-medium py-2 hover:text-brand-500" onClick={closeMenu}>Log in</Link>
                <Link to="/signup" className="text-sm font-medium py-2 hover:text-brand-500" onClick={closeMenu}>Sign up</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
