// import { ThemeProvider } from 'styled-components'
// import { Button } from './components/Button'

// import { GlobalStyle } from './styles/global'
// import { defaultTheme } from './styles/themes/default'
// import { authWithGoogle, createUser, signup } from './services/auth-service'
// import { Header } from './components/header'

// async function clickFunction1() {
//   await authWithGoogle()
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err))
// }

// const user: createUser = {
//   name: 'danillo',
//   email: 'danillorodriguesabreu1211313@gmail.com',
//   username: 'danilo_1231222',
//   password: 'Dan321!!!',
//   passwordConfirmation: 'Dan321!!!',
// }

// async function clickFunction2() {
//   await signup(user)
//     .then((data) => console.log(data))
//     .catch((err) => console.error(err))
// }

// export function App() {
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Button variant="primary" />
//       <Button variant="secondary" />
//       <Button variant="success" />
//       <Button variant="danger" />
//       <Button />

//       <Header />

//       <button onClick={clickFunction1}>Clique aqui</button>
//       <button onClick={clickFunction2}>Clique aqui</button>

//       <GlobalStyle />
//     </ThemeProvider>
//   )
// }
