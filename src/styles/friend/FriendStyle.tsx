import styled from 'styled-components'


export const Container = styled.div`
    max-width: 1080px;
    width: 1080px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #9410ec;

    @media (max-width: 660px) {
        width: 100%;
    }
`

export const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
`

export const Perfil = styled.div`
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #9410ec;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 15px;
    gap: 15px;

    div.img-wrapper{
        position: relative;
        img{
            width: 60px;
            height: 60px;
            border-radius: 10px;
            border: 1px solid #9410ec;
        }
       
    }
    

    div.infos-wrapper{
        span{
            color: #ccc;
        }
    }
`

export const MessagesContainer = styled.div`
    height: calc(100% - 160px);
    width: 100%;
    overflow: hidden;
`

export const Message = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    overflow-y: scroll;
    div.message-wrapper{
        width: 100%;
        display: flex;
        justify-content: left;
        word-wrap: break-word;
        height: auto;
        flex-direction: column;
        img{
            background-color: #9410ec;
            max-width: 350px;
            object-fit: cover;
            border-radius: 10px;
        }
    }
    div.message-wrapper.me{
        justify-content: right;
        align-items: flex-end;
        p{
            background-color: #9410ec7b;
        }
    }
    .msg-single{
        max-width: 350px;
        height: 100%;
        min-width: 40px;
        display: flex;
    }
    .msg-single p{
        background-color: #9410ec;
        border-radius: 5px;
        padding: 10px;
        text-align: center;
    }
    p.me{
        align-self: rigth;
    }
    @media (max-width: 450px){
        div.message-wrapper{
            img{
                max-width: 100%;
            }
        }
    }
    
`

export const FormMessage = styled.form`
    width: 100%;
    height: 80px;
    border-top: 1px solid #9410ec;
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 0 15px;
    gap: 10px;

    div.input-wrapper{
        width: 85%;
        height: 50px;
        border: 1px solid #9410ec;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        label.icon{
            widows: 30%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding:5px;
            cursor: pointer;
            svg{
                color: #9410ec;
                font-size: 35px;
            }
        }
        input{
            width: 70%;
            height: 100%;
            padding:10px;
            background-color: transparent;
            outline: none;
            border: none;
            color: white;
        }
    }
    button{
        width: 15%;
        height: 50px;
        background-color: #9410ec;
        border: none;
        border-radius: 10px;
        color: white;
        padding: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        div.svg-wrapper{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 100%;
            max-width: 100%;

            svg{
                font-size: 24px!important;
            }
        }
    }
    @media (max-width: 450px) {
        .svg-wrapper{
            svg{
                font-size: 14px!important;
            }
        }
    }
    
`
