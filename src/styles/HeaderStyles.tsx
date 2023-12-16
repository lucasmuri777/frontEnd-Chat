import styled from 'styled-components'

export const Header = styled.header`
    width: 220px;
    max-width: 220px;
    min-width: 220px;
    height: 100%;
    background-color: transparent;
    display: flex;
    justify-content: center;
    border-right: 1px solid #9410ec;
    h1,h3,button{
        color: white
    }
    @media (max-width: 660px) {
        width: 100%;
        height: auto !important;
        max-width: 100%;
        min-width: 100%;
    }

`

export const WrapperHeader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 20px;
    gap: 10px;
    
    @media (max-width: 660px) {
       flex-direction: row;
    }
`
export const Nav = styled.nav`
    width: 100%;
    height: 90%;
    padding-top: 40px;
    ul{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        list-style: none;
        gap: 25px;
        
        li{
            width: 100%;
            height: 30px;
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            border-radius: 10px;

            

            svg{
                width: auto;
                font-size: 30px;
            }
            a{
                text-decoration: none;
                font-size: 20px;
                width: 100%;
                display: flex;
                align-items: center;
                text-align: left;
                border-radius: 10px;
                padding: 10px 10px;
                gap: 10px;

                &:hover{
                background-color: #9410ec2b;
            }
            }
        }
        li.active{
            svg{
                font-size: 31px;
            }
            
            a{
                font-weight: bold;
                font-size: 21px;
            }
        }
    }
    @media (max-width: 660px) {
        width: 70%!important;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        height: 100%;
        ul{
            width:90%;
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            a{
                text-align: center!important;
                justify-content: center;
                p{
                    display: none;
                }
            }
        }
    }
    @media (max-width: 450px){
        ul{
            gap: 5px !important;
        }
    }
`

export const UserInfos = styled.div`
    position: relative;
    display: flex;
    height: 90px;
    align-items: center;
    width: 100%;
    gap: 20px;
    justify-content: center;
    cursor: pointer;
    border-radius: 10px;

    &:hover{
        background-color: #9410ec2b;
    }

    div.img-wrapper{
        width: 50px;
        height: 50px;
        background-color: #9410ec;
        border: 1px solid #9410ec;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        overflow: hidden;
        img{
            min-width: 60px;
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: top;
        }
    }
    h3{
        font-size: 17px;
        text-align: right;
    }
    @media (max-width: 660px) {
        height: 100%;
        align-items: center;
        width: 30%;

    }
    @media (max-width: 450px){
        justify-content: right!important;
        h3{
            display: none !important;
        }
    }
`

export const settings = styled.div`
    position: absolute;
    top: -120px;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px 0;
    box-shadow: 0 0px 8px 0px #9410ec;
    border-radius: 10px;
    align-items: center;
    a{
        width: 100%;
        padding: 10px 20px;
        text-decoration: none;
        display: flex;
        justify-content: left;
        align-items: center;
        gap:5px;
        cursor: pointer;
        &:hover{
            background-color: #9410ec2b;
        }
    }
    svg{
        font-size: 30px;
    }
    @media (max-width: 660px) {
        top: 80px;
        background-color: #07000c;
    }
    @media (max-width: 450px){
        p{
            display: none!important;
        }
        a{
            justify-content: center!important;;
        }
    }

`