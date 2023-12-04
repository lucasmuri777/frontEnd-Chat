'use client'
import Header from "@/components/Header";
import { useUser } from "../../contexts/UserContext";
import { ContainerApp } from "@/styles/global";

import {useEffect, useState} from 'react';

import * as S from '../../styles/settings/SettingsStyles'

export default function Settings() {
    const userCtx = useUser();

    const [name, setName] = useState('');
    const [photo, setPhoto] = useState('');
    const [namePhoto, setNamePhoto] = useState('');
    console.log(process.env)
    useEffect(()=>{
        
        if(userCtx?.user){
            setName(userCtx?.user?.name as string);
            setNamePhoto(userCtx?.user?.photo as string);
        }
    },[userCtx])
    const handleUpload = (e: any) => {
       if(e.target.files[0]){
        setPhoto(e.target.files[0]);
       }
    }
    
    return (
        <ContainerApp>
            <Header 
                name={userCtx?.user?.name as string} 
                photo={userCtx?.user?.photo as string} 
                sair={userCtx?.logout as () => void} 
            />


            <S.ContainerSettings>
                <S.Form>
                    <input 
                        type="text" 
                        placeholder="Digite seu nome..." 
                        name="name" 
                    />
                    <S.WrapperImage>
                        <img src={`${process.env.SERVER_URL}/media/${namePhoto}`} alt="Photo"/>
                    </S.WrapperImage>
                    <input 
                        type="file" 
                        name="photo" 
                        title="photo"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                    <input 
                        type="submit"
                        value="Salvar"
                        name="submit"
                    />
                </S.Form>
            </S.ContainerSettings>

            
        </ContainerApp>
    )
} 