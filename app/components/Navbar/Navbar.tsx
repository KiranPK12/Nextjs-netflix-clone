"use client";
import React, { useCallback, useEffect, useState } from "react";
import NavbarItems from "./NavbarItems";
import { BsBell, BsChevronDown, BsSearch } from "react-icons/bs";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

type Props = {};

const TOP_OFFSET = 66;

const Navbar = (props: Props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAcccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY >= TOP_OFFSET) {
        setShowBackground(true);
      } else setShowBackground(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAcccountMenu((current) => !current);
  }, []);

  return (
    <div className="w-full fixed z-40">
      <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground?'bg-zinc-900 bg-opacity-90':''}`}>
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex ">
          <NavbarItems label="Home" />
          <NavbarItems label="Series" />
          <NavbarItems label="Movies" />
          <NavbarItems label="New & Popular" />
          <NavbarItems label="My list" />
          <NavbarItems label="Browse by Language" />
        </div>
        <div
          onClick={() => toggleMobileMenu()}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer"
        >
          <p className="text-left text-sm text-white">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div
            onClick={() => toggleAccountMenu()}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="Profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
