export const ChatSummary = ({name, content, time, avatar}) => {
  return (
    <div className='w-full flex items-center gap-2 bg-white dark:bg-neutral-900 md:dark:bg-neutral-800 dark:text-white px-4 py-2'>
            <img src={avatar} alt="user avatar" width='50px' className='rounded-full min-w-[50px] h-[50px] object-cover'/>
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
