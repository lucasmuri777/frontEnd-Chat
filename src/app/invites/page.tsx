'use client'
import Header from "@/components/Header";
import { useUser } from "@/contexts/UserContext";
import { ContainerApp } from "@/styles/global";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as I from '../../styles/invites/InvitesStyle'
import { reqUrl } from "../api/req";
import { FaPlus, FaTrash } from "react-icons/fa6";
import Invite from "@/components/invite/Invite";

type inviteType = {
  email: string;
  friends: string[];
  id: string;
  name: string;
  photo: string;
}

export default function Invites() {
    const userCtx = useUser();
    const router = useRouter();

    const [invites, setInvites] = useState<inviteType[] | []>([]);

    useEffect(()=>{
      if(!userCtx?.user){
        router.push('/')
      }
    },[userCtx])

    const getInvites = async() =>{
      try{
        let invitesGet = await fetch(`${reqUrl}/renderInvites`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${userCtx?.token}`
          },
        })
        let data = await invitesGet.json()
        if(data.status){
          setInvites(data.invites)
        }
      }catch(err){
        console.log(err)
      }
    } 

    useEffect(()=>{
      getInvites()
    },[])

    return (
    <ContainerApp>
      <Header 
        name={userCtx?.user?.name as string} 
        photo={userCtx?.user?.photo as string} 
        sair={userCtx?.logout as () => void} 
      />
    
      <I.ContainerInvites>
        <I.WrapperInvites>
          {invites.length <= 0 ?(
            <h2>Não há convites</h2>
          ):(
            <Invite invites={invites} setInvites={setInvites}/>
          )}
          
        </I.WrapperInvites>
      </I.ContainerInvites>

    </ContainerApp>
    )
}