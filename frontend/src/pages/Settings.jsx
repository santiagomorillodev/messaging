import { useNavigate } from "react-router-dom";
import { ToggleSwitch } from "../components/ToggleSwitch"

export const Settings = () => {
    const navigate = useNavigate();
return (
    <>
    <div className="h-dvh bg-gray-200 dark:bg-neutral-800 shadow-2xl">

            <header>
                    <ul className="flex justify-between pt-3 px-4 text-lg bg-white dark:bg-neutral-900">
                            <li><i className='bx  bx-chevron-left text-blue-400 text-4xl cursor-pointer' onClick={() => navigate(-1)}></i> </li>
                            <li><p className="font-bold">Message settings</p></li>
                            <li><p className="font-bold text-blue-400 cursor-pointer">Done</p></li>
                    </ul>
            </header>
            <p className="text-xl text-gray-500 font-bold p-2">Settings</p>

            <section className="pl-4 py-3 bg-white dark:bg-neutral-900 flex flex-col gap-4">
                    <div className="flex flex-col gap-2  border-b-1 border-neutral-600 ">
                            <div className="flex justify-between pr-4">
                                    <h2 className="text-xl font-bold">Recibe message for anyone</h2>
                                    <ToggleSwitch/>
                            </div>

                            <p className="text-sm text-gray-400">You will be abel to recibe direct message request from anyone on this app. Even if you don't follow them</p>
                            <p className="text-blue-400 text-sm">Learn more</p>
                    </div>
                    
                    <div className="flex flex-col gap-2  border-b-1 border-neutral-600 ">
                <div className="flex justify-between pr-4">
                    <h2 className="text-xl font-bold">Quality filter</h2>
                    <ToggleSwitch/>
                </div>

                <p className="text-sm text-gray-400">Filters lower-quality messages from your direct message request <span className="text-blue-400">Learn more</span></p>
            </div>

            <div className="flex flex-col gap-2 border-b-1 border-neutral-600 ">
                <div className="flex justify-between pr-4">
                    <h2 className="text-xl font-bold">Show read receipts</h2>
                    <ToggleSwitch/>
                </div>

                <p className="text-sm text-gray-400">When someone sends you a message, people in the conversation will know when you've seen it. if you turn off this setting, you won't be able to see read receipts from others <span className="text-blue-400">Learn more</span></p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between pr-4">
                    <h2 className="text-xl font-bold">Change email</h2>
                </div>
                <p className="text-sm text-gray-400">
                    Update your account email address for notifications and login. <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/update/email')}>Change email</span>
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between pr-4">
                    <h2 className="text-xl font-bold">Change password</h2>
                </div>
                <p className="text-sm text-gray-400">
                    Change your account password to keep your account secure. <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/update/password')}>Change password</span>
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex justify-between pr-4">
                    <h2 className="text-xl font-bold">Likes</h2>
                </div>
                <p className="text-sm text-gray-400">
                    In this section, you can see all the posts, photos, or statuses that the user has liked. It’s a quick way to review the content they’ve shown interest in or interacted with recently. <span className="text-blue-400 cursor-pointer" onClick={() => navigate('/likes')}>See likes</span>
                </p>
            </div>

        </section>

    </div>
    </>
)
}
