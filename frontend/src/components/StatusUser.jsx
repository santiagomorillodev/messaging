export function StatusUser ({name, time, avatar})  {
  return (
    <div className='flex gap-4'>
        <img src={avatar} alt="" width='45px' className='rounded-full min-w-[60px] h-[60px] object-cover'/>
        <div>
            <p>Juan Pérez</p>
            <p>08:15 am</p>
        </div>
    </div>
  )
}
