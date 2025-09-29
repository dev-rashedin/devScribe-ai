import { Outlet } from 'react-router';
import { useCustomLocation } from '../hooks';
import {Navbar, Footer} from '../component';
import { Blob } from '../component/ui';


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
