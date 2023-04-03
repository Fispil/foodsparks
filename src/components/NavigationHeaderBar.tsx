import { Toolbar, Container, Box, Tooltip, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";

const NavigationHeaderBar = () => {
  return (
    <Toolbar sx={{ maxWidth: '100%', backgroundColor: 'grey' }}>
        <Container maxWidth={false} sx={{ display: 'flex', justifyContent: 'space-between', flexShrink: 1 }} >
          <Box>
            <img src="src/pictures/Logo.svg" alt='Logo' style={{ height: '50px'}} />
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            flexShrink: 2,
            justifyContent: 'space-between',
            gap: '32px'
          }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexShrink: 2,
                justifyContent: 'space-between',
                gap: '32px'
              }}
            >
              <Tooltip title={ <Typography><Link style={{ textDecoration: 'none', color: 'black' }} to="tel:555-1234-5678">555-1234-5678</Link></Typography>}>
                <Button sx={{ m: 1, color: 'black' }}>Contancts</Button>
              </Tooltip>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontSize: '20px'
                }}
              >
                Home
              </Link>
              <Link
                to="/about"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontSize: '20px'
                }}
              >
                About
              </Link>
              <Link
                to="/products"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                  fontSize: '20px'
                }}
              >
                Products
              </Link>
            </Box>
            <Box
              mr={3}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 2
              }}
            >
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(176,224,230)',
                    color: 'black'
                  }}
                >
                  <SignInDialog />
                </Box>

                <Box
                  sx={{
                    border: `1px solid ${theme.palette.primary.dark}`,
                    borderRadius: '5px',
                    backgroundColor: 'rgb(220,20,60)',
                    color: 'black'
                  }}
                >
                  <SignUpDialog />
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Toolbar>
  )
}

export default NavigationHeaderBar;