
import './globals.css';
import Navbar from '@/app/components/Navbar';


export const metadata = {
  title: 'Airbnb Clone',
  description: 'Frontend clone using Booking.com API',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="pt-20 px-6">{children}</main>
      </body>
    </html>
  );
}
