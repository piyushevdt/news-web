import { Inter } from 'next/font/google';
import './globals.css';
// import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../theme/theme';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'News & Video Portal',
  description: 'A website displaying news and videos from various sources',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <AppRouterCacheProvider> */}
          <ThemeProvider theme={theme}>
            {children}
          </ThemeProvider>
        {/* </AppRouterCacheProvider> */}
      </body>
    </html>
  );
}