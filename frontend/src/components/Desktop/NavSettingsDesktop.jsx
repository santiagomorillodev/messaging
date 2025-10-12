import React from 'react'

export default function NavSettingsDesktop() {
  return (
    <ul className=' bg-neutral-900 flex justify-start border-b border-neutral-700 pb-2 mb-2'>
        <li className='relative group/dropdown flex flex-col items-end'>
        <label className='flex justify-end w-full'>
        <i className="bx bx-dots-vertical-rounded text-3xl cursor-pointer"></i>
        <input type="checkbox" className='hidden'/>
        </label>
        <ul className='absolute left-0 bottom-[calc(100%+11px)] opacity-0 pointer-events-none group-has-checked/dropdown:opacity-100 group-has-checked/dropdown:pointer-events-auto bg-white dark:bg-[#5a5a5a46] rounded-2xl w-44 p-4 shadow-2xl flex flex-col gap-3 transition-all duration-300'>
        <li className='flex items-center gap-2 cursor-pointer text-black dark:text-white' onClick={() => navigate('/login')}><i className='bx bx-run'></i><span>Log out</span></li>
        <li className='flex items-center gap-2 cursor-pointer text-black dark:text-white' onClick={() => navigate('/settings')}><i className='bx bx-lock'></i><span>Settings</span></li>
        <li className='flex items-center gap-2 cursor-pointer text-black dark:text-white'><i className='bx bx-moon'></i><span>Dark mode</span></li>
        </ul>
    </li>
    </ul>
  )
}
