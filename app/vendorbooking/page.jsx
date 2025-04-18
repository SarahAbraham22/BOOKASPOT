"use client";
import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isToday, addMonths } from "date-fns";
import "../booking/booking.css";
import Navbar from "../../components/Navbar_vendor";

const bookedDates = ["2025-03-05", "2025-03-26", "2025-04-10"];
const freeDates = ["2025-03-17", "2025-03-30", "2025-04-15"];

const BookingVendor = () => {
  const today = new Date();
  const months = Array.from({ length: 12 }, (_, i) => addMonths(today, i)); // Generates next 12 months

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">

      {months.map((month, index) => (
        <div
          key={index}
          className={`transition-all duration-300 p-4 rounded-lg shadow-lg bg-gray-100 border-2 border-transparent 
            ${index === 0 ? "border-blue-500" : ""} 
            hover:scale-110 hover:shadow-2xl`}
        >
          <h2 className="text-center font-semibold text-lg mb-2">
            {format(month, "MMMM yyyy")}
          </h2>
          <Calendar
            value={month}
            tileClassName={({ date }) => {
              const formattedDate = format(date, "yyyy-MM-dd");
              let classNames = "text-center font-medium p-2 rounded-lg";

              if (isToday(date)) classNames += " border-2 border-blue-500";
              if (bookedDates.includes(formattedDate)) classNames += " bg-red-300 text-red-700";
              if (freeDates.includes(formattedDate)) classNames += " bg-green-300 text-green-700";

              return classNames;
            }}
            showNavigation={false}
          />
        </div>
      ))}
    </div>
  );
};

export default BookingVendor;
