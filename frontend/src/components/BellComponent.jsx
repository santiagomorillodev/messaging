export const BellComponent = ({content, avatar}) => {
  return (
    <div className='flex gap-3 items-center border-b-2 border-gray-200 p-4'>
        <img src={avatar} alt="" width='60px' className='rounded-full min-w-[60px] h-[60px] object-cover'/>
        <p className='text-ms'>{content}</p>
    </div>
  )
}
