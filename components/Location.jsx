import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Phone,
  Clock,
} from "lucide-react";

const VictoriaMemorialCarousel = ({ localResults }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextLocation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % localResults.length);
  };

  const prevLocation = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? localResults.length - 1 : prevIndex - 1
    );
  };

  const currentLocation = localResults[currentIndex];

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={currentLocation.thumbnail}
          alt={currentLocation.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 flex justify-between items-center p-4">
          <button
            onClick={prevLocation}
            className="bg-white/50 rounded-full p-2 hover:bg-white/75"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={nextLocation}
            className="bg-white/50 rounded-full p-2 hover:bg-white/75"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{currentLocation.title}</h2>

        <div className="space-y-2">
          <div className="flex items-center">
            <MapPin className="mr-2 text-gray-600" size={20} />
            <p className="text-sm">{currentLocation.address}</p>
          </div>

          {currentLocation.phone && (
            <div className="flex items-center">
              <Phone className="mr-2 text-gray-600" size={20} />
              <p className="text-sm">{currentLocation.phone}</p>
            </div>
          )}

          <div className="flex items-center">
            <Clock className="mr-2 text-gray-600" size={20} />
            <p className="text-sm">
              {currentLocation.workingHours.days[0].time}
            </p>
          </div>

          <div className="flex items-center">
            <Star className="mr-2 text-yellow-500" size={20} />
            <p className="text-sm">
              {currentLocation.rating} ({currentLocation.reviews} reviews)
            </p>
          </div>
        </div>

        {currentLocation.description && (
          <p className="mt-3 text-gray-600 text-sm">
            {currentLocation.description}
          </p>
        )}
      </div>

      <div className="flex justify-center py-2">
        {localResults.map((_, index) => (
          <span
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VictoriaMemorialCarousel;
