import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function ModalEditProfile({ photo , name, username, pronouns, bio, gender}) {
    const [showModalEditProfile, setShowModalEditProfile] = useState(false)
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const updateData = {};

    // Valores originales del usuario (los que llegaron por props)
    const originalData = {
      name: name,
      username: username,
      pronouns: pronouns,
      description: bio,
      gender: gender,
    };

    for (const [key, value] of formData.entries()) {
      // si el valor cambió y no está vacío, lo guardamos
      if (value && value !== originalData[key]) {
        updateData[key] = value;
      }
    }


    if (Object.keys(updateData).length === 0) {
      alert("No hay cambios");
      return;
    }

    console.log("Enviando datos actualizados:", updateData);

    await fetch("http://localhost:8000/user/update", { // <-- tu endpoint real
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    console.log("Perfil actualizado:", updateData);
    // navigate('/');
  };
  return (
    <>
        <button className="py-1 px-5 bg-fourth rounded-sm cursor-pointer " onClick={() => setShowModalEditProfile(true)}>Edit profile</button>
        {showModalEditProfile && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-10">
                <div className="w-full md:w-xl h-[90%]  bg-white dark:bg-neutral-900 rounded-xl flex flex-col gap-2 overflow-y-auto scroll-hidden">
                  <ul className="flex justify-between pt-2 px-4 font-semibold text-lg">
                    <li className="px-2"></li>
                    <li onClick={() => setShowModalEditProfile(false)}><i className='bx  bx-x text-black dark:text-white text-3xl cursor-pointer'></i> </li>
                  </ul>
        
                  <form onSubmit={handleSubmit} className="p-4">
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <img src={photo} alt="" className="w-24 h-24 rounded-full object-cover mx-auto"/>
                      <button className="text-blue-400">Change profile photo</button>
                    </div>

                    <div className="flex flex-col gap-4">
                      {/* Name */}
                      <div className="m-4 px-4 py-1 border rounded-md">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 p-0 m-0">Name</label>
                        <input
                          type="text"
                          name="name"
                          defaultValue={name}
                          className="block w-full p-0 rounded-md shadow-sm text-sm outline-0"
                        />
                      </div>

                      {/* Username */}
                      <div className="m-4 px-4 py-1 border rounded-md">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-400 p-0 m-0">Username</label>
                        <input
                          type="text"
                          name="username"
                          defaultValue={username}
                          className="block w-full p-0 rounded-md shadow-sm text-sm outline-0"
                        />
                      </div>
                      {/* Pronouns */}
                      <div className="m-4 px-4 py-1 border rounded-md">
                        <label htmlFor="pronouns" className="block text-sm font-medium text-gray-400 p-0 m-0">Pronouns</label>
                        <input
                          type="text"
                          name="pronouns"
                          defaultValue={pronouns}
                          className="block w-full p-0 rounded-md shadow-sm text-sm outline-0"
                        />
                      </div>

                      {/* Description */}

                      <div className="m-4 px-4 py-1 border rounded-md">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-400 p-0 m-0">Description</label>
                        <input
                          type="text"
                          name="description"
                          defaultValue={bio}
                          className="block w-full p-0 rounded-md shadow-sm text-sm outline-0"
                        />
                      </div>

                      {/* Gender */}

                      <div className="m-4 px-4 py-1 border rounded-md">
                        <label htmlFor="gender" className="block text-sm font-medium text-gray-400 p-0 m-0">Gender</label>
                        <input
                          type="text"
                          name="gender"
                          defaultValue={bio}
                          className="block w-full p-0 rounded-md shadow-sm text-sm outline-0"
                        />
                      </div>

                    </div>

                    <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">
                      Save Changes
                    </button>
                  </form>

                </div>
              </div>
            )}
    </>
  )
}
