import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../components/NavigationBar";

export default function UpdatePassword() {
    const navigate = useNavigate()
  return (
    <>
      <nav>
        <ul className="flex justify-between items-center border-b border-neutral-600">
          <li className="flex items-center gap-2 md:invisible"><button onClick={()=> navigate(-1)}><i className="bx  bx-chevron-left text-blue-400 text-4xl cursor-pointer"></i></button></li>
          <li><p className="font-bold text-xl">Update password</p></li>
            <li><p className="p-2"></p></li>
        </ul>
      </nav>

      <main className="px-4">
        <form action="">
            <div className="flex flex-col gap-4 max-w-md mx-auto mt-8">
                <label className="flex flex-col ">
                    <span className="mb-1 font-medium">Current Password</span>
                    <input
                        type="password"
                        name="currentPassword"
                        className="border border-neutral-600 rounded px-3 py-2"
                        required
                        autoComplete="current-password"
                    />
                </label>
                <label className="flex flex-col ">
                    <span className="mb-1 font-medium">New Password</span>
                    <input
                        type="password"
                        name="newPassword"
                        className="border border-neutral-600 rounded px-3 py-2"
                        required
                        autoComplete="new-password"
                    />
                </label>
                <label className="flex flex-col ">
                    <span className="mb-1 font-medium">Repeat New Password</span>
                    <input
                        type="password"
                        name="repeatNewPassword"
                        className="border border-neutral-600 rounded px-3 py-2"
                        required
                        autoComplete="new-password"
                    />
                </label>
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 mt-4"
                >
                    Update Password
                </button>
            </div>
        </form>

        <div className="max-w-md mx-auto mt-8 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded">
            <p className="text-yellow-800 font-medium">
                Recuerda tu nueva contraseña. Es importante guardarla en un lugar seguro para evitar problemas de acceso en el futuro.
            </p>
        </div>
      </main>

      <div className="md:hidden">
        <NavigationBar />
      </div>
    </>
  )
}
