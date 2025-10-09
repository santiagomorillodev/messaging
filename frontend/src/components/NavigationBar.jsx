import React from 'react'

export function NavigationBar ()  {
  return (
    <nav>
        <ul className='flex justify-between py-3 px-10 fixed bottom-0 left-0 w-full bg-white dark:bg-neutral-900 dark:text-white z-50'>
            <li><i className='bx  bx-home  text-3xl'></i> </li>
            <li><i className='bx  bx-search  text-3xl'></i> </li>
            <li><i className='bx  bx-bell text-3xl'></i> </li>
            <li><i className='bx bx-envelope text-3xl'></i> </li>
        </ul>
    </nav>
  )
}
