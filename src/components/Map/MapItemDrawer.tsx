import { useEffect, useMemo, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import type { Marker as MarkerType } from "@/stores/MarkersStore";
import { type DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";
import { es } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TextType from "@/components/TextType";
import LogoLoop from "@/components/LogoLoop";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { LuMapPin, LuText } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { GrGroup } from "react-icons/gr";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Visitor {
  id?: string;
  name: string;
  url?: string;
}

interface FirestoreDocumentReference {
  _key: {
    path: {
      segments: string[];
    };
  };
}

interface MapItemDrawerProps {
  activeMarker: MarkerType | null;
  onOpenChange: (open: boolean) => void;
}

export default function MapItemDrawer({
  activeMarker,
  onOpenChange,
}: MapItemDrawerProps) {
  const isOpen = activeMarker !== null;
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [isLoadingVisitors, setIsLoadingVisitors] = useState(false);

  const dateRange = useMemo<DateRange | undefined>(() => {
    if (!activeMarker?.data?.date) return undefined;

    const startDate = activeMarker.data.date.startDate
      ? new Date(activeMarker.data.date.startDate)
      : undefined;
    const endDate = activeMarker.data.date.endDate
      ? new Date(activeMarker.data.date.endDate)
      : undefined;

    if (startDate || endDate) {
      return { from: startDate, to: endDate };
    }
    return undefined;
  }, [activeMarker]);

  useEffect(() => {
    const fetchReferencedVisitors = async () => {
      if (!activeMarker || !activeMarker.data || !activeMarker.data.visitors) {
        setVisitors([]);
        setIsLoadingVisitors(false);
        return;
      }

      setIsLoadingVisitors(true);
      const visitorsData = activeMarker.data.visitors;
      const visitorsWithDetails: Visitor[] = [];

      for (const visitor of visitorsData) {
        if (visitor && typeof visitor === "object" && "_key" in visitor) {
          try {
            const visitorRef = visitor as FirestoreDocumentReference;
            const segments = visitorRef._key.path.segments;
            const userId = segments[segments.length - 1];

            const userDoc = await getDoc(doc(db, "users", userId));

            if (userDoc.exists()) {
              const userData = userDoc.data();
              visitorsWithDetails.push({
                id: userDoc.id,
                name: userData.name,
                url: userData.url,
              });
            } else {
              console.log("User not found:", userId);
            }
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        } else if (typeof visitor === "string") {
          visitorsWithDetails.push({
            name: visitor,
          });
        }
      }

      setVisitors(visitorsWithDetails);
      setIsLoadingVisitors(false);
    };

    if (isOpen && activeMarker) {
      fetchReferencedVisitors();
    }
  }, [activeMarker, isOpen]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const visitorLogos = useMemo(
    () =>
      visitors.map((visitor, index) => ({
        node: (
          <div className="flex items-center gap-2 bg-white rounded-full pl-1 pr-4 py-1 border-2 border-blue-400 hover:shadow-md transition-all">
            <div className="w-8 h-8 flex-shrink-0">
              <Avatar className="w-full h-full ring-2 ring-white" key={index}>
                <AvatarImage src={visitor.url} alt={visitor.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold">
                  {getInitials(visitor.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <span className="text-sm font-medium text-gray-700">
              {visitor.name}
            </span>
          </div>
        ),
        title: visitor.name,
        href: "#",
      })),
    [visitors],
  );

  return (
    <Drawer direction="right" onOpenChange={onOpenChange} open={isOpen}>
      <DrawerContent className="bg-white !max-w-lg" style={{ zIndex: 1100 }}>
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <DrawerHeader className="border-b pb-6">
              <DrawerTitle className="text-2xl font-bold text-gray-900">
                {activeMarker?.title}
              </DrawerTitle>
              <DrawerDescription className="text-base text-gray-600 mt-2 flex items-center gap-2">
                <LuMapPin size={20} />
                {activeMarker?.location?.state},{" "}
                {activeMarker?.location?.country}
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-6">
              <div className="relative overflow-hidden float-image">
                <img
                  src={activeMarker?.imageUrl}
                  alt={activeMarker?.title}
                  className="w-full h-120 object-contain"
                />
              </div>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <IoMdInformationCircleOutline
                      size={20}
                      className="text-blue-500"
                    />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Información del viaje
                    </h3>
                  </div>
                  {activeMarker?.data?.visitor ? (
                    <div className="text-md text-gray-900 bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <TextType
                        text={[
                          activeMarker.data.visitor,
                          `${activeMarker.location?.state}, ${activeMarker.location?.country}`,
                          `lat: ${activeMarker.location?.lat}, lon: ${activeMarker.location?.lon}`,
                        ]}
                        typingSpeed={75}
                        pauseDuration={1500}
                        showCursor={true}
                        cursorCharacter="|"
                      />
                    </div>
                  ) : (
                    <p className="text-sm text-gray-900 bg-gray-50 rounded-lg p-4 border border-gray-200 text-justify leading-relaxed">
                      No hay usuarios registrados
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <LuText size={20} className="text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Descripción
                    </h3>
                  </div>
                  <p className="text-sm text-gray-900 bg-gray-50 rounded-lg p-4 border border-gray-200 text-justify leading-relaxed">
                    {activeMarker?.data?.description}
                  </p>
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 mb-4">
                    <GrGroup size={20} className="text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Acompañantes
                    </h3>
                  </div>
                  {isLoadingVisitors ? (
                    <div className="flex items-center gap-2 py-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
                      <span className="text-sm text-gray-600">
                        Cargando visitantes...
                      </span>
                    </div>
                  ) : visitors.length > 0 ? (
                    visitors.length > 3 ? (
                      <div className="flex flex-wrap gap-3">
                        <div
                          style={{
                            height: "60px",
                            position: "relative",
                            overflow: "hidden",
                          }}
                        >
                          <LogoLoop
                            logos={visitorLogos}
                            speed={80}
                            direction="left"
                            logoHeight={40}
                            gap={16}
                            hoverSpeed={20}
                            ariaLabel="Acompañantes"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {visitors.map((visitor) => (
                          <div
                            key={visitor.id ?? visitor.name}
                            className="flex items-center gap-2 bg-white rounded-full pl-1 pr-4 py-1 border-2 border-blue-400 hover:shadow-md transition-all"
                          >
                            <Avatar className="w-8 h-8 ring-2 ring-white">
                              <AvatarImage alt={visitor.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs font-bold">
                                {getInitials(visitor.name)}
                              </AvatarFallback>
                            </Avatar>

                            <span className="text-sm font-medium text-gray-700">
                              {visitor.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    )
                  ) : (
                    <p className="text-sm text-gray-900 bg-gray-50 rounded-lg p-4 border border-gray-200 text-justify leading-relaxed">
                      No hay visitantes registrados
                    </p>
                  )}
                </div>
              </div>

              <div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-100">
                  <div className="flex items-center gap-2 mb-3">
                    <CiCalendar size={20} className="text-blue-500" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      Duración
                    </h3>
                  </div>
                  <p className="text-sm text-gray-900 bg-gray-50 rounded-lg p-4 border border-gray-200 text-justify leading-relaxed">
                    {activeMarker?.data?.date?.startDate ? (
                      <Calendar
                        locale={es}
                        mode="range"
                        defaultMonth={dateRange?.from}
                        selected={dateRange}
                        onSelect={() => {}}
                        disabled={() => true}
                        showOutsideDays={false}
                        numberOfMonths={1}
                        captionLayout="label"
                        className="[--cell-size:1rem] w-full"
                      />
                    ) : (
                      "No hay duración registrada"
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
