import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearch] = useState("");
  const [showDescription, setShowDescription] = useState({});

  const handleSearch = (event) => {
    setTimeout(() => {
      setSearch(event.target.value);
    }, 500);
  };

  const toggleDescription = (bandId) => {
    setShowDescription((prev) => ({ ...prev, [bandId]: !prev[bandId] }));
  };

  useEffect(() => {
    setLoading(true);
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
    <input onChange={handleSearch} placeholder="Search bands" />
    {loading ? (
        <div className="spinner"></div>
    ) : (
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
                    {showDescription[band.id] && ([
                      <p>Categorie: {band.categories[0].name}</p>,
                      <p>City: {band.city}</p>
                      ])}
                </div>
            ))}
        </div>
    )}
</div>

);

}

export default App;
