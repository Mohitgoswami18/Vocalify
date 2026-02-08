import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/clerk-react";
import { RiMicAiFill } from "react-icons/ri";
import {toast} from "sonner"
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
  const navigate = useNavigate()
  const { signOut, user } = useClerk();
  
  const menu = [
    { name: "Dashboard", path: `/${user?.username}/dashboard` },
    { name: "Analyze Voice", path: `/${user?.username}/analyze` },
    { name: "History", path: `/${user?.username}/history` },
    { name: "Profile", path: `/${user?.username}/profile` },
  ];

  const handleSignOut = () => {
    signOut(() => {
      toast.success("Signed out Successfully...!!");
      navigate("/auth/signup");
    });
  };

  return (
    <div className="hidden md:flex w-64 shadow-sm bg-white border-r flex-col">
      <div className="p-6 font-semibold text-blue-600 flex items-center gap-2">
        <RiMicAiFill className="text-2xl"></RiMicAiFill> Vocalify
      </div>

      <nav className="flex-1 px-4 space-y-2 text-sm">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
      <Button
        className="m-4 cursor-pointer"
        variant="destructive"
        onClick={() => {
          handleSignOut()
        }}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Sidebar;
