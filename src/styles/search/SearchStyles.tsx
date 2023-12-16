import styled from "styled-components";

export const ContainerSearch = styled.div`
    width: 1080px;
    max-width: 1080px;
    height: 100%;
    position: relative;
    @media (max-width: 660px){
        width: 100%;
    }
`

export const SearchWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 55px 20px;
    gap: 20px;
`

export const Form = styled.form`
    width: 100%;
    max-height: 40px;
    min-height: 40px;
    display: flex;
    justify-content: center;
    gap: 10px;
    input{
        max-height: 40px;
        width: 90%;
        padding: 0 20px;
        border: 1px solid #9410ec;
        background-color: transparent;
        border-radius: 10px;
        color: white;
    }
    button{
        max-height: 40px;
        width: 10%;
        border-radius: 10px;
        background-color: #9410ec;
        border:none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        svg{
            font-size: 23px;
        }
    }
`

export const SearchResults = styled.div`
    width: 100%;
    height: calc(100% - 70px);
    display: flex;
    gap: 10px;
    flex-direction: column;
`

export const Results = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    border: 1px solid #9410ec;
    border-radius: 10px;
    padding: 20px;
    gap: 10px;
    &:hover{
        background-color: #9410ec2b;
    }

   
    div.invite-wrapper{
        width: 20%;
        display: flex;
        justify-content: right;
        button{
            background-color: transparent;
            border: 0;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            svg{
                color: #9410ec;
                font-size: 30px;
            }
            
        }
    }
`

export const ContainerPhotoInfos = styled.div`
    display: flex;
    gap: 10px;
    flex-wrap: nowrap;
    align-items: center;
    width: 80%;
    div.image-wrapper{
        overflow: hidden;
        height: 50px;
        width: 50px;
        border-radius: 10px;
        background-color: #9410ec;

        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    div.infos-wrapper{
        display: flex;
        flex-direction: column;
        span{
            color: #ccc
        }
    }

`

export const Filter = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
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

export const ContainerFormChat = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 99;
    background-color: #000000cf;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const FormEnterChat = styled.form`
    width: 400px;
    height: 400px;
    background-color: #07000c;
    border-radius: 10px;
    position: relative;
    border: 1px solid #9410ec;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 30px;

    a{
        position: absolute;
        right: -20px;
        top: -20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: #9410ec;
        align-items: center;
        display: flex;
        justify-content: center;
        cursor: pointer;
    }
    div.input-wrapper{
        width: 100%;
        padding: 10px;
        border: 1px solid #9410ec;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        svg{
            font-size: 25px;
            color: white;
            cursor: pointer;
        }
        input{
            height: 100%;
            font-size: 18px;
            border: none;
            background-color: transparent;
            color: white;
        }
    }
    input[type=submit]{
        width: 80px;
        height: 35px;
        border: none;
        font-weight: bold;
        background-color: #9410ec;
        color: white;
        border-radius: 10px;
        margin-top: 10px;
        cursor: pointer;
    }
` 