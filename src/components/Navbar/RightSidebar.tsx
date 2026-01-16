import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
}

// Set your next trip date here (YYYY-MM-DD HH:MM format)
const NEXT_TRIP_DATE = new Date("2026-02-13T00:00:00");

export default function RightSidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const diffTime = NEXT_TRIP_DATE.getTime() - now.getTime();

      if (diffTime > 0) {
        const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

        setTimeRemaining({ days, hours, minutes });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeRemaining();

    // Update every minute
    const intervalId = setInterval(calculateTimeRemaining, 60000);

    return () => clearInterval(intervalId);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-8 right-8 z-30">
      <div className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-gray-200 p-8 w-80 relative">
        {/* Close Button */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors duration-200"
          aria-label="Cerrar"
        >
          <IoClose size={24} />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Días hasta el próximo viaje
          </h2>
        </div>

        {/* Countdown */}
        <div className="flex justify-center gap-3">
          {/* Days */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Días
            </span>
            <div className="bg-black rounded-xl w-20 h-20 flex items-center justify-center shadow-md">
              <span className="text-4xl font-bold text-white">
                {timeRemaining.days}
              </span>
            </div>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Horas
            </span>
            <div className="bg-black rounded-xl w-20 h-20 flex items-center justify-center shadow-md">
              <span className="text-4xl font-bold text-white">
                {timeRemaining.hours.toString().padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center gap-3">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              Minutos
            </span>
            <div className="bg-black rounded-xl w-20 h-20 flex items-center justify-center shadow-md">
              <span className="text-4xl font-bold text-white">
                {timeRemaining.minutes.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Target Date - Emphasized */}
        <div className="mt-8 text-center">
          <div className="bg-black rounded-lg px-6 py-3">
            <span className="text-sm font-bold text-white">
              {NEXT_TRIP_DATE.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
