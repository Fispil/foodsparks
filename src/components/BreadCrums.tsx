import { Breadcrumbs, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

interface Props {
  nameRecipe?: string;
}

const Breadcrumb: React.FC<Props> = ({ nameRecipe }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {pathnames.length > 0 ? (
        <Link style={{ textDecoration: 'none', color: 'black'}} to="/">
          Головна
        </Link>
      ) : (
        <Typography>Головна</Typography>
      )}
      {pathnames.map((name, index) => {
        nameRecipe ? name = nameRecipe : name;
        let routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        routeTo === '/products' ?  name = 'Всі рецепти' : routeTo

        return index === pathnames.length - 1 ? (
          <Typography key={routeTo}>{name}</Typography>
        ) : (
          <Link style={{ textDecoration: 'none', color: 'black'}}  key={routeTo} color="inherit" to={routeTo}>
            {name}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}

export default Breadcrumb;