import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";
import type { TipoPokemon } from "../../types/TipoPokemon.ts";

const URL_API: string = import.meta.env.VITE_API_URL;

export default function Pesquisar() {
    document.title = "Pesquisar";
    const navigate = useNavigate();
    const [pokemons, setPokemons] = useState<TipoPokemon[]>([]);
    const [termoPesquisa, setTermoPesquisa] = useState<string>("");

    const handlePesquisar = async (e: FormEvent) => {
        e.preventDefault();

        if (!termoPesquisa.trim()) return;

        try {
            const response = await fetch(`${URL_API}/${termoPesquisa}`);

            if (!response.ok) {
                alert("Pokémon não encontrado!");
                return;
            }

            const data = await response.json();

            setPokemons(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("Erro ao buscar pokemon:", error);
        }
    };

    const handleExcluir = async (codigo: number, nome: string) => {
        const confirmado = window.confirm(`Tem certeza que deseja excluir o Pokémon ${nome}?`);

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
        <main className="flex flex-col items-center justify-center gap-8 p-4">
            <h1 className="text-2xl font-bold">Pesquisar pokemon</h1>

            <form onSubmit={handlePesquisar} className="w-full max-w-4xl flex flex-col gap-4">
                <div className="flex gap-2 justify-center max-w-md mx-auto w-full">
                    <input
                        type="text"
                        placeholder="Digite o código ou nome do pokemon"
                        value={termoPesquisa}
                        onChange={(e) => setTermoPesquisa(e.target.value)} // Atualiza o estado ao digitar
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                        Pesquisar
                    </button>
                </div>

                {pokemons.length > 0 && (
                    <table className="table-auto w-full border-collapse border border-slate-400 text-center mt-4">
                        <caption className="text-lg font-bold my-2">Resultado da pesquisa:</caption>
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
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/editar/${pokemon.codigo}`)}
                                        className="pr-2 rounded-md mr-4"
                                    >
                                        ✏️ Editar
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleExcluir(pokemon.codigo, pokemon.nome)}
                                        className="pl-2 rounded-md ml-4"
                                    >
                                        🗑️ Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
            </form>
        </main>
    );
}
