export const ChatSummary = ({name, content, time, avatar}) => {
  return (
    <div className='w-full border-b border-gray-200 flex items-center gap-2 bg-white px-4 py-2'>
            <img src={avatar} alt="user avatar" width='55px' className='rounded-full min-w-[55px] h-[55px] object-cover'/>
        <div className='w-full p-1 overflow-hidden'>
            <div className="w-full flex justify-between">
                <span className='font-bold'>{name}</span>
                <span className="text-end">{time}</span>
            </div>
            <p className='truncate'>{content}</p>
        </div>
    </div>
  )
}
