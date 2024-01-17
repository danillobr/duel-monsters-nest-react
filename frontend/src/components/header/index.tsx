import { HeaderContainer, HeaderContent } from './styles'

import logoImg from '../../assets/google.png'
import { AccountButton } from '../AccountButton'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImg} alt="" />
        <AccountButton variant="primary" />
      </HeaderContent>
    </HeaderContainer>
  )
}
