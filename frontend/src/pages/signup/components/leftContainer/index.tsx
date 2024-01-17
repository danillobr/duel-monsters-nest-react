import {
  StarAndCrescent,
  DownloadSimple,
  ToggleLeft,
  Plus,
} from '@phosphor-icons/react'
import {
  Deck,
  Icons,
  MoreContent,
  RegistationContent,
  TitleContent,
} from '../../styles'

import gaming from '../../../../assets/Game.svg'

export function LeftContainer() {
  return (
    <div>
      <RegistationContent>
        <TitleContent>
          <img src={gaming} alt="Controle de vídeo game" />
          <span>DuelMonsters</span>
        </TitleContent>
        <span>Os Decks mais acessados do momento!!!</span>
        <Deck />
        <Deck />
        <Deck />
        <MoreContent>
          <Plus size={32} color="#00b37e" />
          <span>Descubra mais</span>
        </MoreContent>
        <Icons>
          <StarAndCrescent size={32} color="#00b37e" />
          <ToggleLeft size={32} color="#00b37e" />
          <DownloadSimple size={32} color="#00b37e" />
        </Icons>
      </RegistationContent>
    </div>
  )
}
