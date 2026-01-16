import React from "react";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegMap } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";
import GlassSurface from "../GlassSurface";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "../ui/button";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate("/home");
  };

  const handleMap = () => {
    navigate("/map");
  };

  const handleStats = () => {
    navigate("/stats");
  };

  const items = [
    {
      icon: <IoHomeOutline size={20} />,
      label: "Home",
      onClick: handleHome,
      path: "/home",
    },
    {
      icon: <FaRegMap size={20} />,
      label: "Map",
      onClick: handleMap,
      path: "/map",
    },
    {
      icon: <MdQueryStats size={20} />,
      label: "Stats",
      onClick: handleStats,
      path: "/stats",
    },
  ];

  const getButtonClass = (path: string): string => {
    const isActive = location.pathname === path;

    if (isActive) {
      return "!bg-black !text-white !border-black";
    }

    return "!bg-transparent !border-black !text-black hover:!bg-white hover:!text-black";
  };

  return (
    <div className="fixed top-2 left-0 right-0 z-[5000] pointer-events-none flex justify-center">
      <div className="pointer-events-auto">
        <GlassSurface
          width={225}
          height={70}
          borderRadius={24}
          borderWidth={0.07}
          brightness={20}
          saturation={1.5}
          opacity={0.5}
          displace={0.5}
          blur={20}
          distortionScale={-180}
        >
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-row items-center justify-center gap-3">
              {items.map((item) => (
                <Button
                  key={item.path}
                  variant="outline"
                  className={`!w-12 !h-12 !rounded-full !border-2 !p-0 cursor-pointer ${getButtonClass(
                    item.path
                  )} !ring-0 !outline-none`}
                  style={{
                    transition:
                      "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    item.onClick();
                  }}
                  onBlur={(e) => e.currentTarget.blur()}
                  aria-label={item.label}
                >
                  {item.icon}
                </Button>
              ))}
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}
