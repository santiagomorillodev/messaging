export function MessageContainer({ contenido, sender, status, image }) {
  return (
    <div className={sender 
      ? 'ml-auto bg-fourth text-white rounded-xl p-2 mb-2 max-w-xs flex flex-col w-[70%]' 
      : 'bg-second text-black rounded-xl p-2 mb-2 max-w-xs flex flex-col w-[70%]'}>
      {image && <img src={image} alt="message" className="rounded-md mt-2" />}
      <span>{contenido}</span>
      {sender ?( 
        <div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs">05:44</span>
          <i className={`bx ${status ? 'bx-check-circle' : 'bx-check'} text-blue-400 text-xs`}></i>
        </div>
       ):<div className="flex items-center justify-end gap-1 mt-1">
          <span className="text-xs">05:44</span>
        </div>}
    </div>
  )
}