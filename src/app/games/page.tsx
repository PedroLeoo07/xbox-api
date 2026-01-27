"use client";

import { useState } from "react";
import { SearchBar, GameCard, LoadingSpinner } from "@/components";
import { gamesAPI } from "@/lib";
import { XboxGame } from "@/types";

export default function GamesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<XboxGame[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Mock data para demonstração
  const mockGames: XboxGame[] = [
    {
      titleId: "219630713",
      name: "Halo Infinite",
      type: "Game",
      devices: ["Xbox Series X|S", "Xbox One", "PC"],
      displayImage: "/api/placeholder/200/200",
      description:
        "A lendária franquia Halo retorna com a campanha Master Chief mais ampla até hoje e um modo multiplayer gratuito.",
      publisherName: "Microsoft Studios",
      developerName: "343 Industries",
      releaseDate: "2021-12-08",
      category: "Shooter",
    },
    {
      titleId: "1738253896",
      name: "Forza Horizon 5",
      type: "Game",
      devices: ["Xbox Series X|S", "Xbox One", "PC"],
      displayImage: "/api/placeholder/200/200",
      description:
        "Explore os mundos vibrantes e em constante evolução do México com ação de corrida ilimitada e divertida.",
      publisherName: "Microsoft Studios",
      developerName: "Playground Games",
      releaseDate: "2021-11-09",
      category: "Racing",
    },
    {
      titleId: "1234567890",
      name: "Microsoft Flight Simulator",
      type: "Game",
      devices: ["Xbox Series X|S", "PC"],
      displayImage: "/api/placeholder/200/200",
      description:
        "Voe por todo o mundo em sua aeronave favorita. O simulador de voo mais avançado já criado.",
      publisherName: "Microsoft Studios",
      developerName: "Asobo Studio",
      releaseDate: "2020-08-18",
      category: "Simulation",
    },
    {
      titleId: "987654321",
      name: "Sea of Thieves",
      type: "Game",
      devices: ["Xbox Series X|S", "Xbox One", "PC"],
      displayImage: "/api/placeholder/200/200",
      description:
        "Um jogo de aventura pirata multijogador onde você e sua tripulação exploram o mundo em busca de tesouros.",
      publisherName: "Microsoft Studios",
      developerName: "Rare",
      releaseDate: "2018-03-20",
      category: "Adventure",
    },
    {
      titleId: "555666777",
      name: "Gears 5",
      type: "Game",
      devices: ["Xbox Series X|S", "Xbox One", "PC"],
      displayImage: "/api/placeholder/200/200",
      description:
        "Kait Diaz descobre sua conexão com o inimigo e descobre o verdadeiro perigo para Sera.",
      publisherName: "Microsoft Studios",
      developerName: "The Coalition",
      releaseDate: "2019-09-10",
      category: "Action",
    },
    {
      titleId: "111222333",
      name: "Age of Empires IV",
      type: "Game",
      devices: ["Xbox Series X|S", "PC"],
      displayImage: "/api/placeholder/200/200",
      description:
        "Um dos jogos de estratégia em tempo real mais amados retorna para uma nova geração.",
      publisherName: "Microsoft Studios",
      developerName: "Relic Entertainment",
      releaseDate: "2021-10-28",
      category: "Strategy",
    },
  ];

  const categories = [
    "Action",
    "Adventure",
    "Racing",
    "Shooter",
    "Strategy",
    "Simulation",
    "RPG",
    "Sports",
  ];

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const response = await gamesAPI.searchGames(query);

      if (response.success) {
        setGames(response.data);
      } else {
        // Filtrar dados mock baseado na busca
        const filtered = mockGames.filter(
          (game) =>
            game.name.toLowerCase().includes(query.toLowerCase()) ||
            game.description?.toLowerCase().includes(query.toLowerCase()) ||
            game.category?.toLowerCase().includes(query.toLowerCase()) ||
            game.publisherName?.toLowerCase().includes(query.toLowerCase()) ||
            game.developerName?.toLowerCase().includes(query.toLowerCase()),
        );
        setGames(filtered);
        setError("API não configurada - usando dados de demonstração");
      }
    } catch (err) {
      const filtered = mockGames.filter(
        (game) =>
          game.name.toLowerCase().includes(query.toLowerCase()) ||
          game.description?.toLowerCase().includes(query.toLowerCase()) ||
          game.category?.toLowerCase().includes(query.toLowerCase()) ||
          game.publisherName?.toLowerCase().includes(query.toLowerCase()) ||
          game.developerName?.toLowerCase().includes(query.toLowerCase()),
      );
      setGames(filtered);
      setError("API não configurada - usando dados de demonstração");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    setGames(
      category
        ? mockGames.filter((game) => game.category === category)
        : mockGames,
    );
  };

  const handleGameClick = (game: XboxGame) => {
    console.log("Visualizando jogo:", game.name);
    // Aqui você pode navegar para uma página de detalhes do jogo
    // router.push(`/games/${game.titleId}`);
  };

  const displayedGames = searchQuery
    ? games
    : selectedCategory
      ? games
      : mockGames;

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Catálogo de Jogos Xbox</h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Explore o vasto catálogo de jogos disponíveis no Xbox. Descubra novos
          títulos, veja informações detalhadas e encontre sua próxima aventura.
        </p>
      </div>

      {/* Search and Filters */}
      <section className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
          <div className="flex-1 max-w-2xl">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar jogos por nome, categoria ou desenvolvedor..."
              isLoading={isLoading}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => handleCategoryFilter("")}
            className={`btn btn-sm ${selectedCategory === "" ? "btn-primary" : "btn-secondary"}`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`btn btn-sm ${selectedCategory === category ? "btn-primary" : "btn-secondary"}`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-warning text-dark rounded-lg text-center">
          <strong>Aviso:</strong> {error}
        </div>
      )}

      {/* Results Header */}
      <section className="mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">
            {searchQuery
              ? `Resultados para "${searchQuery}"`
              : selectedCategory
                ? `Jogos de ${selectedCategory}`
                : "Jogos em Destaque"}
          </h2>
          <div className="text-muted">
            {displayedGames.length}{" "}
            {displayedGames.length === 1 ? "jogo" : "jogos"}
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="mb-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : displayedGames.length > 0 ? (
          <div className="grid grid-3 gap-6">
            {displayedGames.map((game) => (
              <GameCard
                key={game.titleId}
                game={game}
                onClick={() => handleGameClick(game)}
                showLastPlayed={false}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🎮</div>
            <h3 className="text-xl font-semibold mb-2">
              Nenhum jogo encontrado
            </h3>
            <p className="text-muted">
              {searchQuery
                ? "Tente buscar com termos diferentes ou verifique a ortografia."
                : "Nenhum jogo disponível nesta categoria."}
            </p>
          </div>
        )}
      </section>

      {/* Statistics */}
      {!searchQuery && !selectedCategory && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Estatísticas do Catálogo
          </h2>
          <div className="grid grid-4 gap-6">
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {mockGames.length}
              </div>
              <div className="text-muted">Jogos Disponíveis</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {categories.length}
              </div>
              <div className="text-muted">Categorias</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {new Set(mockGames.map((g) => g.publisherName)).size}
              </div>
              <div className="text-muted">Publishers</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {mockGames.filter((g) => g.devices?.includes("PC")).length}
              </div>
              <div className="text-muted">Jogos para PC</div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Overview */}
      {!searchQuery && !selectedCategory && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Explore por Categoria
          </h2>
          <div className="grid grid-4 gap-4">
            {categories.map((category) => {
              const categoryCount = mockGames.filter(
                (g) => g.category === category,
              ).length;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className="card text-center hover:scale-105 transition-transform cursor-pointer"
                >
                  <div className="text-2xl mb-2">
                    {category === "Action" && "⚔️"}
                    {category === "Adventure" && "🗺️"}
                    {category === "Racing" && "🏎️"}
                    {category === "Shooter" && "🔫"}
                    {category === "Strategy" && "🧠"}
                    {category === "Simulation" && "✈️"}
                    {category === "RPG" && "🐉"}
                    {category === "Sports" && "⚽"}
                  </div>
                  <h3 className="font-semibold">{category}</h3>
                  <p className="text-sm text-muted">{categoryCount} jogos</p>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* API Info */}
      <section className="text-center">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Sobre o Catálogo</h3>
          <p className="text-muted mb-4">
            Este catálogo exibe jogos disponíveis na plataforma Xbox, incluindo
            títulos para Xbox Series X|S, Xbox One e PC. Os dados são
            atualizados regularmente através da Xbox API.
          </p>
          <div className="flex gap-2 justify-center">
            <span className="badge badge-secondary">Xbox Series X|S</span>
            <span className="badge badge-secondary">Xbox One</span>
            <span className="badge badge-secondary">PC Game Pass</span>
          </div>
        </div>
      </section>
    </div>
  );
}
