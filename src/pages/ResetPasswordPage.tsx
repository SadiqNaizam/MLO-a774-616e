import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
import { Eye, EyeOff, Loader2, CheckCircle, Terminal } from 'lucide-react';

const resetPasswordSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"], // Path to field where error message should be shown
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const { token } = useParams<{ token: string }>(); // Example: /reset-password/some-token
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  console.log('ResetPasswordPage loaded with token:', token);

  useEffect(() => {
    // Here you might want to validate the token with a backend API call
    if (!token) {
      setMessage({type: 'error', text: "Invalid or missing reset token. Please request a new password reset."});
      // Optionally redirect or disable form
    }
    console.log("Password reset token from URL:", token);
  }, [token]);

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setIsLoading(true);
    setMessage(null);
    console.log("Reset password form submitted:", values, "Token:", token);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, you'd call an API to reset the password with the token
    // For demo, assume success if token is present
    if (token) {
      setMessage({ type: 'success', text: "Your password has been successfully reset. You can now log in with your new password." });
      form.reset();
      setTimeout(() => navigate('/login'), 3000); // Redirect to login after 3s
    } else {
      setMessage({ type: 'error', text: "Failed to reset password. The reset link may be invalid or expired." });
    }
    setIsLoading(false);
  };

  return (
    <AuthFormLayout
      title="Set New Password"
      description="Create a strong new password for your account. Make sure it's memorable and secure."
      appName="Ascendion Suite"
      appLogoUrl="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {message && (
            <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
              {message.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
              <AlertTitle>{message.type === 'success' ? 'Password Reset' : 'Error'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="••••••••" {...field} autoFocus />
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
                <FormLabel>Confirm New Password</FormLabel>
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
          <Button type="submit" className="w-full" disabled={isLoading || !token}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Reset Password
          </Button>
        </form>
      </Form>
      {message?.type === 'error' && !token && (
         <p className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Need to request a new link?{' '}
            <Link to="/forgot-password" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Go to Forgot Password
            </Link>
         </p>
      )}
    </AuthFormLayout>
  );
};

export default ResetPasswordPage;