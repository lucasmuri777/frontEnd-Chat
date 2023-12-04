'use client'
import styled from 'styled-components'

export const Form = styled.form`
    width: 100%;
    height: 100%;
    display: flex!important;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`

export const Wrapper = styled.div`
    height: auto;
    width: 100%;
    h1{
        width: 100%;
        text-align: center;
        padding: 0px;
        padding-bottom: 10px;
        color: #9410ec;
    }
`

export const ContainerInputs = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 10px 20px;
    label{
        width: 100%;
        font-size: 18px;
        font-weight: bold;
    }
    
    input{
        width: 100%;
        outline: none;
        border: 1px solid #9410ec;
        padding: 10px;
        border-radius: 10px;
        background-color: transparent;
        color: #f5ecfc;
    }
    input[type="submit"]{
        background-color: #9410ec;
        color: white;
        font-weight: bold;
        cursor: pointer;
    }
    p{
        color: #f5ecfc;
        a{
            color: #9410ec;
            cursor: pointer;
        }
    }
`