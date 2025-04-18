"use client";
import NavBar from "../../components/NavBar";
import { useSearchParams } from "next/navigation";

export default function VenueDetails() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const capacity = searchParams.get("capacity");
  const location = searchParams.get("location");
  const cost = searchParams.get("cost");
  const contact = searchParams.get("contact");
  const gmap = searchParams.get("gmap");

  return (
    <div className="p-6">
      <NavBar />

      <h2 className="text-3xl font-bold mb-4">{name}</h2>
      <p><strong>Capacity:</strong> {capacity}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Cost:</strong> {cost}</p>
      <p><strong>Contact:</strong> {contact}</p>
      {gmap && (
        <a href={gmap} className="text-blue-500 mt-2 block" target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      )}
      <a
  href={`/venuebooking_customer?name=${encodeURIComponent(name)}`}
  className="nav-link"
>
  Book Now
</a>


    </div>
  );
}
