'use client'
import { createGlobalStyle } from "styled-components";
import styled from 'styled-components'

import path from "path";

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }
    html,body{
        height: 100%;
    }
    body{
        background-color: #07000c;
    }
    h1,p,li,label,h2,h3,h4,a{
        color: white;
    }
    
`

export const Container = styled.div`
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    padding: 0 1%;
    height: 100%;
`

export const ContainerApp = styled.div`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    flex-direction: row;
`

//220px menu 1080 pro resto