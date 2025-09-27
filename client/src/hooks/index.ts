import { useContext } from 'react';
import { AuthContext, ThemeContext } from '../utils';
import { useLocation } from 'react-router';

const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const useAuth = (): AuthContextType => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return auth;
};


const useServiceLocation = () => {
  const location = useLocation();

  const isService = location.pathname.includes('service');

  return isService
}


export {
  useTheme,
  useAuth,
  useServiceLocation
}
