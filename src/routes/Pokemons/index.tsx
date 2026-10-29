import {useEffect, useState} from "react";
import type { TipoPokemon } from "../../types/TipoPokemon.ts";

const URL_API: string = import.meta.env.VITE_URL_API

export default function Pokemons() {
    document.title = "Pokemons";
    const [pokemons, setPokemons] = useState<TipoPokemon[]>([]);

    useEffect(() => {

        const carregaPokedex = async () => {

            try {
                const resposta = await fetch(URL_API);

                if (!resposta.ok) {
                    throw new Error("Erro na listagem dos pokemons!");
                }

                const data: TipoPokemon[] = await resposta.json();
                setPokemons(data);

                const resultado: any = await resposta.json();

                setPokemons(resultado.data);

            } catch (error) {
                console.error(error);
            }
        }

        carregaPokedex();

    }, []);
    return (
        <main>
            <table className="table-auto w-full border-collapse border border-slate-400 text-center">
                <caption>Lista de pokemons capturados:</caption>
                <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Altura</th>
                    <th>Peso</th>
                    <th>Data de captura</th>
                </tr>
                </thead>
                <tbody>
                {pokemons.map((pokemon) => (
                    <tr key={pokemon.codigo}>
                        <td>{pokemon.codigo}</td>
                        <td>{pokemon.nome}</td>
                        <td>{pokemon.categoria}</td>
                        <td>{pokemon.altura}</td>
                        <td>{pokemon.peso}</td>
                        <td>{pokemon.dataDeCaptura}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    )
}