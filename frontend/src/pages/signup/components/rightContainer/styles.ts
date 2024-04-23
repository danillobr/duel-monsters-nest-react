import styled from 'styled-components'

export const RegistationContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme['blue-900']};
  width: 29rem;
  height: 50rem;
  border-radius: 3rem;

  > span {
    font-size: 1.13rem;
  }
`

export const CloseButton = styled.button`
  display: flex;
  background: none;
  border: none;
  color: ${(props) => props.theme.white};
  cursor: pointer;

  margin-top: -6%;
  margin-right: -78%;

  // &:hover {
  //   box-shadow: 0 0 0 2px ${(props) => props.theme['gray-300']};
  // }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme['gray-300']};
  }
`

export const CentralContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 22.875rem;
  height: 41.5rem;
  color: ${(props) => props.theme['gray-400']};
`

export const TitleContent = styled.div`
  h1 {
    font-size: 3rem;
    color: ${(props) => props.theme.white};
  }

  margin-bottom: 2.4375rem;
`
export const Options = styled.nav`
  ul {
    display: flex;
    gap: 1.125rem;

    list-style-type: none;
  }

  ul li a:last-child {
    color: ${(props) => props.theme['blue-100']};

    &:hover {
      color: ${(props) => props.theme.white};
      transition: color 0.4s;
    }

    &:focus {
      box-shadow: 0 0 0 2px ${(props) => props.theme['gray-300']};
      border-radius: 0.1rem;
    }
  }

  a {
    text-decoration: none;
  }

  margin-bottom: 3rem;
`
export const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 2.375rem;
    height: 3.5rem;
    border-radius: 0.6rem;
    border: 1px solid transparent;
    background: ${(props) => props.theme['gray-800']};
    color: ${(props) => props.theme.white};
    padding-left: 0.8rem;

    &:hover {
      background: ${(props) => props.theme['gray-800']};
      box-shadow: 0 0 0 2px ${(props) => props.theme['gray-300']};
      border-radius: 0.6rem;
    }

    &:focus {
      box-shadow: 0 0 0 2px ${(props) => props.theme['gray-300']};
      border-radius: 0.6rem;
    }
  }

  span {
    margin-bottom: 2.375rem;
  }
`

export const FullName = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  input {
    width: 10.875rem;
  }
`

export const PartName = styled.div`
  // margin-bottom: 20rem;
`

export const ContinueButton = styled.button`
  background: ${(props) => props.theme['blue-500']};
  color: ${(props) => props.theme.white};
  height: 3.5rem;
  border-radius: 1rem;
  border: 1px solid transparent;
  margin-bottom: 2.6875rem;

  &:hover {
    background: ${(props) => props.theme['blue-700']};
    border: 2px solid ${(props) => props.theme.white};
    border-radius: 1rem;
    transition: background-color 0.4s;
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.white};
    box-shadow: none;
    border-radius: 1rem;
  }
`

export const SignupGoogleButton = styled.button`
  background: ${(props) => props.theme['blue-100']};
  color: ${(props) => props.theme.white};
  height: 3.5rem;
  border-radius: 1rem;
  border: 1px solid transparent;

  &:hover {
    background: ${(props) => props.theme['blue-300']};
    border: 2px solid ${(props) => props.theme.white};
    border-radius: 1rem;
    transition: background-color 0.4s;
  }

  &:focus {
    border: 2px solid ${(props) => props.theme.white};
    box-shadow: none;
    border-radius: 1rem;
  }
`
