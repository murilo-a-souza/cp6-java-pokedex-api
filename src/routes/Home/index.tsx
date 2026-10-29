export default function Home() {
    document.title = "Home";
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold">CP 6 - Java</h1>
            <p className="text-lg">API RESTful de Pokedex com Java. Esse site permite ler a pokedex completa, pesquisar por código, editar, excluir e cadastrar pokemons.</p>
            <a href="https://cp6-java-pokedex-api.onrender.com/" className="text-blue-500 underline">Link da api</a>
        </main>
    )
}