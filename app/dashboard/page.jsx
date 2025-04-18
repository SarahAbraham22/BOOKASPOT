"use client";

import React from "react";
import ReservationCard from "../../components/ReservationCard";
import HelpSection from "../../components/HelpSection";
import ChartSection from "../../components/ChartSection";
import Navbar from "../../components/Navbar_vendor";

export default function Dashboard() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Full-width Navbar at top */}
      <Navbar />

      {/* Main content centered and spaced below navbar */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h1 className="text-3xl text-black font-bold">Welcome to BOOKaSPOT!</h1>

        <section className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <ReservationCard title="Todays Bookings" count={0} />
          <ReservationCard title="Pending Requests" count={2} />
          <ReservationCard title="Monthly Bookings" count={5} />
          <ReservationCard title="Upcoming" count={3} />
        </section>

        <div className="mt-10">
          <ChartSection />
        </div>

        <HelpSection />

        
        <div className=" h-10"></div> 
      </div>
    </div>
  );
}
