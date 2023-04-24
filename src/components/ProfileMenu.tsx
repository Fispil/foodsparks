import { useAppSelector } from "../util/hooks";
import AccountMenu from "./AccountMenu";
import SignInDialog from "./SignIn";

const ProfileMenu: React.FC = () => {
  const isLoggined = useAppSelector(state => state.user.isLoggined)

  return (
    isLoggined ?
      (<AccountMenu />)
      : (<SignInDialog />)
  );
}


export default ProfileMenu;