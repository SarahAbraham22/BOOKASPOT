"use client";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isToday, getMonth } from "date-fns";
import "./booking.css";

const VendorBookingCalendar = () => {
  const months = Array.from({ length: 12 }, (_, i) => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + i, 1);
  });

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/bookings")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched bookings:", data);
        setBookings(data.bookings || []);
      })
      .catch((err) => console.error("Error fetching bookings:", err));
  }, []);

  const updateBookingStatus = async (date, status) => {
    try {
      const res = await fetch("/api/bookings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, status }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        setBookings((prev) =>
          prev.map((b) => (b.date === date ? { ...b, status } : b))
        );
      } else {
        console.error(data.error);
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const getStatus = (date) => {
    try {
      const formatted = format(date, "yyyy-MM-dd");
      return bookings.find((b) => b.date === formatted)?.status || "free";
    } catch (err) {
      console.error("Invalid date during status check:", date);
      return "free";
    }
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
              className="bg-blue-500 text-white px-3 py-1 rounded"
              onClick={() => setSelectedMonth(month)}
            >
              View
            </button>
          </div>

          <Calendar
            defaultActiveStartDate={month}
            tileClassName={({ date }) => {
              let classes = isToday(date) ? "current-day " : "";
              const status = getStatus(date);
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
                Edit {format(selectedMonth, "MMMM yyyy")}
              </h2>
              <button onClick={() => setSelectedMonth(null)}>Close</button>
            </div>
            <Calendar
              defaultActiveStartDate={selectedMonth}
              onClickDay={(date) => {
                const formatted = format(date, "yyyy-MM-dd");
                const currentStatus = getStatus(date);
                if (currentStatus === "pending") {
                  if (confirm(`Accept booking for ${formatted}?`)) {
                    updateBookingStatus(formatted, "accepted");
                  } else {
                    updateBookingStatus(formatted, "rejected");
                  }
                }
              }}
              tileClassName={({ date }) => {
                const status = getStatus(date);
                if (status === "accepted") return "booked-date";
                if (status === "pending") return "pending-date";
                return "free-date";
              }}
              tileDisabled={({ date }) =>
                getMonth(date) !== getMonth(selectedMonth)
              }
              showNavigation={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorBookingCalendar;
