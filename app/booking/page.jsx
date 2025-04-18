"use client";

import React, { useState } from "react";
import BookingCalendar from "./BookingCalendar";
import Navbar from "../../components/Navbar_vendor";
import "./booking.css";

const BookingPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Full-width Navbar at top */}
      <Navbar />
    <div className="booking-container">
      <h1 className="text-3xl text-black font-bold text-center my-6">Book Your Spot</h1>
      <BookingCalendar />
    </div>
    </div>
  );
};

export default BookingPage;
