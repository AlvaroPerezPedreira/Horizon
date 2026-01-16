import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { FaRegMap } from "react-icons/fa";
import { MdQueryStats } from "react-icons/md";

export default function HomeButtons() {
  const navigate = useNavigate();

  const handleMap = () => {
    navigate("/map");
  };

  const handleStats = () => {
    navigate("/stats");
  };

  return (
    <div className="flex flex-row gap-40">
      <Button
        variant="outline"
        className="!w-16 !h-16 !rounded-full !border-2 !border-white !bg-transparent !p-0 !text-white hover:!bg-white hover:!text-black cursor-pointer"
        style={{
          transition:
            "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
        onClick={handleMap}
      >
        <span style={{ transform: "scale(1.5)" }}>
          <FaRegMap size={32} />
        </span>
      </Button>

      <Button
        variant="outline"
        className="!w-16 !h-16 !rounded-full !border-2 !border-white !bg-transparent !p-0 !text-white hover:!bg-white hover:!text-black cursor-pointer"
        style={{
          transition:
            "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
        }}
        onClick={handleStats}
      >
        <span style={{ transform: "scale(1.5)" }}>
          <MdQueryStats size={24} />
        </span>
      </Button>
    </div>
  );
}
