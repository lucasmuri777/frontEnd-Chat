import styled from 'styled-components';

export const ContainerSettings = styled.div`
    max-width: 1080px;
    width: 1080px;
    height: 100%;
`

export const Form = styled.form`
    padding: 0px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 50px;
    align-items: center;
    justify-content: center;
    div.inputs{
        display: flex;
        flex-wrap: nowrap;
        gap: 10px;
        justify-content: center;
    }
    input{
        padding: 10px;
        width: 250px;
        border-radius: 10px;
        background-color: transparent;
        border: 1px solid #9410ec;
        color: white;
    }
    input[type=submit]{
        background-color: #9410ec;
        color: white;
        cursor: pointer;
        width: 80px;
    }
`

export const WrapperImage = styled.div`
    width: 120px;
    height: 120px;
    //overflow: hidden;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid #9410ec;
    cursor: pointer;
    position: relative;
    z-index: 1;
    &:hover{
        border: 5px solid #9410ec;
    }
    label{
        cursor: pointer;
    }
    img{
        object-fit: contain;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    div.svg-wrapper{
        position: absolute;
        top: -10px;
        left: -10px;
        background-color: #9410ec;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        z-index: 2;
    }
    
`