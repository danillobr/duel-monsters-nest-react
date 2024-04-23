import styled from 'styled-components'
import signupBackground from '../../assets/signup-background.svg'

export const SignupContainer = styled.main`
  background-image: url(${signupBackground});
  background-size: cover; /* Ajusta o tamanho da imagem para cobrir todo o contêiner */
  background-position: center; /* Centraliza a imagem no contêiner */

  display: flex;
  justify-content: center; /* Centraliza os elementos horizontalmente */
  align-items: center; /* Centraliza os elementos verticalmente */
  height: 100vh; /* 100% da altura da viewport */
  gap: 16rem;
`
