'use client'
import Header from "@/components/Header"
import { useUser } from "@/contexts/UserContext"
import { ContainerApp } from "@/styles/global"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import * as F from '../../../styles/friend/FriendStyle'
import FriendMessages from "@/components/friendMessages/FriendMessages"

type ChatProps = {
    id: string
}

export default function Friend({params}: {params: ChatProps} ) {
    const userCtx = useUser();
    const router = useRouter();

    
    useEffect(()=>{
        if(!userCtx?.user){
          router.push('/')
        }
    },[userCtx])
      
    return (
        <ContainerApp>
        <Header 
            name={userCtx?.user?.name as string} 
            photo={userCtx?.user?.photo as string} 
            sair={userCtx?.logout as () => void} 
        />

        <F.Container>
            <F.Wrapper>
               <FriendMessages id={params.id}/>
            </F.Wrapper>
        </F.Container>

        </ContainerApp>
    )

}
