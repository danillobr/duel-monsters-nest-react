import {
  StarAndCrescent,
  DownloadSimple,
  ToggleLeft,
  Plus,
} from '@phosphor-icons/react'
import {
  DeckContainer,
  Deck,
  Icons,
  MoreContent,
  RegistationContent,
  TitleContent,
} from '../../styles'

import gaming from '../../../../assets/game.svg'

export function LeftContainer() {
  return (
    <div>
      <RegistationContent>
        <TitleContent>
          <img src={gaming} alt="Controle de vídeo game" />
          <span>DuelMonsters</span>
        </TitleContent>
        <span>Os Decks mais acessados do momento!!!</span>
        <DeckContainer>
          <Deck />
          <Deck />
          <Deck />
        </DeckContainer>
        <MoreContent>
          <div>
            <Plus size={15} color="#FFFFFF" />
          </div>
          <span>Descubra mais</span>
        </MoreContent>
        <Icons>
          <StarAndCrescent size={24} color="#8D8D99" />
          <ToggleLeft size={24} color="#8D8D99" />
          <DownloadSimple size={24} color="#8D8D99" />
        </Icons>
      </RegistationContent>
    </div>
  )
}
