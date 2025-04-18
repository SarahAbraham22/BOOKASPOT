"use client";
import React from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      {/* Logo */}
      <span className="text-xl font-bold text-black">BOOKaSPOT</span>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        <Link href="/dashboard" className="nav-link text-black">Today</Link>
        <Link href="/booking" className="nav-link text-black">Calendar</Link>
        <Link href="/page" className="nav-link text-black">Listings</Link>
      </div>

      {/* Profile Icon with Link */}
      <Link href="/vendorinfo">
        <FaUserCircle className="text-2xl text-black cursor-pointer" />
      </Link>

      <style jsx>{`
        .nav-link {
          position: relative;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: black;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -4px;
          width: 0;
          height: 2px;
          background-color: black;
          transition: width 0.3s ease, left 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
          left: 0;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
