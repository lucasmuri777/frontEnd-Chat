'use client'
import { useState, useEffect } from "react";
import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";

import {Chat} from '../../types/Chat'
import {Friend} from '../../types/Friend'
import { reqImage, reqUrl } from "@/app/api/req";
import Link from "next/link";


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
                let fet = await fetch(`${reqUrl}/home`, {
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
                            photo: friend.photo,
                            email: friend.email
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

    const handleRemoveFriend = async(email: string) => {
        if(email){
            try{
                let remove = await fetch(`${reqUrl}/remove`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        emailInvite: email
                    })
                })
                let data = await remove.json();
                console.log(data)
                if(data.inviteReject){
                    alert('Removido com sucesso')
                    setFriends(friends.filter((friend) => friend.email != email))
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
                <Link href={`/chat/${chat._id}`} > 
                        <div className="infos-wrapper">
                            <img alt="chat" src={`${reqImage}${chat.photo}.jpg?alt=media`} />
                            <div className='type-wrapper'>
                                <IoChatboxEllipses />
                                <strong>Chat</strong>
                            </div> 
                            <p>{chat.name}</p>
                        </div>
                        <p>EXIT</p>
                </Link>
            </li>
        ))}
        {show.friends.map((friend) => (
            <li key={friend._id}>
                <Link href={`/friend/${friend._id}`}>
                    <div className="infos-wrapper">
                        <img alt="chat" src={`${reqImage}${friend.photo}.jpg?alt=media`} />
                        <div className='type-wrapper'>
                            <FaUserFriends />
                            <strong>Friend</strong>
                        </div> 
                        <p>{friend.name}</p>
                    </div>
                    <p onClick={()=>handleRemoveFriend(friend.email)}>REMOVE</p>
                </Link>
                
            </li>
        ))}    
        </>
    )
}