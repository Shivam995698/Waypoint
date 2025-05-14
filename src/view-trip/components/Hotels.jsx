import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Hotels({ obj , location}) {
  const list = obj?.tripData?.hotels || [];

  // State to store photos for each hotel
  const [photoUrls, setPhotoUrls] = useState([]);

  // Function to fetch photo references for each hotel
  const fetchPlacePhotos = async () => {
    try {
      const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;
      const photoPromises = list.map(async (hotel) => {
        const query = `${hotel?.HotelName} in ${hotel?.HotelAddress},${location}`;
        const searchUrl = `https://proxy-server-imo9.onrender.com/google-api/maps/api/place/textsearch/json?query=${encodeURIComponent(
          query
        )}&key=${API_KEY}`;

        // Fetch place data
        const response = await fetch(searchUrl);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error("Failed to fetch place data");
        }

        const data = await response.json();

        // If photo exists, return photo URL; otherwise, return default
        if (data?.results?.[0]?.photos?.[0]?.photo_reference) {
          const photoReference = data.results[0].photos[0].photo_reference;
          return `https://proxy-server-imo9.onrender.com/google-api/maps/api/place/photo?maxwidth=800&photo_reference=${photoReference}&key=${API_KEY}`;
        } else {
          return "/defaultHotel.webp"; // Default image if no photo available
        }
      });

      // Resolve all photo promises and update state
      const resolvedPhotos = await Promise.all(photoPromises);
      setPhotoUrls(resolvedPhotos);
    } catch (error) {
      console.error("Error fetching place photos:", error);
    }
  };

  // Fetch photos when the component mounts
  useEffect(() => {
    if (list.length > 0) {
      fetchPlacePhotos();
    }
  }, [list]);

  return (
    <div className="p-2 md:p-6">
      <h2 className="font-bold text-lg md:text-xl mt-2 mb-2">
        Hotel Recommendations
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {list.map((hotel, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              hotel?.HotelName + " at " + hotel?.HotelAddress + "," + location
            )}`}
            target="_blank"
            key={index}
          >
            <div className="hover:scale-110 scale-105 hover:shadow-md hover:border transition-all rounded-xl p-2 cursor-pointer hover:bg-white h-[300px] md:h-[375px]">
              <img
                src={photoUrls[index] || "/defaultHotel.webp"}
                className="rounded-xl object-cover h-[180px] w-full"
                alt={hotel?.HotelName} 
              />
              <div className="my-2 flex flex-col gap-1 sm:gap-2">
                <h2 className="font-medium text-sm sm:text-md md:text-lg">
                  {hotel?.HotelName}
                </h2>
                <h2 className="text-xs sm:text-sm text-gray-500">
                  📍{hotel?.HotelAddress}
                </h2>
                <h2 className="text-xs sm:text-sm">
                ₹{Number(hotel?.pricePerNight?.min)*70} - ₹{Number(hotel?.pricePerNight?.max)*80} per
                  night
                </h2>
                <h2 className="text-xs sm:text-sm">⭐{hotel?.rating} stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
