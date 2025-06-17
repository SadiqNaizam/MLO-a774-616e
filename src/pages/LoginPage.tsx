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
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import AuthFormLayout from '@/components/layout/AuthFormLayout';
import SocialLoginButton from '@/components/SocialLoginButton';
import { Eye, EyeOff, Loader2, Terminal } from 'lucide-react';

const loginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  console.log('LoginPage loaded');

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setAuthError(null);
    console.log("Login form submitted:", values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (values.email === "user@example.com" && values.password === "password") {
      console.log("Login successful");
      // In a real app, you'd set auth tokens and redirect
      navigate("/"); // Redirect to homepage or dashboard
    } else {
      setAuthError("Invalid email or password. Please try again.");
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    setIsLoading(true);
    setAuthError(null);
    console.log(`Attempting login with ${provider}`);
    // Simulate social login API call
    setTimeout(() => {
      console.log(`${provider} login flow initiated.`);
      // Typically, this would redirect to an OAuth provider
      // On success, navigate or handle response
      // For demo, simulate error:
      // setAuthError(`Failed to login with ${provider}. Please try again.`);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <AuthFormLayout
      title="Welcome Back!"
      description="Log in to access your account and continue your journey."
      appName="Ascendion Suite"
      appLogoUrl="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {authError && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Login Failed</AlertTitle>
              <AlertDescription>{authError}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} autoFocus />
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
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </Link>
                </div>
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
                      <span className="sr-only">{showPassword ? 'Hide password' : 'Show password'}</span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Remember me</FormLabel>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Log In
          </Button>
        </form>
      </Form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500 dark:bg-gray-800 dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <SocialLoginButton provider="google" onClick={handleSocialLogin} isLoading={isLoading} />
          <SocialLoginButton provider="github" onClick={handleSocialLogin} isLoading={isLoading} />
        </div>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Not a member?{' '}
        <Link to="/registration" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Create an account
        </Link>
      </p>
    </AuthFormLayout>
  );
};

export default LoginPage;