import { useEffect, useState } from "react";
 
export default function CallFunction({ searchQuery }) {
  const [bands, setBands] = useState(undefined);
 
  useEffect(() => {
    fetch("/mock/search_pi.json", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer mwrLxbgDbOpKP7GFzg8VARNobsVT"
      }
    })
      .then((r) => r.json())
      .then((json) => setBands(json.response.bands))
      .catch((error) => console.error("Error fetching data:", error));
  }, [searchQuery]);
 
  return <pre>{JSON.stringify(bands, null, 2)}</pre>;
}