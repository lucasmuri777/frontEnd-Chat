import styled from 'styled-components';

export const ContainerInvites = styled.div`
    max-width: 1080px;
    width: 1080px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @media (max-width: 660px){
        width: 100%;
    }
`

export const WrapperInvites = styled.div`
    width: 100%;
    height: 100%;
    padding: 30px 20px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    flex-direction: column;
`

export const Invites = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border: 1px solid #9410ec;
    border-radius: 10px;
    padding: 20px;
    gap: 10px;
    justify-content: space-between;

    &:hover{
        background-color: #9410ec2b;
    }
    div.perfil-wrapper{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 10px;
        align-items: center;
        span{
            color: #ccc;
        }

        div.img-wrapper{  
            width: 50px;
            height: 50px;
            
            img{
                border-radius: 10px;
                background-color: #9410ec;
                width: 50px;
                height: 50px;
                object-fit: cover;
            }
            
        }
    
    }

    div.actions-wrapper{
        display: flex;
        gap: 20px;

        button{
            background-color: transparent;
            outline: none;
            cursor: pointer;
            border: 1px solid #9410ec;
            border-radius: 10px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            width: 53px;
            height: 50px;
            &:hover{
                background-color: #9410ec2b;
            }
            svg{
                color: #9410ec;
                font-size: 25px;

                &.plus{
                    font-size: 30px;
                }
            }
            

            
        }
    }
    @media (max-width: 450px){
        div.actions-wrapper{
            gap: 10px;
            button{
                width: 40px;
                height: 40px;
            }
        }
    }

`