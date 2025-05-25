import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./Payment.css"; // Återanvänd dina CSS-klasser

// Ersätt med din riktiga Stripe publishable key
const stripePromise = loadStripe(
  "pk_test_51RSckXFJsmypUYbAc6oWPX53FJP60zmLOVe7JX2nzpSJszf4JzNlMUjLKhYeO3YeES3WJVFrtFuLLDyaWYhUQ8SU00pBESH7Hw"
);

const PaymentPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  // 1. Hämta eventinfo
  useEffect(() => {
    fetch(
      `https://eventviewprovider.azurewebsites.net/api/events?id=${eventId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte hämta event");
        return res.json();
      })
      .then((data) => {
        console.log("API-svar:", data);
        const foundEvent = Array.isArray(data)
          ? data.find((e) => String(e.id) === String(eventId))
          : data;

        if (!foundEvent) {
          console.warn("Inget event hittades med id:", eventId);
        }

        setEvent(foundEvent);
      })
      .catch((err) => {
        console.error("Fel vid hämtning av event:", err);
      });
  }, [eventId]);

  // 2. Hantera betalning
  const handleCheckout = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const userId = auth?.userId;

    if (!userId) return alert("Du måste vara inloggad.");
    if (!form.firstName || !form.lastName || !form.phoneNumber)
      return alert("Fyll i alla fält.");
    const amount = event?.price ?? 3.0;

    try {
      const stripe = await stripePromise;

      const response = await fetch(
        "https://paymentprovider-evevaxcdc4faakae.swedencentral-01.azurewebsites.net/api/Payment/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            userId,
            amount, // 💰 skickar priset som decimal
            ...form,
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const { sessionId } = await response.json();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.error("Stripe error:", err);
      alert("Fel vid betalning.");
    }
  };

  // 3. Laddningsstate
  if (!event) return <p>Laddar event...</p>;

  // 4. Sidan med eventinfo + formulär
  return (
    <div className="event-list">
      <div className="event-card">
        <h2 className="event-title">{event.title}</h2>
        <p className="event-date">
          <span className="event-label">Date:</span> {event.date?.split("T")[0]}
        </p>
        <p className="event-location">
          <span className="event-label">Location:</span> {event.location}
        </p>
        <p className="event-description">
          <span className="event-label">Description:</span> {event.description}
        </p>

        {/* Formulär */}
        <input
          className="inputField"
          placeholder="Förnamn"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          className="inputField"
          placeholder="Efternamn"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          className="inputField"
          placeholder="Telefonnummer"
          value={form.phoneNumber}
          onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
        />

        <button className="button button-primary" onClick={handleCheckout}>
          Gå till betalning
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
