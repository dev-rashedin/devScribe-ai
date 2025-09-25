import Benefits from '../component/Benefits';
import ClientFeedback from '../component/ClientFeedback';
import Hero from '../component/Hero';
import Services from '../component/Services';
import FAQ from '../component/FAQ';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  return (
    <div className='space-y-28 lg:space-y-40'>
      <Helmet>
        <title>DevScribe-AI || Home</title>
      </Helmet>
      <Hero />
      <Services />
      <Benefits />
      <ClientFeedback />
      <FAQ/>
    </div>
  );
};

export default Home;
