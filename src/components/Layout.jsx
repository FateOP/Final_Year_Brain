import { useEffect, useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { FaHospital, FaHome, FaUserPlus, FaUpload, FaFileMedical, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import { useCase } from "../context/caseContext";
import { checkServer } from "../lib/api";
import { DISCLAIMER } from "../lib/classes";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: FaHome },
  { to: "/patient-form", label: "Patient Registration", icon: FaUserPlus },
  { to: "/upload", label: "MRI Upload", icon: FaUpload },
  { to: "/reports", label: "Reports", icon: FaFileMedical },
  { to: "/analytics", label: "Analytics", icon: FaChartBar },
];

export default function Layout() {
  const { doctor, logout } = useCase();
  const navigate = useNavigate();
  const [online, setOnline] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const ping = () =>
      checkServer(controller.signal).then((ok) => {
        if (!controller.signal.aborted) setOnline(ok);
      });
    ping();
    const timer = setInterval(ping, 15000);
    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, []);

  if (!doctor) return <Navigate to="/login" replace />;

  const status =
    online === null
      ? { text: "Checking AI server...", cls: "bg-gray-100 text-gray-600" }
      : online
        ? { text: "AI server reachable", cls: "bg-emerald-100 text-emerald-700" }
        : { text: "AI server offline", cls: "bg-red-100 text-red-700" };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <aside className="bg-blue-900 text-white shadow-xl md:w-64 md:min-h-screen md:shrink-0">
        <div className="p-6 border-b border-blue-800 flex items-center gap-3">
          <FaHospital size={32} />
          <div>
            <h1 className="text-xl font-bold">NeuroAI</h1>
            <p className="text-sm text-blue-200">MRI Analysis Prototype</p>
          </div>
        </div>
        <nav className="p-4">
          {NAV.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl p-3 mb-2 ${isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-800"}`
              }
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0">
        <header className="bg-white shadow px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-gray-600">
            Signed in as <span className="font-semibold text-gray-800">{doctor}</span>
          </p>
          <div className="flex items-center gap-3">
            <span className={`text-sm px-3 py-1 rounded-full ${status.cls}`}>{status.text}</span>
            <div className="w-10 h-10 bg-blue-600 rounded-full text-white flex items-center justify-center font-bold">
              {doctor.slice(0, 2).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              aria-label="Log out"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </header>

        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-sm px-6 py-2">{DISCLAIMER}</div>

        <main className="p-6 md:p-8 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}