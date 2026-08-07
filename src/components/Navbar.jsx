import { useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaCog,
  FaMoon,
  FaSun,
  FaSearch,
  FaUserCircle,
  FaBars,
} from "react-icons/fa";
import API from "../api";
import logo from "../assets/cms-logo.png";

export default function Navbar({ setSidebarOpen }) {
  const [time, setTime] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  const searchRef = useRef(null);

  // =========================
  // CLOCK
  // =========================
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();

      setTime(
        now.toLocaleString("en-IN", {
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };

    updateClock();

    const timer = setInterval(updateClock, 1000);

    return () => clearInterval(timer);
  }, []);

  // =========================
  // NOTIFICATIONS
  // =========================
  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const res = await API.get("/dashboard/notifications");

        setNotifications(res.data);
      } catch (err) {
        console.error("Failed to load notifications:", err);
      }
    };

    loadNotifications();

    const interval = setInterval(loadNotifications, 30000);

    return () => clearInterval(interval);
  }, []);

  // =========================
  // DARK MODE
  // =========================
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="relative z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="flex items-center justify-between px-4 md:px-6 py-3">

        {/* =========================
            LEFT SECTION
        ========================== */}
        <div className="flex items-center gap-4">

          {/* Mobile Sidebar Button */}
          <button
            className="lg:hidden text-2xl text-slate-700 dark:text-white hover:text-cyan-600 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <FaBars />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="CMS Logo"
              className="h-10 w-10 object-contain"
            />

            <div className="hidden sm:block">
              <h2 className="font-bold text-lg text-slate-800 dark:text-white">
                CMS AI
              </h2>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Complaint Management System
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            CENTER SECTION
        ========================== */}
        <div className="hidden lg:block">
          <div className="text-center">
            <p className="text-sm font-semibold text-slate-700 dark:text-gray-200">
              {time}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              AI-Powered Business Intelligence
            </p>
          </div>
        </div>

        {/* =========================
            RIGHT SECTION
        ========================== */}
        <div className="flex items-center gap-2 md:gap-3 relative">

          {/* Desktop Search */}
          <div className="hidden lg:flex items-center">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

              <input
                type="text"
                placeholder="Search..."
                className="w-48 xl:w-64 pl-10 pr-4 py-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-sm text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Mobile Search Button */}
          <button
            className="lg:hidden h-10 w-10 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white transition flex items-center justify-center"
            onClick={() => {
              setShowSearch(!showSearch);

              setTimeout(() => {
                searchRef.current?.focus();
              }, 100);
            }}
          >
            <FaSearch />
          </button>

          {/* Mobile Search Input */}
          {showSearch && (
            <div className="absolute top-14 right-0 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl p-3 lg:hidden">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-700 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
            </div>
          )}

          {/* =========================
              NOTIFICATIONS
          ========================== */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowSettings(false);
              }}
              className="h-10 w-10 md:h-11 md:w-11 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white transition flex items-center justify-center relative text-slate-700 dark:text-white"
            >
              <FaBell />

              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 min-w-5 px-1 rounded-full flex items-center justify-center">
                  {notifications.length > 9
                    ? "9+"
                    : notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">

                <div className="px-5 py-4 border-b border-gray-200 dark:border-slate-700">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-white">
                    Notifications
                  </h3>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Latest system activity
                  </p>
                </div>

                <div className="max-h-80 overflow-y-auto">

                  {notifications.length === 0 ? (
                    <div className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map((n, index) => (
                      <div
                        key={n.id || index}
                        className="px-5 py-4 border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                      >
                        <p className="text-sm text-slate-700 dark:text-gray-200">
                          {n.message || n.title || "New notification"}
                        </p>

                        {n.created_at && (
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(n.created_at).toLocaleString()}
                          </p>
                        )}
                      </div>
                    ))
                  )}

                </div>
              </div>
            )}
          </div>

          {/* =========================
              DARK MODE
          ========================== */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hidden sm:flex h-10 w-10 md:h-11 md:w-11 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white transition items-center justify-center text-slate-700 dark:text-white"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* =========================
              SETTINGS
          ========================== */}
          <div className="relative hidden md:block">
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                setShowNotifications(false);
              }}
              className="h-11 w-11 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white transition items-center justify-center text-slate-700 dark:text-white flex"
            >
              <FaCog />
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">

                <button className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white">
                  👤 My Profile
                </button>

                <button className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white">
                  🎨 Appearance
                </button>

                <button className="w-full text-left px-5 py-3 hover:bg-gray-100 dark:hover:bg-slate-700 dark:text-white">
                  🔒 Security
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="w-full text-left px-5 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30"
                >
                  🚪 Logout
                </button>

              </div>
            )}
          </div>

          {/* =========================
              PROFILE
          ========================== */}
          <div className="hidden sm:flex items-center gap-3 pl-2">

            <FaUserCircle className="text-3xl text-cyan-600 dark:text-cyan-400" />

            <div className="hidden xl:block">
              <h4 className="font-bold text-slate-800 dark:text-white">
                Admin
              </h4>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                AI Administrator
              </p>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}