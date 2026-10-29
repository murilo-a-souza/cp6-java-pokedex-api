import { useEffect, useState } from "react";
import type { TipoPokemon } from "../../types/TipoPokemon.ts";
import { useNavigate } from "react-router-dom";

const URL_API: string = import.meta.env.VITE_API_URL;

export default function Pokemons() {
    document.title = "Pokemons";
    const navigate = useNavigate();
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

            } catch (error) {
                console.error("Houve um problema ao buscar os pokemons:", error);
            }
        };

        carregaPokedex();
    }, []);

    const handleExcluir = async (codigo: number, nome: string) => {
        const confirmado = window.confirm("Tem certeza que deseja excluir?");

        if (confirmado) {
            try {
                await fetch(`${URL_API}/${codigo}`, { method: 'DELETE' });

                setPokemons(prev => prev.filter(p => p.codigo !== codigo));

                console.log(`Pokemon ${nome} deletado com sucesso!`);
            } catch (error) {
                console.error("Erro ao excluir o pokémon:", error);
            }
        }
    };

    return (
        <main className="p-4">
            <table className="table-auto w-full border-collapse border border-slate-400 text-center">
                <caption className="text-lg font-bold my-2">Lista de pokemons capturados:</caption>
                <thead>
                <tr className="bg-slate-200">
                    <th className="border border-slate-400 p-2">Código</th>
                    <th className="border border-slate-400 p-2">Nome</th>
                    <th className="border border-slate-400 p-2">Categoria</th>
                    <th className="border border-slate-400 p-2">Altura</th>
                    <th className="border border-slate-400 p-2">Peso</th>
                    <th className="border border-slate-400 p-2">Data de captura</th>
                    <th className="border border-slate-400 p-2">Ações</th>
                </tr>
                </thead>
                <tbody>
                {pokemons.map((pokemon) => (
                    <tr key={pokemon.codigo} className="hover:bg-slate-50">
                        <td className="border border-slate-300 p-2">{pokemon.codigo}</td>
                        <td className="border border-slate-300 p-2">{pokemon.nome}</td>
                        <td className="border border-slate-300 p-2">{pokemon.categoria}</td>
                        <td className="border border-slate-300 p-2">{pokemon.altura}m</td>
                        <td className="border border-slate-300 p-2">{pokemon.peso}kg</td>
                        <td className="border border-slate-300 p-2">{pokemon.dataDeCaptura}</td>
                        <td className="border border-slate-300 p-2">
                            <button onClick={() => navigate(`/editar/${pokemon.codigo}`)} className="pr-2 rounded-md mr-4">
                                ✏️ Editar
                            </button>
                            <button
                                onClick={() => handleExcluir(pokemon.codigo, pokemon.nome)}
                                className="pl-2 rounded-md ml-4">
                                🗑️ Excluir
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </main>
    );
}
