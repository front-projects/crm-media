'use client';

import { useEffect, useRef, useState } from 'react';

import gsap from 'gsap';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoCloseSharp } from 'react-icons/io5';
import { MdAccountCircle } from 'react-icons/md';
import { IoIosStats } from 'react-icons/io';

import NavItem from './Nav-Item';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const navRef = useRef(null);
  const openNavigation = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    if (isOpen && navRef.current) {
      gsap.to(navRef.current, { translateX: 0 });
    }
  }, [isOpen]);

  useEffect(() => {
    if (navRef.current) {
      closeNavigation();
    }
  }, [pathname]);

  const closeNavigation = () => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        translateX: '-100%',
        onComplete: () => setIsOpen(false),
      });
    }
  };

  return (
    <>
      <div
        className="fixed inset-2 text-[200%] cursor-pointer rounded-[50%] p-2 hover:bg-gray-400/40 w-max h-max hover:text-purple-600 z-2"
        onClick={openNavigation}
      >
        <GiHamburgerMenu />
      </div>
      {isOpen && (
        <div
          className="w-screen h-[100dvh] fixed inset-0 bg-black/80 z-10"
          onClick={closeNavigation}
        >
          <nav
            onClick={(e) => e.stopPropagation()}
            ref={navRef}
            className="fixed inset-0 h-[100dvh] w-[320px] bg-background z-10 px-10 pt-20 -translate-x-[100%] max-sm:w-[90vw] flex flex-col gap-4"
          >
            <div
              className="absolute right-4 top-4 text-[200%] cursor-pointer rounded-[50%] p-2 hover:bg-gray-400/40 w-max h-max hover:text-purple-600"
              onClick={closeNavigation}
            >
              <IoCloseSharp />
            </div>
            <NavItem href="/menu/my-account" icon={<MdAccountCircle />}>
              MY ACCOUNT
            </NavItem>
            <NavItem href="/menu/dashboard" icon={<IoIosStats />}>
              DASHBOARD
            </NavItem>
          </nav>
        </div>
      )}
    </>
  );
}
