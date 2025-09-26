import { ReactNode, useEffect, useState, useMemo } from 'react';
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updatePassword,
  updateProfile,
  User,
} from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { getASecureRandomPassword } from '../utils';
import { axiosApi } from '../api';
import { AuthContext } from '../utils';

interface AuthProviderProps {
  children: ReactNode;
}

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // --- AUTH FUNCTIONS ---

  const createUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const logInUser = async (email: string, password: string) => {
    setLoading(true);
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, googleProvider);
    } finally {
      setLoading(false);
    }
  };

  const githubLogin = async () => {
    setLoading(true);
    try {
      return await signInWithPopup(auth, githubProvider);
    } finally {
      setLoading(false);
    }
  };

  const logOutUser = async () => {
    setLoading(true);
    try {
      return await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (name: string, photo: string) => {
    if (!auth.currentUser) throw new Error('No current user');
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  const updateUserPass = async (user: User, currentPassword: string) => {
    const newPassword = getASecureRandomPassword();
    setLoading(true);
    try {
      const credential = EmailAuthProvider.credential(
        user.email!,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
    } catch (error) {
      console.error('Error updating password:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetUserPass = async (email: string) => {
    setLoading(true);
    try {
      return await sendPasswordResetEmail(auth, email);
    } finally {
      setLoading(false);
    }
  };

  // --- AUTH OBSERVER ---

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      try {
        if (currentUser) {
          const res = await axiosApi.post('/jwt', { email: currentUser.email });
          if (res.data?.token) {
            localStorage.setItem('access-token', res.data.token);
          }
        } else {
          localStorage.removeItem('access-token');
        }
      } catch (error) {
        console.error('JWT fetch error:', error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // --- MEMOIZED CONTEXT ---
  const authInfo = useMemo(
    () => ({
      user,
      loading,
      setLoading,
      createUser,
      updateUserProfile,
      logInUser,
      logOutUser,
      googleLogin,
      githubLogin,
      updateUserPass,
      resetUserPass,
    }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
