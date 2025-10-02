import { createContext, useState } from 'react';
import { UserCredential } from 'firebase/auth';
import axios from 'axios';
import { z } from 'zod';

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

export const AuthContext = createContext<AuthContextType | null>(null);

export function getASecureRandomPassword(): string {
  // Example of a secure password generator
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  const passwordLength = 12;
  let password = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .regex(
      /(?=.*[0-9])/,
      'Password must contain at least one numeric character'
    )
    .regex(
      /(?=.*[!@#$%^&*(),.?":{}|<>])/,
      'Password must contain at least one special character'
    ),
});

export const getUserInfo = (
  res: UserCredential,
  image_url: string,
  username: string
) => {
  const user = res.user;

  const userInfo = {
    uid: user.uid,
    email: user.email || '',
    displayName: user.displayName || username || 'New User',
    photoURL:
      user.photoURL || image_url || 'https://www.gravatar.com/avatar/?d=mp',
  };

  return userInfo;
};

export const imageUpload = async (image: File): Promise<string> => {
  const formData = new FormData();

  formData.append('image', image);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );

  // console.log('data inside imageUpload',data.data);

  return data.data.display_url;
};

export const useImageFile = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) return;
    setImageFile(files[0]);
  };

  return { imageFile, handleImageChange, setImageFile };
};

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


export const sidebarClasses = (isOpen: boolean, type = 'div') => {
  if (type === 'div') {
    return isOpen ? 'justify-start' : 'justify-center';
  }

  if (type === 'span') {
    return isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0';
  }
};

export const generateServiceDesc = (serviceName: string) => {
  switch (serviceName) {
    case 'article-generator':
      return 'Generate your article in seconds with AI-powered clarity and creativity';
    case 'code-explainer':
      return 'Explain your code in seconds with detailed insights and step-by-step clarity';
    case 'doc-summarizer':
      return 'Summarize your document in seconds with precise, structured, and easy-to-read output';
    case 'code-refactor':
      return 'Refactor your code in seconds for cleaner, optimized, and maintainable solutions';
    case 'email-helper':
      return 'Draft your email in seconds with polished, professional, and personalized suggestions';
    case 'resume-assistant':
      return 'Improve your resume in seconds with targeted, impactful, and career-focused enhancements';
    default:
      return 'Generate your article in seconds with AI-powered clarity and creativity';
  }
};

export const submitFormOnEnter = (
  e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    const form = e.currentTarget.form;
    if (form) form.requestSubmit();
  }
};

