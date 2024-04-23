import { ArrowLeft } from '@phosphor-icons/react'
import {
  CentralContainer,
  CloseButton,
  ContinueButton,
  FullName,
  Options,
  RegistationContent,
  RegistrationForm,
  SignupGoogleButton,
  TitleContent,
} from './styles'

export function RightContainer() {
  return (
    <div>
      <RegistationContent>
        <CloseButton>
          <ArrowLeft size={15} weight="bold" />
        </CloseButton>

        <CentralContainer>
          <TitleContent>
            <h1>Cadastre-se</h1>
          </TitleContent>

          <Options>
            <ul>
              <li>Já é um usuário?</li>
              <li>
                <a href="#">Faça login</a>
              </li>
            </ul>
          </Options>

          <RegistrationForm>
            <FullName>
              <input type="text" placeholder="Primeiro nome" />
              <input type="text" placeholder="Sobrenome" />
            </FullName>

            <input type="email" placeholder="Email" />

            <input type="text" placeholder="Nome de usuário" />

            <ContinueButton type="submit">Continuar</ContinueButton>

            <span>Ou continue com</span>

            <SignupGoogleButton type="submit">Google</SignupGoogleButton>
          </RegistrationForm>
        </CentralContainer>
      </RegistationContent>
    </div>
  )
}
