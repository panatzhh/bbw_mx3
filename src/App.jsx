import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Variabeln für das loading und die bands
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearch] = useState("");
  const [showDescription, setShowDescription] = useState({});

  // Such funktion
  const handleSearch = (event) => {
    setTimeout(() => {
      setSearch(event.target.value);
    }, 500);
  };

  // Function für den toggle button, um die Details anzuzeigen
  const toggleDescription = (bandId) => {
    setShowDescription((prev) => ({ ...prev, [bandId]: !prev[bandId] }));
  };

  useEffect(() => {
    setLoading(true);
    // Fetch bands daten wenn eine neue eingabe im Suchfeld geschreiben wird.
    fetch(`https://api.srgssr.ch/mx3/v2/bands?query=${searchTerm}`, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: "Bearer D7ZVWZQmzFMKmYjPNX0J2oflZI02",
      },
    })
      .then((r) => r.json())
      .then((data) => {
        setBands(data.response.bands);
        setLoading(false);
      });
  }, [searchTerm]);

  return (
    <div className="centered-container">
      <h1>SRF BANDS</h1>
      {/*Wenn etwas im Input feld geschrieben wird, so kommt ein spinner, bis die daten gefetcht wurden, dann wird im useeffect der setLoading auf false gesetzt und die Bands werden angezeigt, der spinner aber nicht mehr*/}
      <input onChange={handleSearch} placeholder="Search bands" />
      {loading ? (
        <div className="spinner"></div>
      ) : (
        /*Jede Band die gefetcht wurde wird in einer Card angezeigt, welche aus Bandname und Bild besteht. Wird der Button geclickt, so wird die funktion toggleDescription ausgeführt und es zeigt die Category und die stadt an*/
        <div className="band-cards">
          {bands.map((band) => (
            <div key={band.id} className="band-card">
              <img src={band.image} alt={band.name} />
              <p>{band.name}</p>
              <button
                className="button-toggle"
                onClick={() => toggleDescription(band.id)}
              >
                Detail
              </button>
              {showDescription[band.id] && (
                <>
                  <p>Categorie: {band.categories[0].name}</p>
                  <p>City: {band.city}</p>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
