import {
  ChartBarIcon,
  ClockIcon,
  DotsHorizontalIcon,
  HomeIcon,
} from "@heroicons/react/solid";

import { FaMicrophoneAlt } from "react-icons/fa"
import { RiCompassFill } from "react-icons/ri";
import Image from "next/image";
import Dropdown from "./Dropdown";
import Logo from "../assets/img/spotyghost_logo.svg";

function Navbar() {
    return (
      <nav className="fixed top-0 z-10 flex flex-col p-3  items-center bg-[#23263d] w-[80px] h-screen space-y-6">
        <div className="logo">
          <Image src={ Logo } width={45} height={45} objectFit="contain"/>
        </div>
          <ul className="flex flex-col justify-center items-center space-y-6 h-screen">
            <li><HomeIcon className="navIcon text-[#41c8f3] opacity-[0.85] w-[35px]" /></li>
            <li><RiCompassFill className="navIcon text-2xl" /></li>
            <li><FaMicrophoneAlt className="navIcon ml-1" /></li>
            <li><ChartBarIcon className="navIcon" /></li>
            <li><ClockIcon className="navIcon" /></li>
            <li><DotsHorizontalIcon className="navIcon" /></li>
          </ul>
          <Dropdown/>    
      </nav>
    )
  }
  
  export default Navbar;