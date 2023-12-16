'use client'
import styled from 'styled-components'
import image from '../../public/images/endless-constellation.svg'

type PropsForm = {
    idActive: number;
}

export const Title = styled.h1`
    width: 100%;
    text-align: center;
`

export const FormContainer = styled.div<PropsForm>`
    width: 50%;
    height: 100%;
    background-color: #07000c;
    padding: 10px;

    &:nth-of-type(${props => props.idActive}){
        background-color: #9410ec;
    }

    &:nth-of-type(1){
        border: ${props => props.idActive === 2 ? '1px solid #9410ec' : 'none'};
        form{
            display: ${props => props.idActive === 1 ? 'none!important' : 'block'};
        }
        background-image: ${props => props.idActive === 1 ? `url(${image.src})` : 'none'};
    }
    &:nth-of-type(2){
        border: ${props => props.idActive === 1 ? '1px solid #9410ec' : 'none'};
        form {
            display: ${props => props.idActive === 2 ? 'none!important' : 'block'};
        }
        background-image: ${props => props.idActive === 2 ? `url(${image.src})` : 'none'};
    }
    

    &:nth-of-type(1){
        border-radius: 10px 0 0 10px;
    }
    &:nth-of-type(2){
        border-radius: 0 10px 10px 0;
    }
    @media (max-width: 800px) {
        width: 100%;
        display: block;
        border-radius: 10px!important;
        &:nth-of-type(${props => props.idActive}){
            display: none;
        }
       
    }
    @media (max-width: 356px) {
        width: 100%;
        display: block;
        padding: 0px!important;
        border-radius: 10px!important;
        &:nth-of-type(${props => props.idActive}){
            display: none;
        }
       
    }
`;

export const ContainerItens = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const BoxForm = styled.div`
    width: 800px;
    height: 500px;
    background-color: white;
    border-radius: 10px;
    display: flex;
    flex-wrap: nowrap;
    @media (max-width: 800px) {
        width: 100%;
    }
`