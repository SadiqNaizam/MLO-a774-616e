import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AuthFormLayout from '@/components/layout/AuthFormLayout';
import SocialLoginButton from '@/components/SocialLoginButton';
import { Eye, EyeOff, Loader2, UserPlus, Terminal } from 'lucide-react';

const registrationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  console.log('RegistrationPage loaded');

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegistrationFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    console.log("Registration form submitted:", values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, you'd call an API to register the user
    // For demo, assume success
    console.log("Registration successful for:", values.email);
    // You might want to automatically log the user in or redirect to a "verify email" page
    navigate("/login?registered=true"); // Redirect to login page with a success indicator
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setAuthError(null);
    console.log(`Attempting registration with ${provider}`);
    // Simulate social login API call
    setTimeout(() => {
      console.log(`${provider} registration flow initiated.`);
      // For demo:
      // setAuthError(`Failed to register with ${provider}. Please try again.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AuthFormLayout
      title="Create Your Account"
      description="Join our community! It only takes a few moments to get started."
      appName="Ascendion Suite"
      appLogoUrl="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {authError && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Registration Failed</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} autoFocus />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                     <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                 <div className="relative">
                    <Input type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" {...field} />
                     <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UserPlus className="mr-2 h-4 w-4" />}
            Create Account
          </Button>
        </form>
      </Form>

       <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or sign up with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <SocialLoginButton provider="google" onClick={handleSocialLogin} isLoading={isLoading} />
          <SocialLoginButton provider="github" onClick={handleSocialLogin} isLoading={isLoading} />
        </div>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{' '}
        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Log in
        </Link>
      </p>
    </AuthFormLayout>
  );
};

export default RegistrationPage;