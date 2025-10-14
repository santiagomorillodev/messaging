export default function UserSearchComponent({photo, name, username}) {
  return (
    <div className='flex justify-between items-center px-4'>
        <div className="flex gap-3">
            <img src={photo} alt="" width='50px' className='rounded-full min-w-[50px] h-[50px] object-cover'/>
            <div className="">
                <p>{name}</p>
                <p className="text-gray-400 text-sm">{username}</p>
            </div>
        </div>
        <button className='py-2 px-4 bg-neutral-700 rounded-3xl font-semibold'>Suprimir</button>
    </div>
  )
}
