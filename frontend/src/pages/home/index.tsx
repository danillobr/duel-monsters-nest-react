import React from 'react'
import { Link } from 'react-router-dom'

export function Home() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <Link to="/signup">Ir para a página de cadastro</Link>
    </div>
  )
}
