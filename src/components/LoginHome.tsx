'use client'
import {useState} from 'react'

import * as H from '../styles/LoginStyle'
import * as G from '../styles/global'

import Form from '../components/Form'

export default function LoginHome() {
  const [active, setActive] = useState(1);

  return (
      <G.Container>
        <H.ContainerItens>
        <H.Title>Bem-Vindo ao Chat Online!</H.Title>
          <H.BoxForm>
            <H.FormContainer idActive={active}>
              <Form type='register' idActive={active} setActive={setActive}/>
            </H.FormContainer>

            <H.FormContainer idActive={active}>
              <Form type='login' idActive={active} setActive={setActive}/>
            </H.FormContainer>

          </H.BoxForm>
        </H.ContainerItens>
      </G.Container> 
  )
}
