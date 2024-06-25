import LogOutButton from "../logoutButton.jsx/LogOutButton";
import MenuAvatar from "../menuAvatarInNavbar/MenuAvatar";

const Header = async ({ name }) => {
  return (
    <div className="w-full p-5 flex justify-between items-center">
      <div className="text-md font-bold">Bienvenue {name}</div>
      <div className="flex items-center gap-3">
        <LogOutButton />
        <MenuAvatar />
      </div>{" "}
      {/* Added closing tag and fixed syntax error */}
    </div>
  );
};

export default Header;
