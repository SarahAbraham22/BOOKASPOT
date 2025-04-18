"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const { data: session } = useSession();
  const router = useRouter();
  const [conventionCenter, setConventionCenter] = useState("");
  const [capacity, setCapacity] = useState("");
  const [contact, setContact] = useState("");
  const [cost, setCost] = useState("");
  const [gmap, setGmap] = useState("");
  const [address, setAddress] = useState("");
  const [typeofevent, setTypeofEvent] = useState("");
  const [existingData, setExistingData] = useState(null);

  useEffect(() => {
    if (!session) return;

    const fetchUserInfo = async () => {
      const response = await fetch(`/api/userinfo`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setExistingData(data);
          setConventionCenter(data.conventionCenter || "");
          setCapacity(data.capacity || "");
          setContact(data.contact || "");
          setCost(data.cost || "");
          setGmap(data.gmap || "");
          setAddress(data.address || "");
          setTypeofEvent(data.typeofevent || "");
        }
      }
    };

    fetchUserInfo();
  }, [session]);

  const handleSubmit = async () => {
    if (!session) return alert("Please log in to submit");

    const userInfo = {
      conventionCenter,
      capacity,
      contact,
      cost,
      gmap,
      address,
      typeofevent,
    };

    const response = await fetch("/api/userinfo", {
      method: existingData ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    const data = await response.json();

    if (response.ok) {
      alert("User info saved successfully!");
      setExistingData(userInfo);
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-8 bg-zinc-300/10 flex flex-col gap-2 my-6">
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>

        {existingData && (
          <div className="p-4 bg-gray-100 rounded-md shadow-md my-4">
            <h3 className="font-bold text-lg mb-2">Existing Information</h3>
            <p><strong>Convention Center:</strong> {existingData.conventionCenter}</p>
            <p><strong>Capacity:</strong> {existingData.capacity}</p>
            <p><strong>Contact:</strong> {existingData.contact}</p>
            <p><strong>Cost:</strong> {existingData.cost}</p>
            <p><strong>Google Map:</strong> {existingData.gmap}</p>
            <p><strong>Address:</strong> {existingData.address}</p>
            <p><strong>Type of Event:</strong> {existingData.typeofevent}</p>
          </div>
        )}

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Convention Center Name"
          value={conventionCenter}
          onChange={(e) => setConventionCenter(e.target.value)}
          className="border p-2 rounded mt-2"
        />
        <input
          type="number"
          placeholder="Number of People"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="border p-2 rounded mt-2"
        />
        <input
          type="tel"
          placeholder="Contact Number"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border p-2 rounded mt-2"
        />
        <input
          type="text"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          className="border p-2 rounded mt-2"
        />
        <input
          type="text"
          placeholder="Location-google Map Link"
          value={gmap}
          onChange={(e) => setGmap(e.target.value)}
          className="border p-2 rounded mt-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="border p-2 rounded mt-2"
        />
        <input
          type="text"
          placeholder="Type of event"
          value={typeofevent}
          onChange={(e) => setTypeofEvent(e.target.value)}
          className="border p-2 rounded mt-2"
        />
        
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold px-6 py-2 mt-3"
        >
          {existingData ? "Update" : "Submit"}
        </button>

        <button
          onClick={() => router.push("/vendorbooking")} // Navigate to Vendor Booking page
          className="bg-green-500 text-white font-bold px-6 py-2 mt-3"
        >
          Vendor Booking
        </button>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
