import React from 'react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Github, ChromeIcon, Loader2, type LucideProps } from 'lucide-react';
// Using ChromeIcon as a stand-in for Google as lucide-react doesn't have a direct Google logo.
// A custom SVG or a different icon library might be preferred for production.

// Define more specific provider types if needed, or keep as string for flexibility
type SocialProvider = 'google' | 'github' | string;

interface SocialLoginButtonProps extends Omit<ButtonProps, 'onClick'> {
  provider: SocialProvider;
  onClick: (provider: SocialProvider) => void; // onClick now receives the provider
  isLoading?: boolean;
  fullWidth?: boolean;
  // children can be used to override the default text
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({
  provider,
  onClick,
  isLoading = false,
  fullWidth = true,
  className,
  children,
  ...props
}) => {
  console.log("Rendering SocialLoginButton for provider:", provider, "isLoading:", isLoading);

  let IconComponent: React.FC<Omit<LucideProps, 'ref'>> | null = null;
  let defaultText = `Sign in with ${provider.charAt(0).toUpperCase() + provider.slice(1)}`;

  switch (provider.toLowerCase()) {
    case 'google':
      IconComponent = ChromeIcon; // Stand-in for Google Icon
      defaultText = 'Sign in with Google';
      break;
    case 'github':
      IconComponent = Github;
      defaultText = 'Sign in with GitHub';
      break;
    // Add more cases for other providers (e.g., 'facebook', 'twitter')
    default:
      // For unlisted providers, text remains as derived, no specific icon by default.
      break;
  }

  const buttonContent = children || defaultText;

  const handleClick = () => {
    if (!isLoading && onClick) {
      onClick(provider);
    }
  };

  return (
    <Button
      variant="outline"
      className={`flex items-center justify-center gap-2 ${fullWidth ? 'w-full' : ''} ${className || ''}`}
      onClick={handleClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        IconComponent && <IconComponent className="mr-2 h-4 w-4" />
      )}
      {isLoading ? 'Processing...' : buttonContent}
    </Button>
  );
};

export default SocialLoginButton;