import { Outlet } from 'react-router';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Blob from '../component/ui/Blob';
import { useCustomLocation } from '../hooks';

const RootLayout = () => {
 
  const { noHeaderFooter, subScriptionPage } = useCustomLocation();

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
export default RootLayout;
