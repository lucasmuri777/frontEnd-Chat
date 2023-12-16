import styled from 'styled-components'

export const ContainerChats = styled.div`
    max-width: 1080px;
    width: 1080px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    @media (max-width: 660px) {
        width: 100%;
    }
`

export const WrapperChats = styled.div`
    padding: 15px 20px;
    width: 100%;
    height: 100%;
`

export const chats = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
    li{
        width: 100%;
        height: 90px;

        a{
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 20px;
            gap: 10px;
            align-items: center;
            border-radius: 10px;
            overflow: hidden;
            border: 1px solid #9410ec;
            cursor: pointer;
            text-decoration: none;


            &:hover{
                background-color: #9410ec2b;
            }
            div.infos-wrapper{
                display: flex;
                align-items: center;
                gap: 10px;
                div.type-wrapper{
                    display: flex;
                    flex-wrap: nowrap;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    gap: 5px;
                    border-radius: 5px;
                    background-color: #9410ec2b;
                    border: 1px solid #9410ec;
                    width: 60px;
                    height: 50px;
                    strong{
                        font-size: 10px;
                    }
                    padding: 10px;
                }
            }

        }
        img{
            width: 50px;
            height: 50px;
            border-radius: 10px;
        }
    }
`

export const Filter = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-bottom:20px;

    div.type-wrapper{
        display: flex;
        flex-wrap: nowrap;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        border-radius: 5px;
        background-color: #9410ec2b;
        border: 1px solid #9410ec;
        width: 60px;
        height: 50px;
        color: white;
        padding: 10px;
        cursor: pointer;
        strong{
            font-size: 10px;
        }
        
    }
    div.active{
        background-color: #9410ec;
    }
`