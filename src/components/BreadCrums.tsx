import { Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.length > 0 ? (
        <Link color="inherit" href="/">
          Головна
        </Link>
      ) : (
        <Typography>Головна</Typography>
      )}
      {pathnames.map((name, index) => {
        let routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        routeTo === '/products' ?  name = 'Всі рецепти' : routeTo
        console.log(routeTo);

        return index === pathnames.length - 1 ? (
          <Typography key={routeTo}>{name}</Typography>
        ) : (
          <Link key={routeTo} color="inherit" href={routeTo}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default Breadcrumb;