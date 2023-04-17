import { Toolbar, Container, Box,} from "@mui/material";
import { Link } from "react-router-dom";
import { theme } from "../theme";
import SignInDialog from "./SignInDialog";
import SignUpDialog from "./SignUpDialog";

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
                to="/delivery"
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
          </Box>
        </Container>
      </Toolbar></>
  )
}

export default NavigationHeaderBar;