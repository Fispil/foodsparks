import { Container, Box, Typography } from '@mui/material';
import { theme } from '../theme';

const Footer = () => {
  return (
    <Container
    component="footer"
    style={{
      position: 'sticky',
      height: '135px',
      maxWidth: '100%',
      backgroundColor: theme.palette.primary.dark,
      padding: '10px 0',
      boxSizing: 'border-box'
    }}
  >
    <Box>
      <Typography>Footer Content</Typography>
    </Box>
  </Container>
  )
}

export default Footer;