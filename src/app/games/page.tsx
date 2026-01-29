"use client";

import React, { useState, useEffect } from "react";
import { SearchBar, GameCard, LoadingSpinner, StatCard } from "@/components";
import { gamesAPI } from "@/lib";
import { XboxGame } from "@/types";

export default function GamesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState<XboxGame[]>([]);
  const [filteredGames, setFilteredGames] = useState<XboxGame[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedDeveloper, setSelectedDeveloper] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Load all games when component mounts
  useEffect(() => {
    loadGames();
  }, []);

  // Filter games when search query or filters change
  useEffect(() => {
    filterGames();
  }, [games, searchQuery, selectedGenre, selectedDeveloper]);

  const loadGames = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await gamesAPI.getAllGames();
      if (response.success) {
        setGames(response.data);
      } else {
        setError(response.error || "Erro ao carregar jogos");
      }
    } catch (err) {
      setError("Erro de conexão com a API");
    } finally {
      setIsLoading(false);
    }
  };

  const filterGames = () => {
    let filtered = [...games];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (game) =>
          game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.developers.some((dev) =>
            dev.toLowerCase().includes(searchQuery.toLowerCase()),
          ) ||
          game.publishers.some((pub) =>
            pub.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      );
    }

    // Filter by genre
    if (selectedGenre) {
      filtered = filtered.filter((game) =>
        game.genre.some((g) =>
          g.toLowerCase().includes(selectedGenre.toLowerCase()),
        ),
      );
    }

    // Filter by developer
    if (selectedDeveloper) {
      filtered = filtered.filter((game) =>
        game.developers.some((dev) =>
          dev.toLowerCase().includes(selectedDeveloper.toLowerCase()),
        ),
      );
    }

    setFilteredGames(filtered);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const getAllGenres = () => {
    const genres = new Set<string>();
    games.forEach((game) => {
      game.genre.forEach((g) => g && genres.add(g));
    });
    return Array.from(genres).sort();
  };

  const getAllDevelopers = () => {
    const developers = new Set<string>();
    games.forEach((game) => {
      game.developers.forEach((dev) => dev && developers.add(dev));
    });
    return Array.from(developers).sort();
  };

  return (
    <div className="container py-8">
      <div className="section-header">
        <h1 className="section-title">Catálogo de Jogos Xbox</h1>
        <p className="section-subtitle">
          Explore milhares de jogos disponíveis para Xbox. Use os filtros abaixo
          para encontrar seus jogos favoritos.
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Buscar jogos por nome, desenvolvedor ou publisher..."
        />

        <div className="flex flex-wrap gap-4">
          <div className="form-group min-w-64">
            <label htmlFor="genre-filter" className="form-label">
              Filtrar por Gênero
            </label>
            <select
              id="genre-filter"
              className="form-input"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              <option value="">Todos os gêneros</option>
              {getAllGenres().map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group min-w-64">
            <label htmlFor="developer-filter" className="form-label">
              Filtrar por Desenvolvedor
            </label>
            <select
              id="developer-filter"
              className="form-input"
              value={selectedDeveloper}
              onChange={(e) => setSelectedDeveloper(e.target.value)}
            >
              <option value="">Todos os desenvolvedores</option>
              {getAllDevelopers()
                .slice(0, 50)
                .map((developer) => (
                  <option key={developer} value={developer}>
                    {developer}
                  </option>
                ))}
            </select>
          </div>

          {(selectedGenre || selectedDeveloper || searchQuery) && (
            <button
              className="btn btn-secondary self-end"
              onClick={() => {
                setSearchQuery("");
                setSelectedGenre("");
                setSelectedDeveloper("");
              }}
            >
              Limpar Filtros
            </button>
          )}
        </div>
      </div>

      <div className="mb-6 text-muted">
        {isLoading
          ? "Carregando jogos..."
          : `${filteredGames.length} jogos encontrados${games.length > 0 ? ` de ${games.length} total` : ""}`}
      </div>

      {error && (
        <div className="card mb-6">
          <div className="card-content">
            <div className="text-center text-error">
              <h3 className="text-xl font-semibold mb-2">
                Erro ao carregar jogos
              </h3>
              <p className="mb-4">{error}</p>
              <button onClick={loadGames} className="btn btn-primary">
                Tentar novamente
              </button>
            </div>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : filteredGames.length > 0 ? (
        <div className="grid grid-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => {
                console.log("Game clicked:", game.name);
              }}
            />
          ))}
        </div>
      ) : games.length > 0 ? (
        <div className="card">
          <div className="card-content text-center">
            <h3 className="text-xl font-semibold mb-2">
              Nenhum jogo encontrado
            </h3>
            <p className="text-muted">
              Tente ajustar seus filtros de busca para encontrar jogos.
            </p>
          </div>
        </div>
      ) : null}

      {/* Seção de estatísticas - só mostra quando tem dados carregados */}
      {!isLoading && games.length > 0 && (
        <section className="mt-12" style={{ marginTop: "5rem" }}>
          <h2 className="section-title" style={{ fontSize: "2rem", marginBottom: "2.5rem" }}>
            Estatísticas do Catálogo
          </h2>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <div className="card feature-card">
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--xbox-green-light)", marginBottom: "0.5rem" }}>
                {games.length}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Jogos Disponíveis</div>
            </div>
            <div className="card feature-card">
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--xbox-accent)", marginBottom: "0.5rem" }}>
                {getAllGenres().length}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Gêneros</div>
            </div>
            <div className="card feature-card">
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--xbox-purple)", marginBottom: "0.5rem" }}>
                {new Set(games.flatMap((g) => g.publishers)).size}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Publishers</div>
            </div>
            <div className="card feature-card">
              <div style={{ fontSize: "2.5rem", fontWeight: 900, color: "var(--xbox-blue)", marginBottom: "0.5rem" }}>
                {getAllDevelopers().length}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "1rem" }}>Desenvolvedores</div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
