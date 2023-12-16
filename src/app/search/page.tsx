'use client'
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import { ContainerApp } from "@/styles/global";
import { useUser } from "../../contexts/UserContext";

import * as S from "../../styles/search/SearchStyles";
import { IoIosSearch } from "react-icons/io";
import { IoPersonAdd } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaUserCheck } from "react-icons/fa";
import { FaHouseCircleCheck } from "react-icons/fa6";


import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";

import { reqUrl } from "../api/req";
import Result from "@/components/search/Result";
import {useRouter} from "next/navigation";


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

type results = {
    chats: Chat[] | [];
    friends: Friend[] | [];
}
type Filter = 'chats' | 'friends' | 'all';


export default function Search() {
    const userCtx = useUser();
    const router = useRouter();
    const [search, setSearch] = useState("");
    const [results, setResults] = useState<results | null>(null);
    const [filter, setFilter] = useState<Filter>('all');

    const handleChangeFilter = (filterSet: Filter) => {
        if(filterSet == filter){
          setFilter('all');
          return;
        }
        setFilter(filterSet);
    }
    useEffect(()=>{
      if(!userCtx?.user){
        router.push('/')
      }
    },[userCtx])


    const handleSendSearch = async(e?: React.FormEvent) => {
        if(e) e.preventDefault();
        if(search.trim() != ""){
            try{
                let searchFetch = await fetch(`${reqUrl}/search`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userCtx?.token}`
                    },
                    body: JSON.stringify({
                        search: search
                    })
                } )
                let data = await searchFetch.json();
                if(data.status){
                    setResults(data.search);
                }
            }catch(err){
                console.log(err);
            }
        }
        if(search.trim() == ""){
            setResults(null);
        }
    }
    useEffect(()=>{
        handleSendSearch();
    },[search])

    return (
        <ContainerApp>
            <Header 
                name={userCtx?.user?.name as string} 
                photo={userCtx?.user?.photo as string} 
                sair={userCtx?.logout as () => void} 
            />
            <S.ContainerSearch>
                <S.SearchWrapper>
                    <S.Form onSubmit={handleSendSearch}>
                        <input 
                            type="search" 
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button title="Search" type="submit"><IoIosSearch/></button>
                    </S.Form>

                    <S.Filter>
                        <div 
                            className={`type-wrapper ${filter == 'chats' ? 'active' : ''}`} 
                            onClick={() => handleChangeFilter('chats')}
                        >   
                            <IoChatboxEllipses />
                            <strong>Chat</strong>   
                        </div> 
                        <div 
                            className={`type-wrapper ${filter == 'friends' ? 'active' : ''}`}
                            onClick={() => handleChangeFilter('friends')}
                        >
                            <FaUserFriends />
                            <strong>Friend</strong>
                        </div>  

                    </S.Filter>

                    <S.SearchResults>
                        <Result results={results} filter={filter} setSearch={setSearch}/>  
                    </S.SearchResults>
                </S.SearchWrapper> 
            </S.ContainerSearch>
        </ContainerApp>
    )
}
