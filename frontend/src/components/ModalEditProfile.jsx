import { useState } from 'react'
import InputForm from './InputForm'

export default function ModalEditProfile({ avatar , name, username, pronouns, bio, gender}) {
    const [showModalEditProfile, setShowModalEditProfile] = useState(false)
  return (
    <>
        <button className="py-1 px-10 bg-gray-100 dark:bg-neutral-600 rounded-sm cursor-pointer " onClick={() => setShowModalEditProfile(true)}>Edit profile</button>
        {showModalEditProfile && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-10">
                <div className="w-full md:w-xl h-[90%]  bg-white dark:bg-neutral-900 rounded-xl flex flex-col gap-2 overflow-y-auto scroll-hidden">
                  <ul className="flex justify-between pt-2 px-4 font-semibold text-lg">
                    <li className="px-2"></li>
                    <li onClick={() => setShowModalEditProfile(false)}><i className='bx  bx-x text-black dark:text-white text-3xl cursor-pointer'></i> </li>
                  </ul>
        
                  <form action="submit" className="p-4">
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <img src={avatar} alt="" className="w-24 h-24 rounded-full object-cover mx-auto"/>
                      <button className="text-blue-400">Change profile photo</button>
                    </div>
                    <div className="flex flex-col gap-4">
                      <InputForm labelComponent="{Name}" typeComponent="text" valueComponent={name}/>
                      <InputForm labelComponent="{Username}" typeComponent="text" valueComponent={username}/>
                      <InputForm labelComponent="{Pronouns}" typeComponent="text" valueComponent={pronouns}/>
                      <InputForm labelComponent="{Bio}" typeComponent="text" valueComponent={bio}/>
                      <InputForm labelComponent="{Gender}" typeComponent="text" valueComponent={gender}/>

                    </div>
                    <button type="submit" className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md">Save Changes</button>
                  </form>
                </div>
              </div>
            )}
    </>
  )
}
