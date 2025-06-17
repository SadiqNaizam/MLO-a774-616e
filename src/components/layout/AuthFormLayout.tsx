import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';

interface AuthFormLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string; // Optional description text below the title
  appName?: string; // Optional application name for branding
  appLogoUrl?: string; // Optional URL for an application logo
}

const AuthFormLayout: React.FC<AuthFormLayoutProps> = ({
  children,
  title,
  description,
  appName = "YourApp", // Default app name
  appLogoUrl,
}) => {
  console.log("Rendering AuthFormLayout with title:", title);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 selection:bg-green-500 selection:text-white">
      <header className="mb-6 text-center">
        {appLogoUrl && (
          <img src={appLogoUrl} alt={`${appName} Logo`} className="mx-auto mb-4 h-12 w-auto" />
        )}
        {!appLogoUrl && appName && (
           <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
            {appName}
          </h1>
        )}
      </header>
      
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">{title}</CardTitle>
          {description && (
            <CardDescription className="pt-1">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>

      <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} {appName}. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthFormLayout;