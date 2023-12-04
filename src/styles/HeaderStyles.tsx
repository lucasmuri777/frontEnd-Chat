import styled from 'styled-components'

export const Header = styled.header`
    width: 220px;
    max-width: 220px;
    min-width: 220px;
    height: 100%;
    background-color: transparent;
    border-right: 1px solid #9410ec;
    h1,h3,button{
        color: white
    }
    display: flex;
    justify-content: center;
`

export const WrapperHeader = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 20px;
    gap: 10px;
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
        text-align: left;
        cursor: pointer;
        &:hover{
            background-color: #9410ec2b;
        }
    }

`