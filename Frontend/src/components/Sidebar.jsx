import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Analyze Voice", path: "/analyze" },
  { name: "History", path: "/history" },
  { name: "Profile", path: "/profile" },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 shadow-sm bg-white border-r flex-col">
      <div className="p-6 font-semibold text-blue-600 flex items-center gap-2">
        🎤 Vocalify
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
    </aside>
  );
};

export default Sidebar;
