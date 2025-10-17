import { useNavigate } from "react-router-dom"
import  {useIsDesktop}  from "../hooks/useIsDesktop"
import { useDesktopView } from "../context/DesktopViewContext"

export const ChatSummary = ({id, name, content, time, photo}) => {
  const navigate = useNavigate()
  const isDesktop = useIsDesktop()
  let changeView = () => {};
  try {
    ({ changeView } = useDesktopView());
  } catch {
    // Si falla el contexto, dejamos changeView como función vacía para evitar errores.
  }
  const handleClick = () => {
    if (isDesktop) {
      // 🖥 En escritorio: cambia el contenedor dinámico
      changeView("chat", { id, name, photo });
    } else {
      // 📱 En móvil: pasa la info a través del estado de la ruta
      navigate("/direct", { state: { id, name, photo } });
    }
  };
  return (
    <div onClick={handleClick} className='w-full flex items-center gap-2 bg-white dark:bg-neutral-900 md:dark:bg-neutral-800 dark:text-white px-4 py-2'>
            <img src={photo} alt="user photo" width='50px' className='rounded-full min-w-[50px] h-[50px] object-cover'/>
        <div className='w-full p-1 overflow-hidden'>
            <div className="w-full flex justify-between">
                <span className='font-bold text-sm'>{name}</span>
                <span className="text-end text-sm">{time}</span>
            </div>
            <p className='truncate text-neutral-400 text-sm'>{content}</p>
        </div>
    </div>
  )
}
