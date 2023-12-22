'use client'
import * as H from '../styles/HeaderStyles'
import {useState, useEffect} from 'react'

import { GoHome, GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { reqUrl, reqImage } from '@/app/api/req';
import Link from 'next/link';
import { IoNotificationsOutline, IoNotificationsSharp } from "react-icons/io5";
import { IoPersonCircleSharp } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";


import { usePathname } from 'next/navigation';




type Users = {
    name: string,
    photo: string,
    sair: ()=>void,
}
type Menu = '/home' | '/search' | '/createChat' | '' | '/invites'

export default function Header({name, photo, sair}: Users) {
    const [menu, setMenu] = useState<Menu>('')
    const [userSettings, setUserSettings] = useState(false)
    const path = usePathname();
    useEffect(()=>{
        if(userSettings){
           let interval = setInterval(()=>{
               setUserSettings(false)
               clearInterval(interval)
           }, 8000)
        }
    },[userSettings])
    useEffect(()=>{
        setMenu(path as Menu)
    })

    return( 
        <H.Header>
            <H.WrapperHeader>
                <H.Nav>
                    <ul>
                        <li className={menu == '/home' ? 'active' : ''}>    
                            <Link href='/home'>
                            {menu == '/home' &&(
                                <GoHomeFill/>
                            )}
                            {menu != '/home' &&(
                                <GoHome/>
                            )}
                                <p>Home</p>
                            </Link>
                        </li>
                        <li className={menu == '/search' ? 'active' : ''}>
                            
                            <Link href='/search'>
                                <IoIosSearch/>
                                <p>Search</p>
                            </Link>
                        </li>
                        <li className={menu == '/createChat' ? 'active' : ''}>
                            
                            <Link href='/createChat'>
                                <FaPlus/>
                                <p>Chat</p>
                            </Link>
                        </li>
                        <li className={menu == '/invites' ? 'active' : ''}>
                            
                            <Link href='/invites'>
                                {menu == '/invites' &&(
                                    <IoNotificationsSharp/>
                                )}
                                {menu != '/invites' &&(
                                    
                                    <IoNotificationsOutline/>
                                )}
                                <p>Invites</p>
                            </Link>
                        </li>
                    </ul>
                </H.Nav>

                <H.UserInfos onClick={() => setUserSettings(!userSettings)}>
                    {
                        userSettings && (
                            <H.settings>
                                <Link href='/settings'>
                                    <IoPersonCircleSharp/> 
                                    <p>Account</p>
                                </Link>
                                <a onClick={sair}>
                                    <MdExitToApp/> 
                                    <p>Exit</p>
                                </a>
                            </H.settings>
                        )
                    }
                    <div className='img-wrapper'>
                        <img src={`${reqImage}${photo}.jpg?alt=media`} alt={name} />
                    </div>
                    <h3>{name}</h3>
                </H.UserInfos>
            </H.WrapperHeader>
        </H.Header>
    )
}