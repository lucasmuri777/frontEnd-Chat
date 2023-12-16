'use client'
import Header from "@/components/Header";
import { useUser } from "../../contexts/UserContext";
import { ContainerApp } from "@/styles/global";

import {useEffect, useState} from 'react';
import * as S from '../../styles/settings/SettingsStyles'
import { reqUrl } from "../api/req";

import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";



export default function Settings() {
    const userCtx = useUser();
    const router = useRouter();
    const [name, setName] = useState<string>('');
    const [photo, setPhoto] = useState<File | ''>('');
    const [namePhoto, setNamePhoto] = useState('');
    const [remove, setRemove] = useState('false');
    
    useEffect(()=>{
        if(userCtx?.user){
            setName(userCtx?.user?.name as string);
            setNamePhoto(userCtx?.user?.photo as string);
        }

        if(!userCtx?.user){
            router.push('/')
        }
    },[userCtx])
    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRemove('false');
       if(e.target.files && e.target.files[0]){
        setPhoto(e.target.files[0]);
       }
    }

    const handleRemoveImage = () => {
        setPhoto('');
        setNamePhoto('default-perfil.jpg');
        setRemove('true');
    }

    const handleSubmitChanges = async(e: React.FormEvent) => {
        e.preventDefault();
        if(name.trim().length >= 4 && name.trim().length < 12){
            const formData = new FormData();
            formData.append('id', userCtx?.user?.id as string);
            formData.append('name', name);
            formData.append('removeImage', remove);

            if(photo instanceof File){
                formData.append('image', photo);
            }
            
            try{
                console.log(photo)
                let mudar = await fetch(`${reqUrl}/editUser`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userCtx?.token}`
                    },
                    body: formData
                })
                let data = await mudar.json();
                if(data.error){
                    alert(data.error);
                    return;
                }
                if(data.user){
                    userCtx?.handleSetUser(data.user);
                }
                return;
            }catch(err){
                alert('Erro')
                return;
            }
        }
        alert('Nome de usuário inválido');
        return;
    }

    return (
        <ContainerApp>
            <Header 
                name={userCtx?.user?.name as string} 
                photo={userCtx?.user?.photo as string} 
                sair={userCtx?.logout as () => void} 
            />


            <S.ContainerSettings>
                <S.Form onSubmit={handleSubmitChanges}>
                    <S.WrapperImage>
                        <label>
                            <div 
                                className="svg-wrapper"
                                onClick={handleRemoveImage}
                            >
                                <FaTrash />
                            </div>
                            <label htmlFor="photo">
                                <img src={`${reqUrl}/media/${namePhoto}`} alt="Photo"/>
                            </label>
                        </label>
                    </S.WrapperImage>
                    <input 
                            type="file" 
                            name="photo" 
                            title="photo"
                            accept="image/*"
                            onChange={handleUpload}
                            id="photo"
                            hidden
                        />
                    
                   <div className="inputs">
                        <input 
                            type="text" 
                            placeholder="Digite seu nome..." 
                            name="name" 
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                        />
                        <input 
                            type="submit"
                            value="Salvar"
                            name="submit"
                        />
                    </div>
                </S.Form>
            </S.ContainerSettings>

            
        </ContainerApp>
    )
} 