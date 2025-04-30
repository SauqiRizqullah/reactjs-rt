import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navbar");
      const pages = document.querySelectorAll("#page");

      if (window.scrollY > 2) {
        navbar.classList.add("bg-slate-50", "text-blue-950");
        navbar.classList.remove("bg-blue-950", "text-slate-50");

        pages.forEach((page) => {
          page.classList.add("hover:text-blue-800");
          page.classList.remove("hover:text-slate-400");
        });
      } else {
        navbar.classList.add("bg-blue-950", "text-slate-50");
        navbar.classList.remove("bg-slate-50", "text-blue-950");

        pages.forEach((page) => {
          page.classList.remove("hover:text-blue-800");
          page.classList.add("hover:text-slate-400");
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        id="navbar"
        className="bg-blue-950 md:flex md:justify-between md:items-center text-slate-50 pt-2 pb-2 text-sm fixed w-full transition-all duration-300 px-6 z-50"
      >
        <div className="flex items-center justify-between text-lg md:ml-10 lg:ml-20">
          <Link id="page" to="/" className="hover:text-slate-400 transition duration-300 ease-out">
            GRAND LIMO
          </Link>
          <button
            className="md:hidden block ml-6 text-white focus:outline-none"
            onClick={toggleSidebar}
          >
            ☰
          </button>
        </div>

        <ul id="sub-pages" className="md:flex gap-6 hidden mt-2 md:mt-0 md:mr-10 lg:mr-20">
  <li>
    <Link id="page" to="/penghuni" className="hover:text-slate-400 transition duration-300 ease-out">
      Penghuni
    </Link>
  </li>
  <li>
    <Link id="page" to="/rumah" className="hover:text-slate-400 transition duration-300 ease-out">
      Rumah
    </Link>
  </li>
  <li>
    <Link id="page" to="/pembayaran" className="hover:text-slate-400 transition duration-300 ease-out">
      Pembayaran
    </Link>
  </li>
  <li>
    <Link id="page" to="/pengeluaran" className="hover:text-slate-400 transition duration-300 ease-out">
      Pengeluaran
    </Link>
  </li>
  <li>
    <Link id="page" to="/laporan" className="hover:text-slate-400 transition duration-300 ease-out">
      Laporan
    </Link>
  </li>
</ul>
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-11 w-full bg-blue-950" />

      {/* Sidebar untuk mobile */}
      {isSidebarVisible && (
  <div className="md:hidden bg-blue-950 text-white px-6 py-4 space-y-2 fixed top-11 w-full z-40">
    <Link onClick={toggleSidebar} to="/penghuni" className="block hover:text-slate-400">
      Penghuni
    </Link>
    <Link onClick={toggleSidebar} to="/rumah" className="block hover:text-slate-400">
      Rumah
    </Link>
    <Link onClick={toggleSidebar} to="/pembayaran" className="block hover:text-slate-400">
      Pembayaran
    </Link>
    <Link onClick={toggleSidebar} to="/pengeluaran" className="block hover:text-slate-400">
      Pengeluaran
    </Link>
    <Link onClick={toggleSidebar} to="/laporan" className="block hover:text-slate-400">
      Laporan
    </Link>
  </div>
)}

    </div>
  );
}

export default Navbar;
