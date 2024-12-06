
import { imgPath } from '@/components/helpers/functions-general'
import { LayoutDashboard, Megaphone, Monitor, MousePointerClick, UtensilsCrossed } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const SideNavigation = ({menu}) => {
  const links =[
    {
      title:"Dashboard",
      slug: "/admin/dashboard",
      icon:<LayoutDashboard size={16} />
    },
    {
      title:"Blogs",
      slug: "/admin/blogs",
      icon:<Monitor size={16}/>
    },
   
  ]
  return (
    <>
     <aside className='p-4 border-r border-line'>
            <img src={`${imgPath}/jollibee-logo.webp`} alt="" className='w-[80%] mx-auto mt-2' />
        <nav>
          <ul className='mt-10'>
            {links.map((item,key)=>(
            <li className={`${menu === item.slug.replaceAll("/admin/" , "") ? "border-accent bg-accent  text-white opacity-100": ""} p-2 py-2 mb-2 rounded-md border border-transparent opacity-60 hover:opacity-100`}key ={key}><NavLink to={`${item.slug}`} className="flex gap-2 items-center">{item.icon}{item.title}</NavLink></li>  
            ))}
            
           
          </ul>
        </nav>
        </aside>
    </>
  )
}

export default SideNavigation