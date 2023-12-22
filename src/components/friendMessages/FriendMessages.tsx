'use client'
import { useEffect, useState } from "react"
import * as F from '../../styles/friend/FriendStyle'
import { MdInsertPhoto } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
//import { socket } from "@/socket";
import { useUser } from "@/contexts/UserContext";
import { reqImage, reqUrl } from "@/app/api/req";
import { useRouter } from "next/navigation";
import { socket } from "@/socket";
import { MdSend } from "react-icons/md";


type Message = {
    id: string,
    author: string,
    photo: string,
    message: string,
    image: string,
    to: {
        id: string,
        typeMsg: 'friend' | 'chat'
    },
}
type FriendInfos = {
    id: string,
    name: string,
    photo: string,
    email: string
}
export default function FriendMessages({id} : {id: string}) {
    const userCtx = useUser();
    const router = useRouter();
    
    const [msg, setMsg] = useState('');
    const [photo, setPhoto] = useState<File | ''>('');
    const [namePhoto, setNamePhoto] = useState('');
    
    const [friendInfos, setFriendInfos] = useState<FriendInfos | null>(null);

    const [messages, setMessages] = useState<Message[]>([]);

    //socket state
    const [socketInstance] = useState(socket());

    
    const getFriendInfos = async(id: string) =>{
        try{
            let isFriendData = await fetch(`${reqUrl}/userInfos`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userCtx?.token}`
                },
                body: JSON.stringify({
                    id: id
                })
            })
            let data = await isFriendData.json();
            if(data.status){
                setFriendInfos(data.user);
                return;
            }
            router.push('/home');
            return;
            
        }catch(err){
            console.log(err);
            router.push('/home');
            return;
        }
    }
    const loadMessage = async() => {
        try{
            let messages = await fetch(`${reqUrl}/renderMessages/friend/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${userCtx?.token}`
                }
            })
            let data = await messages.json();
            if(data.messages){
                let messagesData: Message[] = []
                data.messages.map((message: any) => {
                    let data: Message = {
                        id: message._id,
                        author: message.author,
                        photo: message.authorPhoto,
                        message: message.message,
                        image: message.image,
                        to: {
                            id: message.to.id,
                            typeMsg: 'friend'
                        }
                    }
                    messagesData.push(data);
                })
                setMessages(messagesData);
            }
        }catch(err){
            console.log(err);
        }
    }
    

    const handleRemoveImage = () => {
        setPhoto('');
        setNamePhoto('');
    }

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
       if(e.target.files && e.target.files[0]){
        setPhoto(e.target.files[0]);
       }
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        if(msg.trim() != ''){
            let msgFormatted = {
                id: userCtx?.user?.id,
                author: userCtx?.user?.email,
                photo: userCtx?.user?.photo,
                message: msg,
                image: '',
                to: {
                    id: id,
                    typeMsg: 'friend'
                }
            }
            const formData = new FormData();
            formData.append('id', id);
            formData.append('message', msg);
            formData.append('type', 'friend');

            if(photo instanceof File){
                formData.append('image', photo);
            }
            try{
                //fazer o fetch pra enviar a mensagem, e falta fazer o socket
                let envioMessage = await fetch(`${reqUrl}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${userCtx?.token}`
                    },
                    body: formData
                }) 
                let data = await envioMessage.json();
                if(data.status){
                    let message = messages;
                    let msgFormated: Message = {
                        id: data.message._id,
                        author: data.message.author,
                        photo: data.message.authorPhoto,
                        message: data.message.message,
                        image: data.message.image,
                        to: {
                            id: data.message.to.id,
                            typeMsg: 'friend'
                        }
                    }
                    message.push(msgFormated);
                    setMsg('');
                    handleRemoveImage();
                    socketInstance.emit('message', message);
                }

            }catch(err){
                console.log(err);
            }
        };
        return;
        
        //socketInstance.emit('message', msg);
    }

    useEffect(()=>{
        getFriendInfos(id);
        loadMessage();
    },[])
    useEffect(()=>{
        socketInstance.on('message', (mensagem: Message[])=>{
            let last = mensagem.length - 1;
            if(mensagem[last].id == userCtx?.user?.id || mensagem[last].to.id == userCtx?.user?.id){
                setMessages(mensagem);
                return;
            }
            
         });
 
         return ()=>{
             socketInstance.off('message');
         }
    },[])
   
    return (
        <>
            <F.Perfil>
                <div className="img-wrapper">
                    <img src={`${reqImage}${friendInfos?.photo}.jpg?alt=media`} alt="foto de perfil"/>
                </div>
                <div className="infos-wrapper">
                    <h2>{friendInfos?.name}</h2>
                    <span>{friendInfos?.email}</span>
                </div>
            </F.Perfil>
            <F.MessagesContainer>
               <F.Message>  
                    {messages.map((message) => (
                        <div className={`message-wrapper ${message.author === userCtx?.user?.email ? 'me' : ''}`} key={message.id}>
                            <div className="msg-single">
                                <p>{message.message}</p>
                            </div>
                            {message.image && <img src={`${reqImage}${message.image}.jpg?alt=media`} alt={message.message}/>}
                        </div>
                    ))}

               </F.Message>
            </F.MessagesContainer>
            <F.FormMessage onSubmit={handleSubmit}>
                <div className="input-wrapper">
                    <input 
                        type="text" 
                        placeholder="Escreva uma mensagem"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                    />
                    <input 
                        type="file" 
                        accept="image/*" 
                        title="file" 
                        id="file" 
                        name="image"
                        onChange={handleUpload}
                        hidden
                    />
                    {photo == '' &&(
                        <label className="icon" htmlFor="file">
                            <MdInsertPhoto/>
                        </label> 
                    )}
                    {photo != ''&&(
                        <label className="icon" onClick={handleRemoveImage}>
                            <FaTrash/>
                        </label> 
                    )}

                </div>
                <button type="submit" title="Send">
                    <div className="svg-wrapper">
                        <MdSend/>
                    </div>
                </button>
            </F.FormMessage>
        </>
    )

}
