import { Outlet, useLocation } from 'react-router';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Blob from './component/ui/Blob';

const App = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes('signin') ||
    location.pathname.includes('signup');
  
  const subScriptionPage = location.pathname.includes('subscription');

  return (
    <main className=' relative'>
      <Blob />
      {noHeaderFooter || <Navbar />}
      <section className=' min-h-[calc(100vh-320px)] lg:min-h-[calc(100vh-276px)]'>
        <Outlet />
      </section>

      {(noHeaderFooter || subScriptionPage) || <Footer />}
    </main>
  );
};
export default App;
