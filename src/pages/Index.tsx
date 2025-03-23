
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-brand-50">
      <section className="container pt-20 md:pt-32 pb-16 md:pb-24 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex h-6 items-center rounded-full px-3 text-sm font-medium bg-brand-100 text-brand-700">
                Ace your government exams
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Your path to <span className="text-brand-500">success</span> starts here
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                Practice with our carefully designed mock tests and increase your chances of success in competitive government exams.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="h-12 px-6 bg-brand-500 hover:bg-brand-600">
                <Link to="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="outline" className="h-12 px-6">
                <Link to="/exams">Explore Tests</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="absolute -z-10 inset-0 -m-4 bg-gradient-to-r from-brand-100 to-brand-50 rounded-full blur-3xl opacity-30"></div>
            <div className="relative bg-white rounded-xl p-6 shadow-xl border border-gray-100 card-hover">
              <div className="absolute -top-3 -right-3 h-10 w-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-semibold">
                #1
              </div>
              <div className="space-y-4">
                <div className="h-8 w-32 rounded-full bg-brand-100 flex items-center px-4">
                  <span className="text-xs font-medium text-brand-700">SSC Exam</span>
                </div>
                <h3 className="text-xl font-semibold">SSC CGL Tier I Mock Test</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>60 mins</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>100 questions</span>
                  </div>
                </div>
                <div className="pt-2">
                  <Button className="w-full bg-brand-500 hover:bg-brand-600">Take Test</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-24">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Why Choose TestPrep?</h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Our platform is designed to give you the best preparation experience
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Exam-like Interface",
              description: "Experience the real test environment with our exam simulator",
              icon: (
                <svg className="h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              ),
            },
            {
              title: "Detailed Solutions",
              description: "Learn from comprehensive explanations for every question",
              icon: (
                <svg className="h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              ),
            },
            {
              title: "Performance Analytics",
              description: "Track your progress with in-depth performance insights",
              icon: (
                <svg className="h-8 w-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              ),
            },
          ].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm card-hover">
              <div className="h-12 w-12 rounded-lg bg-brand-50 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to start your preparation?</h2>
            <p className="text-muted-foreground max-w-[600px]">
              Join thousands of successful candidates who prepared with our platform
            </p>
            <Button asChild className="h-12 px-6 bg-brand-500 hover:bg-brand-600 mt-4">
              <Link to="/signup">Get Started Today</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t">
        <div className="container py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-brand-500 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 6L7 12H17L12 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold text-brand-500">TestPrep</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your success is our priority. We provide the best tools to help you prepare for government exams.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/dashboard" className="hover:text-brand-500">Dashboard</Link></li>
                <li><Link to="/exams" className="hover:text-brand-500">Exams</Link></li>
                <li><Link to="/analytics" className="hover:text-brand-500">Analytics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Exams</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-brand-500">SSC Exams</Link></li>
                <li><Link to="#" className="hover:text-brand-500">Banking Exams</Link></li>
                <li><Link to="#" className="hover:text-brand-500">Railway Exams</Link></li>
                <li><Link to="#" className="hover:text-brand-500">UPSC Exams</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>support@testprep.example.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} TestPrep. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
