'use client'
import { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";

import {Chat} from '../../types/Chat'
import {Friend} from '../../types/Friend'


type ChatProps = {
    active: 'chats' | 'friends' | 'all';
}

type ShowType = {
    chats: Chat[];
    friends: Friend[];
}


export default function Chats({active}: ChatProps) {
    const [chats, setChats] = useState<Chat[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [show, setShow] = useState<ShowType>({chats, friends});
    const getUserChats = async () => {
        let token = localStorage.getItem('token');
        if(token){
            try{
                let fet = await fetch('http://localhost:4000/home', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                let data = await fet.json();
                if(data.chats && data.friends){
                    let chats: Chat[] = []
                    let friends: Friend[] = []

                    data.chats.forEach((chat: Chat) => {
                        let chatPadrao = {}
                        chatPadrao = {
                            _id: chat._id,
                            name: chat.name,
                            photo: chat.photo,
                            owner: chat.owner
                        }
                        chats.push(chatPadrao as Chat)
                    })
                    setChats(chats)

                    data.friends.forEach((friend: Friend) => {
                        let friendPadrao = {}
                        friendPadrao = {
                            _id: friend._id,
                            name: friend.name,
                            photo: friend.photo
                        }
                        friends.push(friendPadrao as Friend)
                    })
                    setFriends(friends)
                    return;
                }
                
            }catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {
        getUserChats();
    }, [])

    useEffect(() => {
        if(active == 'chats'){
            setShow({chats, friends: []})
        }else if(active == 'friends'){
            setShow({friends, chats: []})
        }else if(active == 'all'){
            setShow({chats, friends})
        }
    }, [active, chats, friends])

    return (
        <> 
        {show.chats.map((chat) => (
            <li key={chat._id}>
                <a>
                    <img alt="chat" src="http://localhost:4000/media/98121175590564sFLUBMxwDLiGxri_pnakP.jpg" />
                    <div className='type-wrapper'>
                        <IoChatboxEllipses />
                        <strong>Chat</strong>
                    </div> 
                    <p>{chat.name}</p>
                </a>
            </li>
        ))}
        {show.friends.map((friend) => (
            <li key={friend._id}>
                <a>
                    <img alt="chat" src="http://localhost:4000/media/98121175590564sFLUBMxwDLiGxri_pnakP.jpg" />
                    <div className='type-wrapper'>
                        <FaUserFriends />
                        <strong>Friend</strong>
                    </div> 
                    <p>{friend.name}</p>
                </a>
            </li>
        ))}    
        </>
    )
}