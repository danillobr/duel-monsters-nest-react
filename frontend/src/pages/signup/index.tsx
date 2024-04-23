import { LeftContainer } from './components/leftContainer'
import { RightContainer } from './components/rightContainer'
import { SignupContainer } from './styles'
export function Signup() {
  return (
    <div>
      <SignupContainer>
        <LeftContainer />
        <RightContainer />
      </SignupContainer>
    </div>
  )
}
