import React from "react";
import { NavLink } from "react-router-dom";
import "tailwindcss";
export default function Nav() {
  return (
    <div className="p-3 ml-[10%] mt-[20px]">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `no-underline p-1 font-bold hover:text-red-500 ${
            isActive ? "text-red-500" : ""
          }`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/gioi-thieu"
        className={({ isActive }) =>
          `no-underline p-1 font-bold hover:text-red-500 ${
            isActive ? "text-red-500" : ""
          }`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/san-pham"
        className={({ isActive }) =>
          `no-underline p-1 font-bold hover:text-red-500 ${
            isActive ? "text-red-500" : ""
          }`
        }
      >
        Products
      </NavLink>

      <NavLink
        to="/lien-he"
        className={({ isActive }) =>
          `no-underline p-1 font-bold hover:text-red-500 ${
            isActive ? "text-red-500" : ""
          }`
        }
      >
        Contact
      </NavLink>

      <hr className="mt-4" />
    </div>
  );
}
