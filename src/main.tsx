import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from 'react-router-dom'

import './globals.css'
import App from './App.tsx'
import Home from "./routes/Home";
import {RouterProvider} from "react-router-dom";
import Pesquisar from "./routes/Pesquisar";
import Cadastrar from "./routes/Cadastrar";
import Pokemons from "./routes/Pokemons";
import Editar from "./routes/Editar";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {index: true, element: <Home></Home>},
            {path: '/pesquisar', element: <Pesquisar></Pesquisar>},
            {path: '/cadastrar', element: <Cadastrar></Cadastrar>},
            {path: '/pokemons', element: <Pokemons></Pokemons>},
            {path: '/editar/:codigo', element: <Editar></Editar>},
        ],
    },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
