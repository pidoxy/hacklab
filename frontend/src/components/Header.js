/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import logo from "../logo.svg";

export default function Header() {
  return (
    <Popover className="relative bg-lay border border-darb">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-3 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a className="flex self-center space-x-5" href="/">
              <img
                className="h-2 w-10 sm:h-10 App-logo"
                src={logo}
                alt="pheraCAM logo"
              />
              <p className="font-bold text-2xl text-darb my-0 grid place-items-center">
                PheraCAM
              </p>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 space-x-3 lg:w-0">
            <a
              href="/about"
              className=" font-bold text-lg text-lihb hover:text-gray-900"
            >
              About Us
            </a>
            <a
              href="/login"
              className="font-bold text-lg text-lihb outline outline-lihb py-2 px-4 hover:text-gray-900"
            >
              Log in
            </a>
            <a
              href="/signup"
              className="ml-8 inline-flex items-center justify-center px-4 py-2 bg-lihb shadow-sm font-bold text-lg text-white "
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
      {/* small screens */}
      <Transition
        as={Fragment}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
        >
          <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-5 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex space-x-5">
                  <img
                    src={logo}
                    className=" w-10 App-logo"
                    alt="pheraCAM logo"
                  />
                  <p className="font-bold text-darb grid place-items-center">
                    PheraCAM
                  </p>
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
            </div>
            {/* comment out */}
            <div className="py-6 px-5">
              <div className="flex flex-col justify-center">
                <a
                  href="/about"
                  className="text-base font-bold py-3 px-8 text-lihb hover:text-gray-700"
                >
                  About 
                </a>
                <a
                  href="/contact-us"
                  className="text-base font-bold py-3 px-8 text-lihb hover:text-gray-700"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
