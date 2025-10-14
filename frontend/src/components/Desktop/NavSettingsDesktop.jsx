import React, { useState } from 'react';
import Likes from '../../pages/Likes';
import UpdatePassword from '../../pages/UpdatePassword';
import UpdateEmail from '../../pages/UpdateEmail';
import { motion, AnimatePresence } from 'framer-motion';

export default function NavSettingsDesktop() {
  const [activePanel, setActivePanel] = useState(null);

  const togglePanel = (panel) => {
    setActivePanel(activePanel === panel ? null : panel);
  };

  return (
    <div className='relative '>
      <ul className='bg-neutral-900 flex justify-start border-b border-neutral-700 pb-2 mb-2'>
        <li className='relative group/dropdown flex flex-col items-end'>
          <label className='flex justify-end w-full'>
            <i className="bx bx-dots-vertical-rounded text-3xl cursor-pointer hover:text-blue-500 transition-colors"></i>
            <input type="checkbox" className='hidden' />
          </label>

          <ul className='min-h-56 w-52 text-lg absolute left-0 bottom-[calc(100%+11px)] opacity-0 pointer-events-none group-has-checked/dropdown:opacity-100 group-has-checked/dropdown:pointer-events-auto bg-white dark:bg-[#1f1e1ee3] rounded-2xl p-4 shadow-2xl flex flex-col gap-3 transition-all duration-300 border border-neutral-300 dark:border-neutral-700'>
            <li onClick={() => togglePanel('logout')} className='item-settings-desktop'><i className='bx bx-run'></i><span>Log out</span></li>
            <li onClick={() => togglePanel('password')} className='item-settings-desktop'><i class='bx  bx-key'></i>  <span>password</span></li>
            <li onClick={() => togglePanel('email')} className='item-settings-desktop'><i class='bx  bx-at'  ></i> <span>Email</span></li>
            <li onClick={() => togglePanel('likes')} className='item-settings-desktop'><i className='bx bx-heart'></i><span>Likes</span></li>
          </ul>
        </li>
      </ul>

      {/* Panel de logout */}
      <AnimatePresence>
        {activePanel === 'logout' && (
          <motion.div
            key="logout-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='absolute bottom-14 left-56 mt-2 bg-[#1f1e1ee3] rounded-lg shadow-lg w-96 min-h-52 overflow-y-auto border border-neutral-700'
          >
            <div className='min-h-36 w-full flex flex-col items-center p-8 text-center'>
              <p className='text-lg font-semibold text-white mb-4'>Are you sure you want to log out?</p>
              <button className='mt-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold transition-colors'>Log Out</button>
              <p className='mt-4 text-sm text-gray-400'>This action cannot be undone.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Panel de likes */}
      <AnimatePresence>
        {activePanel === 'password' && (
          <motion.div
            key="password-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='absolute bottom-full left-56 mt-2 bg-[#1f1e1ee3] rounded-lg shadow-lg w-96 min-h-52 overflow-y-auto border border-neutral-700 p-4'
          >
            <UpdatePassword />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePanel === 'email' && (
          <motion.div
            key="email-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='absolute bottom-full left-56 mt-2 bg-[#1f1e1ee3] rounded-lg shadow-lg w-96 min-h-52 overflow-y-auto border border-neutral-700 p-4'
          >
            <UpdateEmail />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activePanel === 'likes' && (
          <motion.div
            key="likes-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className='absolute bottom-full left-56 mt-2 bg-[#1f1e1ee3] rounded-lg shadow-lg w-96 min-h-52 overflow-y-auto border border-neutral-700 p-4'
          >
            <Likes />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
