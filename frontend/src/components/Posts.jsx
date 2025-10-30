import { useEffect, useState } from "react";

export function Posts({ name, avatar, post, description }) {
  const [typePost, setTypePost] = useState(null)
  useEffect(() => {
    if (typeof(post) === 'string' && !post.startsWith('http')) {
      setTypePost('text')
    } else {
      setTypePost('image')
    }
  }, [post])
  
  return (
    <div className="w-full max-w-[498px] overflow-hidden border border-gray-400 rounded-2xl bg-neutral-800">
      <div className="flex gap-2 items-center py-3 px-2 w-full">
        <div className="w-12 h-12 overflow-hidden"><img src={avatar} alt={`${name} avatar`} className="rounded-full w-12 h-12 object-cover border-2 border-[#9e8dda]" loading="lazy"/></div>
        <div className="">
          <p className="font-bold text-sm">{name}</p>
          <p className="text-sm">today</p>
        </div>
      </div>

      {typePost === 'text' ?
      <div className="w-full px-4"><p>{post}</p></div>:
      <div className="w-full h-[498px]"><img src={post} alt={`${name} post image`} className="w-full h-full object-cover" loading="lazy"/></div>
      }
      <div className="p-2 flex justify-between items-center">
        <p className="text-white text-sm max-w-[70%]">{description}</p>
        <button><i className='bx bx-heart text-3xl p-2'  ></i> </button>
      </div>
    </div>
  );
}