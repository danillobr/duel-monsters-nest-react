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
} from './styles'

import gaming from '../../../../assets/game.svg'
import deckFarao from '../../../../assets/deck-farao.svg'
import deckKaiba from '../../../../assets/deck-kaiba.svg'
import deckJoey from '../../../../assets/deck-joey.svg'

export function LeftContainer() {
  return (
    <div>
      <RegistationContent>
        <TitleContent>
          <img src={gaming} alt="Controle de vídeo game" />
          <h1>DuelMonsters</h1>
        </TitleContent>

        <span>Os Decks mais acessados do momento!!!</span>

        <DeckContainer>
          <ul>
            <Deck>
              <a href="#">
                <img
                  src={deckFarao}
                  alt="Imagem do yugioh referente ao seu deck"
                />
              </a>

              <section>
                <h1>
                  Deck do Faraó<div>®</div>
                </h1>
                <p>Reino dos Duelistas</p>
                <span>
                  <div></div>
                  2.8K visualizações
                </span>
              </section>
            </Deck>
            <Deck>
              <a href="#">
                <img
                  src={deckKaiba}
                  alt="Imagem do Kaiba referente ao seu deck"
                />
              </a>

              <section>
                <h1>
                  Deck do Kaiba<div>®</div>
                </h1>
                <p>Batalha da Cidade</p>
                <span>
                  <div></div>
                  2.1K visualizações
                </span>
              </section>
            </Deck>
            <Deck>
              <a href="#">
                <img
                  src={deckJoey}
                  alt="Imagem do Joey referente ao seu deck"
                />
              </a>

              <section>
                <h1>
                  Deck do Joey<div>®</div>
                </h1>
                <p>Reino dos Duelistas</p>
                <span>
                  <div></div>
                  1.9K visualizações
                </span>
              </section>
            </Deck>
          </ul>
        </DeckContainer>

        <MoreContent>
          <div>
            <Plus size={15} weight="bold" color="#FFFFFF" />
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
