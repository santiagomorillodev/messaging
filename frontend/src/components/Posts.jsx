export function Posts({ name, avatar, postText, postImage }) {
  
  return (
    <div className="w-full max-w-[498px] overflow-hidden border border-gray-400 rounded-2xl bg-neutral-800">
      <div className="flex gap-2 items-center py-3 px-2 w-full">
        <div className="w-12 h-12 overflow-hidden"><img src={avatar} alt={`${name} avatar`} className="rounded-full w-12 h-12 object-cover border-2 border-[#9e8dda]" loading="lazy"/></div>
        <div className="">
          <p className="font-bold text-sm">{name}</p>
          <p className="text-sm">today</p>
        </div>
      </div>

      {postImage ?
      <div className="w-full h-[498px]"><img src={postImage} alt={`${name} post image`} className="w-full h-full object-cover" loading="lazy"/></div>: null
      }
      <div className="p-2 flex justify-between items-center">
        <p className="text-white text-lg max-w-[70%]">{postText}</p>
        <button><i className='bx bx-heart text-3xl p-2'  ></i> </button>
      </div>
    </div>
  );
}