"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isToday, getMonth } from "date-fns";
import "./booking.css";

const CustomerBookingCalendar = () => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + i, 1);
  });

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookedDates(data.bookings || []);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  const bookDate = async (date) => {
    const formatted = format(date, "yyyy-MM-dd");  // Format the date as 'YYYY-MM-DD'
    console.log("Booking for date:", formatted); // Log the formatted date
  
    const existing = bookedDates.find((b) => b.date === formatted);
  
    if (existing) return alert("This date is already booked or pending");
  
    const res = await fetch("/api/bookings/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: formatted }),  // Send as 'YYYY-MM-DD'
    });
  
    const data = await res.json();
    if (res.ok) {
      alert("Booking request sent for " + formatted);
      setBookedDates((prev) => [...prev, { date: formatted, status: "pending" }]);
    }
  };
  
  

  const getStatus = (date) => {
    const formatted = format(date, "yyyy-MM-dd");
    return bookedDates.find((b) => b.date === formatted)?.status || "free";
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 p-6">
      {months.map((month, index) => (
        <div
          key={index}
          className="calendar-container p-4 rounded-lg shadow-lg hover:scale-105 transition-all"
        >
          <div className="flex justify-between mb-2">
            <h2 className="text-black font-semibold">
              {format(month, "MMMM yyyy")}
            </h2>
            <button
              className="bg-green-600 text-white px-3 py-1 rounded"
              onClick={() => setSelectedMonth(month)}
            >
              Book
            </button>
          </div>

          <Calendar
            defaultActiveStartDate={month}
            tileClassName={({ date }) => {
              const status = getStatus(date);
              let classes = isToday(date) ? "current-day " : "";
              if (status === "accepted") classes += "booked-date";
              else if (status === "pending") classes += "pending-date";
              else classes += "free-date";
              return classes.trim();
            }}
            tileDisabled={({ date }) => getMonth(date) !== getMonth(month)}
            showNavigation={false}
          />
        </div>
      ))}

      {selectedMonth && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[350px]">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-lg">
                Book Date in {format(selectedMonth, "MMMM yyyy")}
              </h2>
              <button onClick={() => setSelectedMonth(null)}>Close</button>
            </div>
            <Calendar
              defaultActiveStartDate={selectedMonth}
              onClickDay={bookDate}
              tileDisabled={({ date }) =>
                getStatus(date) !== "free" || getMonth(date) !== getMonth(selectedMonth)
              }
              tileClassName={({ date }) => {
                const status = getStatus(date);
                if (status === "accepted") return "booked-date";
                if (status === "pending") return "pending-date";
                return "free-date";
              }}
              showNavigation={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerBookingCalendar;
