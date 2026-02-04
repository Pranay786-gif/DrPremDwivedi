import type { Metadata } from 'next';
import { MuiThemeProvider } from '@/components/MuiThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Box } from '@mui/material';
import './globals.css';

export const metadata: Metadata = {
  title: 'Author Portfolio - Blog & Books',
  description: 'Explore my blog articles and published books',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MuiThemeProvider>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <Box component="main" sx={{ flex: 1 }}>
              {children}
            </Box>
            <Footer />
          </Box>
        </MuiThemeProvider>
      </body>
    </html>
  );
}
