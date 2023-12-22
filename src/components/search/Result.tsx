'use client'
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";

import * as S from "../../styles/search/SearchStyles";
import { IoIosSearch } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaHouseCircleCheck } from "react-icons/fa6";


import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";

import { reqImage, reqUrl } from "../../app/api/req";
import FormChat from "./FormChat";


type Chat = {
    id: string;
    members: string[];
    name: string;
    photo: string;
}
type Friend = {
    id: string;
    name: string;
    email: string;
    photo: string;
    friends: string[];
}

type Results = {
    chats: Chat[] | [];
    friends: Friend[] | [];
}

type PropsType = {
    filter: 'chats' | 'friends' | 'all';
    results: Results | null;
    setSearch: React.Dispatch<React.SetStateAction<string>>
}


export default function Result({filter, results, setSearch}: PropsType) {
    const userCtx = useUser();
    const [show, setShow] = useState<Results | null>(results);

    const [chat, setChat] = useState('')
    const [idChat, setIdChat] = useState('')
    const [showFormChat, setShowFormChat] = useState(false)

    const changeFilter = (chats: Chat[], friends: Friend[]) => {
        if(chats && friends){
            if(filter == 'chats'){
                setShow({chats, friends: []});
            }
            if(filter == 'friends'){
                setShow({chats: [], friends});
            }
            if(filter == 'all'){
                setShow(results);
            }
        }
    }

    const handleSendInvite = async(email: string) => {
        try{
            let invite = await fetch(`${reqUrl}/sendInvite`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userCtx?.token}`
                },
                body: JSON.stringify({
                    emailInvite: email
                })
            })
            let data = await invite.json();
            setSearch('');
            if(!data.status){
                alert('Pedido de amizade já enviado');

            }
        }catch(error){
            console.log(error);
            return;
        }
    }

    const handleOpenForm = (id: string, name: string) => {
        setShowFormChat(true);
        setIdChat(id);
        setChat(name);
    }


    useEffect(() => {
        if(results){
            changeFilter(results.chats, results.friends);
        }

        if(results == null){
            setShow({chats: [], friends: []});
        }
        
    }, [filter, results])    

    return (
        <>
            {show?.friends.map((friend) => (
                <>
                    {friend.email != userCtx?.user?.email && (
                        <S.Results key={friend.id}>
                            <S.ContainerPhotoInfos>
                                <div className="image-wrapper">
                                    <img src={`${reqImage}${friend.photo}.jpg?alt=media`} alt={friend.name}/>
                                </div>
                                <div className="infos-wrapper">
                                    <p>
                                        {friend.name}
                                    </p>
                                        <span>{friend.email}</span>
                                    </div>
                            </S.ContainerPhotoInfos>
                                <div className="invite-wrapper">
                                    <button type="button" title="Invite">
                                        {friend.friends.indexOf(userCtx?.user?.email as string) == -1 ? 
                                            <a onClick={()=>handleSendInvite(friend.email)}>
                                                <IoPersonAdd/> 
                                            </a>
                                            : 
                                            <FaUserCheck/>
                                        }
                                    </button>
                                </div>
                        </S.Results>   
                    )} 
                </>
            ))}
        

            {show?.chats.map((chat) => (
                <S.Results key={chat.id}>
                    <S.ContainerPhotoInfos>
                        <div className="image-wrapper">
                            <img src={`${reqImage}${chat.photo}.jpg?alt=media`} alt={chat.name}/>
                        </div>
                        <div className="infos-wrapper">
                            <p>
                                {chat.name}
                            </p>
                        </div>
                    </S.ContainerPhotoInfos>
                        <div className="invite-wrapper">
                            <button type="button" title="Invite">
                                {chat.members.indexOf(userCtx?.user?.email as string) == -1 ? 
                                    <FaPlus onClick={()=>handleOpenForm(chat.id, chat.name)}/> 
                                    : 
                                    <FaHouseCircleCheck/>
                                }
                            </button>
                            </div>
                </S.Results>
            ))}
            {showFormChat && (
                <FormChat id={idChat} name={chat} setShowFormChat={setShowFormChat} showFormChat={showFormChat}/>
            )}
            
        </>
    )
}
