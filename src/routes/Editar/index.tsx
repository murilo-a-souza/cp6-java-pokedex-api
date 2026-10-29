import { useParams, useNavigate } from "react-router-dom"; // Importado useNavigate
import type { TipoPokemon } from "../../types/TipoPokemon.ts";
import {type FormEvent, useEffect, useState} from "react"; // Importado FormEvent

const URL_API: string = import.meta.env.VITE_API_URL;

export default function Editar() {
    const { codigo } = useParams();
    const navigate = useNavigate(); // Hook para redirecionamento
    const [pokemon, setPokemon] = useState<TipoPokemon | null>(null);

    useEffect(() => {
        const carregaPokemon = async () => {
            try {
                const resposta = await fetch(`${URL_API}/${codigo}`);

                if (!resposta.ok) {
                    throw new Error("Erro ao buscar os dados do pokemon!");
                }
                const data: TipoPokemon = await resposta.json();
                setPokemon(data);

            } catch (error) {
                console.error("Houve um problema ao buscar o pokemon:", error);
            }
        };

        if (codigo) {
            carregaPokemon();
        }
    }, [codigo]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const pokemonAtualizado = {
            codigo: Number(codigo),
            nome: formData.get("nome") as string,
            categoria: formData.get("categoria") as string,
            altura: Number(formData.get("altura")),
            peso: Number(formData.get("peso")),
            dataDeCaptura: formData.get("dataDeCaptura") as string,
        };

        try {
            const resposta = await fetch(`${URL_API}/${codigo}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pokemonAtualizado),
            });

            if (!resposta.ok) {
                throw new Error("Erro ao salvar as alterações do pokemon.");
            }

            alert("Pokémon atualizado com sucesso!");
            navigate("/pokemons");

        } catch (error) {
            console.error("Erro no PUT:", error);
            alert("Não foi possível salvar as alterações.");
        }
    };

    return (
        <main className="p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
                <legend className="text-xl font-bold">Editar Pokemon</legend>
                <div className="flex gap-2">
                    <label htmlFor="nome" className="font-bold w-36">Nome:</label>
                    <input type="text" id="nome" name="nome" defaultValue={pokemon?.nome || ""} required className="border border-gray-300 rounded-md p-2"/>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="categoria" className="font-bold w-36">Categoria:</label>
                    <input type="text" id="categoria" name="categoria" defaultValue={pokemon?.categoria || ""} required className="border border-gray-300 rounded-md p-2"/>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="altura" className="font-bold w-36">Altura:</label>
                    <input type="number" id="altura" name="altura" step="0.1" defaultValue={pokemon?.altura || ""} required className="border border-gray-300 rounded-md p-2"/>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="peso" className="font-bold w-36">Peso:</label>
                    <input type="number" id="peso" name="peso" step="0.1" defaultValue={pokemon?.peso || ""} required className="border border-gray-300 rounded-md p-2"/>
                </div>
                <div className="flex gap-2">
                    <label htmlFor="dataDeCaptura" className="font-bold w-36">Data de Captura:</label>
                    <input type="date" id="dataDeCaptura" name="dataDeCaptura" defaultValue={pokemon?.dataDeCaptura || ""} required className="border border-gray-300 rounded-md p-2 w-62"/>
                </div>
                <div className="flex gap-2">
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
                        Salvar
                    </button>
                </div>
            </form>
        </main>
    );
}
