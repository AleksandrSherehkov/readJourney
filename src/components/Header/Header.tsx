import { HeaderNavLink } from '../HeaderNavLink/HeaderNavLink';
import { LogOut } from '../LogOut/LogOut';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';
import { HeaderUser } from '../HeaderUser/HeaderUser';
import { Login } from '../Login/Login';

const Header = () => {
    return (
        <header className=" mb-[10px] flex w-full items-center justify-between rounded-[15px] bg-darkGrey px-5 py-[11px] md:mb-4 md:p-4 ">
            <Login text="read journey" />
            <HeaderNavLink />
            <div className="flex items-center gap-x-[10px] md:gap-x-4 ">
                <HeaderUser />
                <LogOut />
                <BurgerMenu />
            </div>
        </header>
    );
};

export default Header;
