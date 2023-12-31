import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Sentient SaaS Platform',
  description: 'Homepage'
};

export default function RootLayout({ children }) {
  return (
    <div className='h-screen flex flex-col'>
      <Navbar />
      <main className='flex-1'>{children}</main>
      <Footer />
    </div>
  );
}
