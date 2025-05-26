import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner } from "../../../Componants/Spinner/Spinner";
import "./Payment.css";

const stripePromise = loadStripe(
  "pk_test_51RSckXFJsmypUYbAc6oWPX53FJP60zmLOVe7JX2nzpSJszf4JzNlMUjLKhYeO3YeES3WJVFrtFuLLDyaWYhUQ8SU00pBESH7Hw"
);

const PaymentPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

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

  const handleCheckout = async () => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const userId = auth?.userId;

    if (!userId) return alert("Du måste vara inloggad.");
    if (!form.firstName || !form.lastName || !form.phoneNumber)
      return alert("Fyll i alla fält.");

    const amount = event?.price ?? 3.0;

    try {
      setLoading(true);

      const stripe = await stripePromise;

      const response = await fetch(
        "https://paymentprovider-evevaxcdc4faakae.swedencentral-01.azurewebsites.net/api/Payment/create-checkout-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventId,
            userId,
            amount,
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
      // Ingen setLoading(false) här – man lämnar sidan vid redirect
    } catch (err) {
      setLoading(false);
      console.error("Stripe error:", err);
      alert("Fel vid betalning.");
    }
  };

  if (!event)
    return (
      <p>
        <Spinner />
      </p>
    );

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

        {loading ? (
          <Spinner />
        ) : (
          <button className="button button-primary" onClick={handleCheckout}>
            Gå till betalning
          </button>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
