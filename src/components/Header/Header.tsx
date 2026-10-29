import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-2xl font-bold">Pokedex</h1>
            <nav>
                <ul className="flex flex-row gap-4">
                    <li><Link to="/" className="hover:text-blue-500">Home</Link></li>
                    <li><Link to="/pokemons" className="hover:text-blue-500">Pokemons</Link></li>
                    <li><Link to="/pesquisar" className="hover:text-blue-500">Pesquisar</Link></li>
                    <li><Link to="/cadastrar" className="hover:text-blue-500">Cadastrar</Link></li>
                </ul>
            </nav>
        </header>

    )
}