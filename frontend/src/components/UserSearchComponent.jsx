import { useState } from "react";

export default function UserSearchComponent({ id, photo, name, username, onRemove, currentSearch }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(`name: ${name}, id: ${id}`);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:8000/recent/search/${id}`, {
        method: "DELETE",
        credentials: "include", // si tu backend usa cookies/sesión
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        // avisar al padre para que quite este item de la lista
        if (typeof onRemove === "function") onRemove(id);
      } else {
        const text = await res.text();
        setError(`Error del servidor: ${res.status} ${text}`);
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between items-center px-4">
      <div className="flex gap-3">
        <img src={photo} alt="" width="50px" className="rounded-full min-w-[50px] h-[50px] object-cover" />
        <div className="">
          <p>{name}</p>
          <p className="text-gray-400 text-sm">{username}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button
          className={currentSearch ? "hidden" : "py-2 px-4 bg-neutral-700 rounded-3xl font-semibold"}
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? "Eliminando..." : "Suprimir"}
        </button>
      </div>
    </div>
  );
}