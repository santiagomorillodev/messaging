import NavSettings from './NavSettings';

export default function Header({sectionName}) {
  return (
    <header>
        <ul className="flex justify-between px-4 py-2  bg-gray-200">
        <li className='font-bold text-xl text-black'>
            <p className='font-bold md:text-lg'>{sectionName}</p>
        </li>
        <li><p className="p-2"></p></li>
        <li>
            <NavSettings/>
        </li>
        </ul>
    </header>
  )
}