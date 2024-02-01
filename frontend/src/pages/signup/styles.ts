import styled from 'styled-components'
import img from '../../assets/signup-background.svg'

export const SignupContainer = styled.main`
  background-image: url(${img});
  background-size: cover; /* Ajusta o tamanho da imagem para cobrir todo o contêiner */
  background-position: center; /* Centraliza a imagem no contêiner */

  display: flex;
  justify-content: center; /* Centraliza os elementos horizontalmente */
  align-items: center; /* Centraliza os elementos verticalmente */
  height: 100vh; /* 100% da altura da viewport */
`

export const RegistationContent = styled.main`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 36.125rem;
  border: 1px solid #ff0084;
  border-radius: 0.8rem;
  color: ${(props) => props.theme.white};
`

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 3.2rem;
    height: 3.2rem;
  }
  span {
    flex: 1;
    font-size: 1.7rem;
  }
  width: 15rem;
  height: 4rem;
  margin-bottom: 1.5rem;
`
export const DeckContainer = styled.div`
  margin-top: 1.5rem;
`

export const Deck = styled.div`
  width: 15rem;
  height: 6rem;
  border: 1px solid gray;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`

export const MoreContent = styled.div`
  margin-top: 0.375rem;
  width: 8.5rem;
  height: 14rem;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.625rem;

  div {
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid gray;
    border-radius: 0.4rem;
    border-width: 0.1357rem;
    border-color: ${(props) => props.theme.white};

    text-align: center;
  }

  span {
    font-size: 0.875rem;
    flex: 1;
  }
`

export const Icons = styled.div`
  margin-top: 3rem;
  width: 15rem;
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
`
