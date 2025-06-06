import React, { useEffect, useState } from "react";
import "./Financials.css";

const Financials = () => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState(null);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const roleData = JSON.parse(localStorage.getItem("role"));
  const userId = auth?.userId;
  const isAdmin =
    Array.isArray(roleData?.role) && roleData.role.includes("admin");

  useEffect(() => {
    if (!userId) {
      setError("Ingen användare är inloggad.");
      return;
    }

    const apiUrl = `https://paymentprovider-evevaxcdc4faakae.swedencentral-01.azurewebsites.net/api/payment/GetPayments?userId=${userId}&isAdmin=${isAdmin}`;
    console.log("GET:", apiUrl);

    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Något gick fel vid hämtning.");
        return res.json();
      })
      .then((data) => {
        setPayments(data);
        console.log("Payments:", data);
      })
      .catch((err) => {
        console.error("Fel vid hämtning av betalningar", err);
        setError("Kunde inte hämta betalningshistorik.");
      });
  }, [userId, isAdmin]);

  return (
    <div className="financials-container">
      <h1>Betalningsöversikt</h1>

      {error && <p className="error-text">{error}</p>}

      {payments.length === 0 ? (
        <p>Inga registrerade betalningar.</p>
      ) : (
        <table className="financials-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Datum</th>
              <th>Belopp</th>
              <th>Status</th>
              <th>Ticket Namn</th>
              <th>Namn</th>
              <th>Telefon</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <React.Fragment key={p.paymentId}>
                {/* Bokaren */}
                <tr className="payment-row">
                  <td>{p.eventId}</td>
                  <td>{p.bookingDate.split("T")[0]}</td>
                  <td>{p.amount} kr</td>
                  <td className={p.isPaid ? "paid-status" : "unpaid-status"}>
                    {p.isPaid ? "Betald" : "Ej betald"}
                  </td>

                  {p.tickets?.length > 0 &&
                    p.tickets.map((ticket, index) => (
                      <td
                        key={`${p.paymentId}-ticket-${index}`}
                        className="ticket-row"
                      >
                        {ticket.firstName} {ticket.lastName}
                      </td>
                    ))}

                  <td>
                    {p.bookedBy?.firstName} {p.bookedBy?.lastName}
                  </td>
                  <td>{p.bookedBy?.phoneNumber}</td>
                </tr>

                {/* Biljetter */}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Financials;
