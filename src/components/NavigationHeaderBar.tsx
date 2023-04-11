import { Toolbar, Container, Box, Tooltip, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";

const NavigationHeaderBar = () => {
  return (
    <><Toolbar sx={{ maxWidth: '100%', backgroundColor: '#fff', position: 'relative', display: 'flex'}}>
      <Container maxWidth="xl" sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 64px'}}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          flexShrink: 2,
          justifyContent: 'space-between',
        }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 2,
              justifyContent: 'space-between',
              gap: '88px',
              padding: '24px 0'
            }}
          >
            <Link
              to="/products"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px',
                fontFamily: 'Open-Sans',
                fontStyle: 'regular',
                lineHeight: '16px'
              }}
            >
              Рецепти
            </Link>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px',
                fontFamily: 'Open-Sans',
                fontStyle: 'regular',
                lineHeight: '16px'
              }}
            >
              Магазин
            </Link>
            <Link
              to="/products"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px',
                fontFamily: 'Open-Sans',
                fontStyle: 'regular',
                lineHeight: '16px'
              }}
            >
              Доставка
            </Link>
            <Link
              to="/about"
              style={{
                textDecoration: 'none',
                color: 'black',
                fontSize: '24px',
                fontFamily: 'Open-Sans',
                fontStyle: 'regular',
                lineHeight: '16px',
              }}
            >
              Контакти
            </Link>
          </Box>
          <Box
            mr={3}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '24px',
              flexShrink: 2,
              marginLeft: '24px'
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
    </Toolbar></>
  )
}

export default NavigationHeaderBar;