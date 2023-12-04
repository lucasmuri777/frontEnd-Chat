'use client'
import {useEffect, useState} from 'react'
import {useUser} from '../../contexts/UserContext'
import {useRouter} from 'next/navigation';
import Header from '@/components/Header';
import {ContainerApp} from '../../styles/global'
import * as H from '../../styles/Home/HomeStyle'

import { FaUserFriends } from "react-icons/fa";
import { IoChatboxEllipses } from "react-icons/io5";
import Chats from '@/components/home/Chats';

type Filter = 'chats' | 'friends' | 'all';
export default function Home() {
  const router = useRouter();

  const [filter, setFilter] = useState<Filter>('all');
    
  const userCtx = useUser();
  useEffect(()=>{
    if(!userCtx?.user){
      router.push('/')
    }
  },[userCtx])

  const handleChangeFilter = (filterSet: Filter) => {
    if(filterSet == filter){
      setFilter('all');
      return;
    }
    setFilter(filterSet);
  }

    
  return(
    <ContainerApp>
      <Header 
        name={userCtx?.user?.name as string} 
        photo={userCtx?.user?.photo as string} 
        sair={userCtx?.logout as () => void} 
      />

      <H.ContainerChats>
        <H.WrapperChats>
          <H.Filter>
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

          </H.Filter>
          <H.chats>
           <Chats active={filter}/>
          </H.chats>
        </H.WrapperChats>
      </H.ContainerChats>



        
    </ContainerApp>
  )
}


