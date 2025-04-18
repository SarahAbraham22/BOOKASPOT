"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useSearchParams, useRouter } from "next/navigation";
import { IoMdStar } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";

const SearchResults = () => {
  const searchParams = useSearchParams();
  const eventType = searchParams.get("eventType");
  const location = searchParams.get("location");

  const router = useRouter(); // ✅ Using router for same-tab navigation

  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleCheckboxChange = (filterName, option) => {
    setSelectedOptions((prev) => {
      const selected = prev[filterName] || [];
      return {
        ...prev,
        [filterName]: selected.includes(option)
          ? selected.filter((item) => item !== option)
          : [...selected, option],
      };
    });
  };

  useEffect(() => {
    if (eventType && location) {
      fetch(`/api/search?eventType=${encodeURIComponent(eventType)}&location=${encodeURIComponent(location)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) setResults(data);
          else setResults([]);
        })
        .catch(() => setError("Something went wrong"));
    }
  }, [eventType, location]);

  const filters = [
    { name: "No of Guests", options: ["<100", "100-250", "250-500", "500-1000", ">1000"] },
    { name: "Rental Price", options: ["< ₹5000", "₹50,000 - 1L", "₹1L - 3L", "₹3L - 5L", "> ₹5L"] },
    { name: "Space", options: ["Indoor", "Outdoor", "Poolside", "Rooftop"] },
    { name: "Ratings", options: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"] },
  ];

  // ✅ Updated to use router.push instead of window.open
  const openDetailsPage = (venue) => {
    const url = `/venue-details?name=${encodeURIComponent(venue.conventionCenter)}&capacity=${encodeURIComponent(
      venue.capacity
    )}&location=${encodeURIComponent(venue.address)}&cost=${encodeURIComponent(
      venue.cost
    )}&contact=${encodeURIComponent(venue.contact)}&gmap=${encodeURIComponent(venue.gmap)}`;

    router.push(url); // 🔁 Navigate within same tab
  };

  return (
    <div className="p-4 w-screen min-h-screen bg-black text-white">
      <NavBar />

      {/* Filter Bar */}
      <div className="flex gap-6 bg-gray-900 justify-center p-4 rounded-lg">
        {filters.map((filter) => (
          <div key={filter.name} className="relative hover:scale-105">
            <button onClick={() => toggleDropdown(filter.name)} className="px-4 py-2 rounded-md">
              {filter.name}
            </button>

            {openDropdown === filter.name && (
              <ul className="absolute left-0 mt-2 w-44 bg-black shadow-md rounded-md z-10">
                {filter.options.map((option) => (
                  <li key={option} className="px-4 py-2 hover:underline cursor-pointer text-sm">
                    <input
                      type="checkbox"
                      checked={selectedOptions[filter.name]?.includes(option) || false}
                      onChange={() => handleCheckboxChange(filter.name, option)}
                      className="mr-2"
                    />
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Search Info */}
      <p className="p-6 pt-10 text-2xl">
        Showing search results for "{eventType}" in "{location}"
      </p>

      {/* Results */}
      {error && <p className="text-red-400 text-center">{error}</p>}
      <div className="container mx-auto">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {results.map((venue, index) => (
              <div
                key={index}
                onClick={() => openDetailsPage(venue)}
                className="bg-gray-900 hover:scale-105 transition ease-in-out p-4 rounded-3xl cursor-pointer"
              >
                <img src="/1.jpeg" alt="venue" className="h-48 object-cover rounded-2xl w-full" />
                <div className="flex justify-between items-center py-3">
                  <p className="font-bold text-lg">{venue.conventionCenter}</p>
                  <div className="flex items-center text-gray-300 text-sm">
                    <IoMdStar className="text-yellow-400 mr-1" /> 4.2 (105 reviews)
                  </div>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <IoLocationSharp className="mr-1" />
                  {venue.address}
                </div>
                <p className="mt-2 text-sm text-gray-500">Rent:</p>
                <p className="text-2xl">₹{venue.cost}</p>
                <div className="flex flex-wrap gap-2 mt-2 text-xs">
                  <p className="bg-gray-700 p-1 rounded">{venue.capacity} Guests</p>
                  <p className="bg-gray-700 p-1 rounded underline">+2 more</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center mt-6">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
