import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaPlusCircle,
  FaClipboardList,
  FaChartLine,
  FaRobot,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Add Complaint",
      path: "/add",
      icon: <FaPlusCircle />,
    },
    {
      name: "Complaints",
      path: "/complaints",
      icon: <FaClipboardList />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <FaChartLine />,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}

      <aside
        className={`
          fixed top-0 left-0 h-screen w-72
          bg-gradient-to-b
          from-slate-950
          via-slate-900
          to-slate-800
          text-white
          shadow-2xl
          z-50
          transform transition-transform duration-300
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
          lg:translate-x-0
        `}
      >
        {/* Close Button */}

        <button
          className="absolute right-5 top-5 lg:hidden text-2xl"
          onClick={() => setSidebarOpen(false)}
        >
          <FaTimes />
        </button>

        {/* Logo */}

        <div className="py-8 px-6 border-b border-slate-700">

          <div className="flex items-center gap-4">

            <div className="h-14 w-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">

              <FaRobot className="text-3xl" />

            </div>

            <div>

              <h1 className="text-2xl font-extrabold">
                AI CMS
              </h1>

              <p className="text-slate-400 text-sm">
                Complaint Intelligence
              </p>

            </div>

          </div>

        </div>

        {/* Menu */}

        <div className="px-4 py-8 space-y-3">

          {menu.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 shadow-xl"
                    : "hover:bg-slate-700"
                }`
              }
            >
              <div className="text-2xl">
                {item.icon}
              </div>

              <span className="text-lg">
                {item.name}
              </span>

            </NavLink>
          ))}

        </div>

        {/* AI Box */}

        <div className="absolute bottom-32 left-6 right-6">

          <div className="bg-slate-800 rounded-2xl p-5 border border-slate-700">

            <h3 className="text-cyan-400 font-bold mb-2">
              AI Assistant
            </h3>

            <p className="text-sm text-slate-400 leading-6">
              Analyze complaints, generate CAPA, predict trends and automate customer responses.
            </p>

          </div>

        </div>

        {/* Logout */}

        <div className="absolute bottom-6 left-6 right-6">

          <button
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 transition rounded-xl py-3 flex items-center justify-center gap-3 font-semibold"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </aside>
    </>
  );
}