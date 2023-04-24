import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';
import CustomSnackBar from './CustomSnackBar';

interface LayoutProps {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ minHeight: 'calc(100vh - 135px - 64px)', boxSizing: 'border-box' }}>
        {children}
      </Box>
      <CustomSnackBar />
      <Footer />
    </>
  );
}

export default Layout;