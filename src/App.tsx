import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Assuming a generic Homepage exists or a placeholder for logged-in state
// For this example, let's create a simple placeholder Homepage if one isn't defined
// If you have a real Homepage component, import that instead.
const PlaceholderHomepage = () => {
  console.log("Placeholder Homepage loaded");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome!</h1>
      <p className="text-lg text-gray-700 mb-8">You are successfully logged in (simulated).</p>
      <Link to="/login">
         <Button variant="outline">Go to Login Page (Simulated Logout)</Button>
      </Link>
    </div>
  );
};
// Import new pages
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import RegistrationPage from "./pages/RegistrationPage";
import NotFound from "./pages/NotFound"; // Always Must Include
import { Button } from './components/ui/button'; // Import Button if used in PlaceholderHomepage

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Default route, could be a landing page or redirect to login */}
          <Route path="/" element={<PlaceholderHomepage />} /> 
          
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> 
          {/* Example route for reset password with token */}
          <Route path="/reset-password/" element={<ResetPasswordPage />} /> 
          {/* Fallback if token is not in URL but component handles it */}


          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;