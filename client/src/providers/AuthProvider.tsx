import { createContext, ReactNode, useEffect, useState } from 'react';
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
  User
} from 'firebase/auth';
import auth from '../firebase/firebase.config';
import { getASecureRandomPassword } from '../api/utils';
import { axiosApi } from '../api/axiosApi';


// ----------- Types -----------
export interface AuthContextType {
  user: User | null
  loading: boolean
  setLoading: (loading: boolean) => void
  createUser: (email: string, password: string) => Promise<any>
  updateUserProfile: (name: string, photo: string) => Promise<void>
  logInUser: (email: string, password: string) => Promise<any>
  logOutUser: () => Promise<void>
  googleLogin: () => Promise<any>
  githubLogin: () => Promise<any>
  updateUserPass: (user: User, currentPassword: string) => Promise<void>
  resetUserPass: (email: string) => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}




export const AuthContext = createContext<AuthContextType | null>(null);

// auth Provider
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider

const AuthProvider = ({ children } : AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // create user
  const createUser = (email : string, password : string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // update user
  const updateUserProfile = (name: string, photo: string) => {
    if (!auth.currentUser) throw new Error('No current user');
    return updateProfile(auth.currentUser!, {
      displayName: name,
      photoURL: photo,
    });
  };

  // login user
  const logInUser = (email: string, password : string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // google login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // github login
  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  // update password
 const updateUserPass = async (user : User, currentPassword : string) => {
   const newPassword = getASecureRandomPassword(); // Generate a secure random password
   setLoading(true);

   try {
     // Create the credential using email and current password
     const credential = EmailAuthProvider.credential(
       user.email!,
       currentPassword
     );

     // Step 1: Re-authenticate the user with the credential (their email and current password)
     await reauthenticateWithCredential(user, credential);

     // Step 2: After re-authentication, update the password
     await updatePassword(user, newPassword);
   } catch (error) {
     console.error('Error updating password:', error);   
   } finally {
     setLoading(false);
   }
 };

  // reset pass with email
  const resetUserPass = (email : string) => {
    setLoading(true)
    return sendPasswordResetEmail(auth, email);
  }

  // sign out
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };



  // set a observer
  useEffect( () => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser)

      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosApi.post('/jwt', userInfo)
          .then((res) => {
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          }
        });
      } else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    }
    
    );

    return () => unSubscribe();
  }, []);



  const authInfo = {
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
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
