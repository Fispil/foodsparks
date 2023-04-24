import { Toolbar, Container, Box, Typography, } from "@mui/material";
import { Link } from "react-router-dom";

const NavigationHeaderBar = () => {
  return (
    <>
      <Toolbar sx={{ maxWidth: '100%', backgroundColor: '#fff', position: 'relative', display: 'flex' }}>
        <Container maxWidth="xl" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 64px' }}>
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
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    '&:hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  Рецепти
                </Typography>
              </Link>
              <Link
                to="/"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    '&:hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  Магазин
                </Typography>
              </Link>
              <Link
                to="/delivery"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    '&:hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  Доставка
                </Typography>
              </Link>
              <Link
                to="/about"
                style={{
                  textDecoration: 'none',
                  color: 'black',
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    '&:hover': {
                      color: '#CB3C2E',
                    },
                  }}
                >
                  Контакти
                </Typography>
              </Link>
            </Box>
          </Box>
        </Container>
      </Toolbar></>
  )
}

export default NavigationHeaderBar;