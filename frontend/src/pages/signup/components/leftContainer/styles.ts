import styled from 'styled-components'
import deckBackground from '../../../../assets/deck-background.svg'

export const RegistationContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 15rem;
  height: 36.125rem;
  border: 1px solid transparent;
  border-radius: 0.8rem;
  color: ${(props) => props.theme.white};

  > span {
    font-size: 1.13rem;
  }
`

export const TitleContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    width: 3.2rem;
    height: 3.2rem;
  }
  h1 {
    flex: 1;
    font-size: 1.7rem;
    margin-top: 0.55rem;
  }
  width: 15rem;
  height: 4rem;
  margin-bottom: 1.5rem;
`
export const DeckContainer = styled.nav`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
`

export const Deck = styled.li`
  display: flex;
  flex-direction: row;
  gap: 1.5625rem;
  align-items: center;

  width: 15rem;
  height: 6rem;
  border: 1px solid transparent;
  border-radius: 0.8rem;
  margin-bottom: 1rem;

  background-image: url(${deckBackground});

  img {
    margin-left: -1px;
    vertical-align: middle; /* Alinhe a imagem verticalmente ao centro */
  }

  h1 {
    display: flex;
    font-size: 0.9rem;
    margin-bottom: 0.3rem;

    div {
      font-size: 0.5rem;
    }
  }

  p {
    margin-bottom: 0.4rem;
    color: ${(props) => props.theme['gray-400']};
    font-size: 0.82rem;
  }

  span {
    display: flex;
    align-items: center;
    gap: 0.5625rem;

    color: ${(props) => props.theme['gray-400']};
    font-size: 0.78rem;

    div {
      width: 0.45rem;
      height: 0.45rem;
      border-radius: 50%;
      background: ${(props) => props.theme.orange};
    }
  }

  &:hover {
    outline: 2px solid ${(props) => props.theme['gray-300']};
    background: ${(props) => props.theme['gray-700']};
    transition: background-color 0.4s;

    span,
    p {
      color: white;
    }
  }

  a:focus {
    box-shadow: -0.5px 0 0 2px ${(props) => props.theme['gray-300']};
    border-radius: 0.8rem;
  }
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
