import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center gap-4 mb-5">
            <h1 className="text-2xl font-bold">Pokedex</h1>
            <nav>
                <ul className="flex flex-row gap-4 w-full justify-center border">
                    <li><Link to="/" className="hover:text-red-500 px-4 py-2 rounded-md">Home</Link></li>
                    <li><Link to="/pokemons" className="hover:text-red-500 px-4 py-2 rounded-md">Pokemons</Link></li>
                    <li><Link to="/pesquisar" className="hover:text-red-500 px-4 py-2 rounded-md">Pesquisar</Link></li>
                    <li><Link to="/cadastrar" className="hover:text-red-500 px-4 py-2 rounded-md">Cadastrar</Link></li>
                </ul>
            </nav>
        </header>

    )
}