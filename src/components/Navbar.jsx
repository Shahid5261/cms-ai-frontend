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
import axios from "axios";
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

  useEffect(() => {

  const loadNotifications = async () => {

    try {

      const res = await axios.get(
        "http://127.0.0.1:8000/dashboard/notifications"
      );

      setNotifications(res.data);

    } catch (err) {}

  };

  loadNotifications();

  const interval = setInterval(loadNotifications, 30000);

  return () => clearInterval(interval);

}, []);

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

<header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700 shadow-sm">

<div className="flex items-center justify-between px-3 md:px-8 py-3 md:py-4">

{/* Left */}

<div className="flex items-center gap-3">

<button
className="lg:hidden text-2xl text-slate-700 dark:text-white hover:text-cyan-600 transition"
onClick={() => setSidebarOpen(true)}
>
<FaBars />
</button>

<div className="flex items-center gap-3">

<img
  src={logo}
  alt="CMS AI" 
  className="h-30 w-30 md:h-34 md:w-34 object-contain"
/>

<div>

<h2 className="text-lg md:text-3xl font-black tracking-wide text-slate-800 dark:text-white">
CMS AI
</h2>

<p className="hidden md:block text-xs text-gray-500 dark:text-gray-400">
Enterprise Complaint Intelligence
</p>

<p className="text-[10px] md:text-xs text-gray-400">
{time}
</p>

</div>

</div>

</div>

{/* Mobile Search */}

{
showSearch && (

<div className="fixed top-20 left-4 right-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 md:hidden z-50">

<div className="relative">

<FaSearch className="absolute left-4 top-4 text-gray-400"/>

<input
ref={searchRef}
placeholder="Search complaints..."
className="w-full pl-11 pr-4 py-3 border rounded-xl bg-white dark:bg-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
/>

</div>

</div>

)

}

{/* Right */}

<div className="flex items-center gap-2 md:gap-5">

{/* Desktop Search */}

<div className="relative hidden lg:block">

<FaSearch className="absolute left-4 top-3.5 text-gray-400"/>

<input
ref={searchRef}
type="text"
placeholder="Search complaints..."
className="pl-11 pr-5 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 dark:text-white border border-gray-200 dark:border-slate-700 w-72 focus:outline-none focus:ring-2 focus:ring-cyan-500"
/>

</div>

{/* Mobile Search */}

<button
className="lg:hidden h-10 w-10 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white transition flex items-center justify-center"
onClick={() => {

setShowSearch(!showSearch);

setTimeout(() => {

searchRef.current?.focus();

},100);

}}
>

<FaSearch/>

</button>

{/* Notification */}

<div className="relative">

<button
onClick={()=>{
setShowNotifications(!showNotifications);
setShowSettings(false);
}}
className="h-10 w-10 md:h-11 md:w-11 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-cyan-500 hover:text-white transition flex items-center justify-center relative"
>

<FaBell/>

<span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>

</button>

{showNotifications && (

<div className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-4 max-h-96 overflow-y-auto">

<h3 className="font-bold mb-4 dark:text-white text-lg">
Notifications
</h3>

{notifications.length === 0 ? (

<p className="text-gray-500 dark:text-gray-300">
No notifications available.
</p>

) : (

<div className="space-y-3">

{notifications.map((n, index) => (

<div
key={index}
className={`p-3 rounded-xl border-l-4 ${
n.type === "danger"
? "bg-red-50 border-red-500"
: n.type === "success"
? "bg-green-50 border-green-500"
: n.type === "warning"
? "bg-yellow-50 border-yellow-500"
: "bg-cyan-50 border-cyan-500"
}`}
>

<h4 className="font-semibold">
{n.title}
</h4>

<p className="text-sm text-gray-600">
{n.message}
</p>

<p className="text-xs text-gray-400 mt-1">
{n.time}
</p>

</div>

))}

</div>

)}

</div>

)}

</div>
{/* Dark Mode */}

<button
  onClick={() => setDarkMode(!darkMode)}
  className="hidden sm:flex h-10 w-10 md:h-11 md:w-11 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-indigo-500 hover:text-white transition items-center justify-center"
>

  {darkMode ? <FaSun /> : <FaMoon />}

</button>

{/* Settings */}

<div className="relative">

  <button
    onClick={() => {

      setShowSettings(!showSettings);
      setShowNotifications(false);

    }}
    className="hidden md:flex h-11 w-11 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-orange-500 hover:text-white transition items-center justify-center"
  >

    <FaCog />

  </button>

  {showSettings && (

    <div className="absolute right-0 mt-3 w-60 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden">

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

{/* Profile */}

<div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-700 text-white rounded-2xl px-3 md:px-4 py-2 shadow-xl">

  <FaUserCircle className="text-2xl md:text-3xl" />

  <div className="hidden lg:block">

    <h4 className="font-bold">
      Admin
    </h4>

    <p className="text-xs opacity-90">
      AI Administrator
    </p>

  </div>

</div>

</div>

</div>

</header>

);

}