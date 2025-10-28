export function Posts({ name, avatar, post, description }) {
  return (
    <div className="w-full max-w-[498px] overflow-hidden border border-gray-400 rounded-2xl bg-neutral-800">
      <div className="flex items-center py-3 px-2 w-full ">
        <div className="w-20 rounded-full overflow-hidden">
          <img
            src={avatar}
            alt={`${name} avatar`}
            className="rounded-full w-12 h-12 object-cover border-2 border-[#9e8dda]"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col">
          <span className="font-bold text-sm">{name}</span>
          <span className="text-sm">today</span>
        </div>
        <div className="w-full p-1 overflow-hidden" />
      </div>

      <div className="w-full h-[498px]">
        <img
          src={post}
          alt={`${name} post image`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="p-2 flex justify-between items-center">
        <p className="text-white text-sm max-w-[70%]">{description}</p>
        <button><i className='bx bx-heart text-3xl p-2'  ></i> </button>
      </div>
    </div>
  );
}