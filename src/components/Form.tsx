'use client'
import { reqUrl } from '@/app/api/req'
import * as F from '../styles/FormStyles'
import { useUser } from '@/contexts/UserContext'
import {useRouter} from 'next/navigation'

import {useState, useEffect} from 'react'

type FormProps = {
    type: 'login' | 'register';
    idActive: number;
    setActive: React.Dispatch<React.SetStateAction<number>>
}
export default function Form({type, idActive, setActive}: FormProps) {

    const userCtx = useUser();
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleChangeForm = () => {
        setActive(idActive === 1 ? 2 : 1);
    }

    const handleSendForm = async(e: React.FormEvent) =>{
        e.preventDefault();
        if(type === 'register'){
            if(name.length > 0 && name.length < 16){
                try{
                    let teste = await fetch(`${reqUrl}/register`, {
                        method: 'POST',
                        mode: 'cors', // Ou 'no-cors' se necessário
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'Access-Control-Allow-Origin': 'https://front-end-chat-beta.vercel.app'
                        
                        },
                        body: JSON.stringify({name, email, password})
                    })
                    let data = await teste.json()
                    if(data.error){
                        alert(data.error)
                        return;
                    }
                    userCtx?.handleSetUser(data.user)
                    userCtx?.handleSetToken(data.token)

                    alert('Register successful')
                    router.push('/home')
                }catch(err){
                    console.log(err)
                }
            }else{
                alert('Name must be between 1 and 15 characters')
            }

        }
        if(type === 'login'){
            console.log(reqUrl)
            try{
                let teste = await fetch(`${reqUrl}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({email, password})
                })
                let data = await teste.json()
                if(data.error){
                    alert(data.error)
                    return;
                }
                userCtx?.handleSetUser(data.user)
                userCtx?.handleSetToken(data.token)

                alert('Login successful')
                router.push('/home')
            }catch(err){
                console.log(err)
            }
                
            
            /*if(userCtx){
                userCtx?.setUser({name, email, photo: '', id:''})
                console.log(userCtx)
                router.push('/home')
            }*/
        }
    }

    return(
        <F.Form onSubmit={handleSendForm}>
            <F.Wrapper>
                {type === 'login' &&(
                    <h1>Login</h1>
                )}{type === 'register' &&(
                    <h1>Register</h1>
                )}
                {type === 'register' &&
                    
                    <F.ContainerInputs>
                        <label>Nome</label>
                        <input 
                            type="text"
                            name="name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Digite seu nome"
                            required={true}
                        />
                    </F.ContainerInputs>
                }

                <F.ContainerInputs>
                    <label>Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Digite seu Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </F.ContainerInputs>

                <F.ContainerInputs>
                    <label>Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Digite uma senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </F.ContainerInputs>

                <F.ContainerInputs>
                    <input 
                        type="submit" 
                        value={type === 'login' ? 'Login' : 'Registrar'} 
                    />

                    {type === 'login' &&
                        <p>Não tem conta? <a onClick={handleChangeForm}>Registre-se</a></p>
                    }{
                        type === 'register' &&
                        <p>Ja tem conta? <a onClick={handleChangeForm}>Login</a></p>
                    }
                </F.ContainerInputs>
            </F.Wrapper>
        </F.Form>
    )
}