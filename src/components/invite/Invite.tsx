'use client'
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as I from '../../styles/invites/InvitesStyle'
import { reqUrl } from "../../app/api/req";
import { FaPlus, FaTrash } from "react-icons/fa6";

type inviteType = {
    email: string;
    friends: string[];
    id: string;
    name: string;
    photo: string;
}
type PropsType = {
    invites: inviteType[]
    setInvites: React.Dispatch<React.SetStateAction<inviteType[]>>
}


export default function Invite({invites, setInvites}: PropsType) {
    const userCtx = useUser();
    const router = useRouter();
    
    const handleAccept = async(email: string) =>{
        try{
            let accepted = await fetch(`${reqUrl}/inviteAccept`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userCtx?.token}`
                },
                body: JSON.stringify({
                    emailInvite: email
                })
            })
            let data = await accepted.json()
            if(data.inviteAccept){
                setInvites(invites.filter(invite => invite.email !== email))
            }
        }catch(err){
            console.log(err)
        }
    }

    const handleReject = async(email: string) => {
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
                    setInvites(invites.filter((invite) => invite.email != email))
                    return;
                }
            }catch(err){
                console.log(err);
            }
        }
        
    }

    return (
        <>
            {invites.map(invite => (    
                <I.Invites key={invite.id}>

                    <div className="perfil-wrapper">
                        <div className="img-wrapper">
                            <img src={`${reqUrl}/media/${invite.photo}`} alt={invite.name}/>
                        </div>  
                        <div className="user-wrapper">
                        <p>{invite.name}</p>
                        <span>{invite.email}</span>
                        </div>
                    </div>
                    <div className="actions-wrapper">
        
                        <button title="accept" onClick={()=>handleAccept(invite.email)}>
                            <FaPlus className="plus"/>
                        </button>
        
                        <button title="reject" onClick={()=>handleReject(invite.email)}>
                            <FaTrash/>
                        </button>
                    </div>

                </I.Invites>
            ))}
            
        </>
    )
}