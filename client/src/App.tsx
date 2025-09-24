import { Outlet, useLocation } from 'react-router';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Blob from './component/ui/Blob';

const App = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes('login') ||
    location.pathname.includes('register');

  return (
    <main className=' relative'>
      <Blob />
      {noHeaderFooter || <Navbar />}
      <section className=' min-h-[calc(100vh-320px)] lg:min-h-[calc(100vh-276px)]'>
        <Outlet />
      </section>

      {noHeaderFooter || <Footer />}
    </main>
  );
};
export default App;
