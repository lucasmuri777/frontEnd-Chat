'use client'
import { reqUrl } from '@/app/api/req'
import { User } from '@/types/User'
import { useRouter } from 'next/navigation'
import {createContext, useContext, useState, useEffect} from 'react'

type UserContextType = {
    token: string;
    user: User | null;
    handleSetUser: (user: User | null) => void;
    handleSetToken: (token: string) => void;
    logout: () => void;
}

export const UserContext = createContext<UserContextType | null>(null)
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string>('');
    const router = useRouter();

    const handleSetUser = (user: User | null) =>{
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
    }
    const handleSetToken = (token: string) =>{
        setToken(token);
        localStorage.setItem('token', token);

    }
    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const hasUser = async(user: User)=>{
        if(user){
            if(user.id){
                let token = localStorage.getItem('token');
                if(token){
                    let hasUser = await fetch(`${reqUrl}/hasUser`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({id: user.id})
                    })
                    let data = await hasUser.json()
                    if(data){
                        if(!data.status){
                            localStorage.removeItem('user')
                            localStorage.removeItem('token')
                            router.push('/')
                            return
                        }
                    }
                }
            }else{
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                router.push('/')
                return;
            }
        }else{
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            router.push('/')
            return;
        }
    }

    useEffect(()=>{
        let tokenSalvo = localStorage.getItem('token');
        let userSalvo = localStorage.getItem('user');
        if(!tokenSalvo || !userSalvo){
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            router.push('/')
            return
        }

        
        if(typeof tokenSalvo != 'undefined' || tokenSalvo != null){
            setToken(tokenSalvo as string);
        }
        if(typeof userSalvo != 'undefined' || userSalvo != null){
            setUser(JSON.parse(userSalvo as string));
            hasUser(JSON.parse(userSalvo as string))
            
        }

        
    },[])



    return(
        <UserContext.Provider value={{ 
            token,
            handleSetToken,
            user, 
            handleSetUser, 
            logout
        }}>

            {children}

        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)