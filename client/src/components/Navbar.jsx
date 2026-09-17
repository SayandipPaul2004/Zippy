import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link2, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ];
  useEffect(() => {
    function handleClick(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2451FF]">
            <Link2 className="h-5 w-5 text-white" strokeWidth={2.5} />
          </span>
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            Zippy
          </span>
        </Link>
        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group relative py-1 text-[15px] font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#2451FF] transition-all duration-300 ease-out group-hover:w-full" />
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-4 md:flex">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-[15px] font-medium text-slate-700 transition-colors duration-200 hover:text-slate-900"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="rounded-lg bg-[#2451FF] px-5 py-2.5 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d40cc] hover:shadow-md active:scale-[0.98]"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              <button className="rounded-lg bg-[#2451FF] px-5 py-2.5 text-[15px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-[#1d40cc] hover:shadow-md active:scale-[0.98]">
                Shorten a link
              </button>
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-colors duration-200 hover:bg-slate-100"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-sm font-medium text-white">
                    A
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                      profileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-slate-200 bg-white py-1.5 shadow-lg transition-all duration-200 ${
                    profileOpen
                      ? "scale-100 opacity-100"
                      : "pointer-events-none scale-95 opacity-0"
                  }`}
                >
                  <Link
                    to="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Settings
                  </Link>
                  <hr className="my-1 border-slate-100" />
                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setProfileOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
        <button
          className="relative h-5 w-6 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="absolute left-0 h-0.5 w-6 rounded-full bg-slate-900 transition-all duration-300 ease-in-out"
            style={{
              top: mobileOpen ? "9px" : "0px",
              transform: mobileOpen ? "rotate(45deg)" : "rotate(0deg)",
            }}
          />
          <span
            className="absolute left-0 top-[9px] h-0.5 w-6 rounded-full bg-slate-900 transition-opacity duration-200"
            style={{ opacity: mobileOpen ? 0 : 1 }}
          />
          <span
            className="absolute left-0 h-0.5 w-6 rounded-full bg-slate-900 transition-all duration-300 ease-in-out"
            style={{
              top: mobileOpen ? "9px" : "18px",
              transform: mobileOpen ? "rotate(-45deg)" : "rotate(0deg)",
            }}
          />
        </button>
      </nav>
      <div
        className={`overflow-hidden border-t border-slate-200 transition-all duration-300 ease-in-out md:hidden ${
          mobileOpen ? "max-h-[420px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2.5 text-[15px] font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-50"
            >
              {link.label}
            </a>
          ))}

          <hr className="my-2 border-slate-100" />

          {!isLoggedIn ? (
            <div className="flex flex-col gap-3 px-3 pt-1">
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileOpen(false);
                }}
                className="text-left text-[15px] font-medium text-slate-700"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMobileOpen(false);
                }}
                className="rounded-lg bg-[#2451FF] px-5 py-2.5 text-center text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#1d40cc]"
              >
                Sign up
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-3 pt-1">
              <button className="rounded-lg bg-[#2451FF] px-5 py-2.5 text-center text-[15px] font-medium text-white transition-colors duration-200 hover:bg-[#1d40cc]">
                Shorten a link
              </button>
              <Link
                to="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium text-slate-700"
              >
                Dashboard
              </Link>
              <Link
                to="/settings"
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium text-slate-700"
              >
                Settings
              </Link>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setMobileOpen(false);
                }}
                className="text-left text-[15px] font-medium text-slate-700"
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
