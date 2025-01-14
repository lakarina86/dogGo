import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome, AiOutlineUser } from "react-icons/ai";
import { FaMapMarkedAlt, FaHotel } from "react-icons/fa";
import { GiSittingDog } from "react-icons/gi";
import { useLocation } from "react-router";
import clsx from "clsx";
import "./Nav.css";

const Nav: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <nav>
      <Link to="/" className={clsx({ active: pathname === "/" })}>
        <AiOutlineHome />
      </Link>

      <Link
        to="hotels"
        className={clsx({ active: pathname.startsWith("/hotels") })}
      >
        <FaHotel />
      </Link>

      <Link to="map" className={clsx({ active: pathname.startsWith("/map") })}>
        <FaMapMarkedAlt data-testid="map-btn" />
      </Link>

      <Link
        to="sitter"
        className={clsx({ active: pathname.startsWith("/sitter") })}
      >
        <GiSittingDog />
      </Link>

      <Link
        to="login"
        className={clsx({ active: pathname.startsWith("/login") })}
      >
        <AiOutlineUser data-testid="login-btn" />
      </Link>
    </nav>
  );
};

export { Nav };
