import { ChatSummary } from "../components/ChatSummary";
import { NavigationBar } from "../components/NavigationBar";
import photo from '../assets/photo.jpg'
import photo2 from '../assets/photo2.jpg'
import photo3 from '../assets/photo3.jpg'
import NavSettingsDesktop from "../components/Desktop/NavSettingsDesktop";
import ProfileDesktop from "../components/Desktop/ProfileDesktop";
import { Chat } from "./Chat";
import { Outlet } from "react-router-dom";
import { Inbox } from "./Inbox";

export default function Desktop() {
  return (
    <div className="h-screen w-full flex flex-col">

      <header className="bg-neutral-900 p-4 h-12 flex items-center shrink-0">
        <h2 className="text-white font-bold">Desktop</h2>
      </header>

      <main className="flex  w-full flex-1 overflow-hidden bg-neutral-800">

        <section className="flex flex-col bg-neutral-900 w-15">
          <NavigationBar />
          <div className="flex flex-col items-center justify-end flex-1 p-3">
            <NavSettingsDesktop/>
            <ProfileDesktop photo={photo}/>
          </div>
        </section>
        <Outlet/>
        <Chat/>
      </main>
    </div>
  )
}
