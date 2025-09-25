import { createContext } from 'react';
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

