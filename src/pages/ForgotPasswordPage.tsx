import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { Loader2, MailCheck, Terminal } from 'lucide-react';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  console.log('ForgotPasswordPage loaded');

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setMessage(null);
    console.log("Forgot password form submitted:", values);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    // In a real app, you'd call an API to send a reset link
    // For demo, always show success message
    setMessage({ type: 'success', text: "If an account with that email exists, a password reset link has been sent."});
    form.reset(); // Clear the form
    setIsLoading(false);
  };

  return (
    <AuthFormLayout
      title="Forgot Your Password?"
      description="No worries! Enter your email address below and we'll send you a link to reset your password."
      appName="Ascendion Suite"
      appLogoUrl="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {message && (
            <Alert variant={message.type === 'success' ? 'default' : 'destructive'}>
              {message.type === 'success' ? <MailCheck className="h-4 w-4" /> : <Terminal className="h-4 w-4" />}
              <AlertTitle>{message.type === 'success' ? 'Check Your Email' : 'Error'}</AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
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
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Send Reset Link
          </Button>
        </form>
      </Form>
      <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        Remember your password?{' '}
        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Log in here
        </Link>
      </p>
    </AuthFormLayout>
  );
};

export default ForgotPasswordPage;