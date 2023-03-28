import { Container } from '@mui/material';
import { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container maxWidth="lg" component="main" sx={{ minHeight: 'calc(100vh - 135px - 64px)' }}>
        {children}
      </Container>
      <Footer />
    </>
  );
}

export default Layout;