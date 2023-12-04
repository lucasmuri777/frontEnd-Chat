'use client'
import * as H from '../styles/HeaderStyles'
import {useState, useEffect} from 'react'

import { GoHome, GoHomeFill } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";




type Users = {
    name: string,
    photo: string,
    sair: ()=>void,
}
type Menu = 'home' | 'search' | 'createChat'

export default function Header({name, photo, sair}: Users) {
    const [menu, setMenu] = useState<Menu>('home')
    const [userSettings, setUserSettings] = useState(false)

    const handleChangeMenu = (menuActive: string) => {
        switch(menuActive){
            case 'home':
                setMenu('home')
                break
            case 'search':
                setMenu('search')
                break
        }
    }

    useEffect(()=>{
        if(userSettings){
           let interval = setInterval(()=>{
               setUserSettings(false)
               clearInterval(interval)
           }, 8000)
        }
    },[userSettings])

    return( 
        <H.Header>
            <H.WrapperHeader>
                <H.Nav>
                    <ul>
                        <li className={menu == 'home' ? 'active' : ''}>    
                            <a href='/home' onClick={() => handleChangeMenu('search')}>
                            {menu == 'home' &&(
                                <GoHomeFill/>
                            )}
                            {menu != 'home' &&(
                                <GoHome/>
                            )}
                                Home
                            </a>
                        </li>
                        <li className={menu == 'search' ? 'active' : ''}>
                            
                            <a href='/search' onClick={() => handleChangeMenu('search')}>
                                <IoIosSearch/>
                                Search
                            </a>
                        </li>
                        <li className={menu == 'createChat' ? 'active' : ''}>
                            
                            <a href='/createChat' onClick={() => handleChangeMenu('createChat')}>
                                <FaPlus/>
                                Chat
                            </a>
                        </li>
                    </ul>
                </H.Nav>

                <H.UserInfos onClick={() => setUserSettings(!userSettings)}>
                    {
                        userSettings && (
                            <H.settings>
                                <a href='/settings'>Configurações</a>
                                <a onClick={sair}>Sair</a>
                            </H.settings>
                        )
                    }
                    <div className='img-wrapper'>
                        <img src={`${process.env.SERVER}/media/${photo}`} alt={name} />
                    </div>
                    <h3>{name}</h3>
                </H.UserInfos>
            </H.WrapperHeader>
        </H.Header>
    )
}