'use client'
import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";

import * as S from "../../styles/search/SearchStyles";
import { useRouter } from "next/navigation";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { reqUrl } from "@/app/api/req";

type PropsType = {
    id: string;
    name: string;
    setShowFormChat: React.Dispatch<React.SetStateAction<boolean>>;
    showFormChat: boolean;
}

export default function FormChat({id,name, setShowFormChat, showFormChat}: PropsType) {
    const userCtx = useUser();
    const route = useRouter();
    
    const [password, setPassword] = useState('')
    const [viewPassword, setViewPassword] = useState(false)

   const handleEnterChat = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(password.trim() != ""){
        if(id){
            try{
                let enter = await fetch(`${reqUrl}/enterChat`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userCtx?.token}`
                    },
                    body: JSON.stringify({
                        id: id,
                        password: password
                    })
                })
                let data = await enter.json()
                
                if(data.success){
                    setShowFormChat(false)
                    alert('Entrou no Grupo')
                    route.push(`/home`)
                    return;
                }else{
                    alert('Senha errada')
                }
            }catch(err){
                console.log(err)
            }  
        }
    }
   }

    return (
        <>
            <S.ContainerFormChat>
                <S.FormEnterChat onSubmit={handleEnterChat}>
                    <a onClick={() => setShowFormChat(false)}>X</a>
                    <h2>Entrar em {name}</h2>
                    <div className="input-wrapper">
                        <input 
                            type={viewPassword ? "text" : "password"} 
                            placeholder="Digite a senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {viewPassword ? <FaEyeSlash onClick={() => setViewPassword(false)}/> : <FaEye onClick={() => setViewPassword(true)}/>}
                    </div>
                    <input type="submit" value="Entrar"/>
                    
                </S.FormEnterChat>
            </S.ContainerFormChat>
        </>
    )
}
