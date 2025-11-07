import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserSearchComponent({ id, photo = null, name = 'Loading...', username='', onRemove, currentSearch =false, loading=false }) {
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async () => {
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
        if (typeof onRemove === "function") onRemove(id);
        setDeleting(true)
      } else {
        const text = await res.text();
        setError(`Error del servidor: ${res.status} ${text}`);
      }
    } catch (err) {
      setError(err.message || "Network error");
    }
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-between items-center px-4 py-3 animate-pulse">
  //       <div className="flex gap-3 items-center">
  //         <div className="rounded-full bg-neutral-700 w-[50px] h-[50px]" />
  //         <div className="flex flex-col gap-2">
  //           <div className="bg-neutral-700 h-4 w-36 rounded" />
  //           <div className="bg-neutral-700 h-3 w-24 rounded" />
  //         </div>
  //       </div>
  //       <div className="w-24" />
  //     </div>
  //   );
  // }

  // Render normal cuando no está cargando
  return (
    <div className="flex justify-between items-center px-4 py-2" onClick={() => navigate(`/profile`, {state: {id}})}>
      <div className="flex gap-3 items-center">
        <img
          src={photo}
          alt={name || "user"}
          width="50"
          className="rounded-full min-w-[50px] h-[50px] object-cover"
        />
        <div>
          <p>{name || "Unknown"}</p>
          <p className="text-gray-400 text-sm">{username}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {error && <span className="text-red-500 text-sm">{error}</span>}
        <button
          className={currentSearch ? "hidden" : "py-2 px-4 bg-neutral-700 rounded-3xl font-semibold"}
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "Eliminando..." : "Suprimir"}
        </button>
      </div>
    </div>
  );
}