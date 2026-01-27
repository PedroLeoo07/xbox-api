"use client";

import React, { useState } from "react";
import { SearchBar, AchievementCard, LoadingSpinner } from "@/components";
import { achievementsAPI } from "@/lib";
import { Achievement } from "@/types";

const AchievementsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  // Mock data para demonstração
  const mockAchievements: Achievement[] = [
    {
      id: "achievement1",
      serviceConfigId: "service1",
      name: "Primeira Vitória",
      titleAssociations: [{ name: "Halo Infinite", id: 219630713 }],
      progressState: "Achieved",
      progression: {
        achievementState: "Achieved",
        requirements: [{ id: "1", current: "1", target: "1" }],
        timeUnlocked: "2024-01-15T10:30:00Z",
      },
      mediaAssets: [
        { name: "Icon", type: "Icon", url: "/api/placeholder/60/60" },
      ],
      platform: "Xbox",
      isSecret: false,
      description: "Ganhe sua primeira partida online no modo Arena",
      lockedDescription: "Conquista secreta relacionada ao modo Arena",
      productId: "product1",
      achievementType: "Standard",
      participationType: "Individual",
      timeWindow: { startDate: "", endDate: "" },
      rewards: [
        {
          name: "Gamerscore",
          description: "Points",
          value: "15",
          type: "Gamerscore",
          valueType: "Int",
        },
      ],
      estimatedTime: "30 minutes",
      deeplink: "",
      isRevoked: false,
    },
    {
      id: "achievement2",
      serviceConfigId: "service1",
      name: "Mestre da Velocidade",
      titleAssociations: [{ name: "Forza Horizon 5", id: 1738253896 }],
      progressState: "Achieved",
      progression: {
        achievementState: "Achieved",
        requirements: [{ id: "1", current: "100", target: "100" }],
        timeUnlocked: "2024-01-10T14:20:00Z",
      },
      mediaAssets: [
        { name: "Icon", type: "Icon", url: "/api/placeholder/60/60" },
      ],
      platform: "Xbox",
      isSecret: false,
      description: "Atinja 100 vitórias em corridas online",
      lockedDescription: "Conquista relacionada a corridas online",
      productId: "product2",
      achievementType: "Standard",
      participationType: "Individual",
      timeWindow: { startDate: "", endDate: "" },
      rewards: [
        {
          name: "Gamerscore",
          description: "Points",
          value: "50",
          type: "Gamerscore",
          valueType: "Int",
        },
      ],
      estimatedTime: "20 hours",
      deeplink: "",
      isRevoked: false,
    },
    {
      id: "achievement3",
      serviceConfigId: "service2",
      name: "Explorador dos Céus",
      titleAssociations: [
        { name: "Microsoft Flight Simulator", id: 1234567890 },
      ],
      progressState: "InProgress",
      progression: {
        achievementState: "InProgress",
        requirements: [{ id: "1", current: "7", target: "15" }],
        timeUnlocked: "",
      },
      mediaAssets: [
        { name: "Icon", type: "Icon", url: "/api/placeholder/60/60" },
      ],
      platform: "Xbox",
      isSecret: false,
      description: "Visite 15 aeroportos diferentes ao redor do mundo",
      lockedDescription: "Visite múltiplos aeroportos",
      productId: "product3",
      achievementType: "Standard",
      participationType: "Individual",
      timeWindow: { startDate: "", endDate: "" },
      rewards: [
        {
          name: "Gamerscore",
          description: "Points",
          value: "30",
          type: "Gamerscore",
          valueType: "Int",
        },
      ],
      estimatedTime: "5 hours",
      deeplink: "",
      isRevoked: false,
    },
    {
      id: "achievement4",
      serviceConfigId: "service3",
      name: "Lenda Pirata",
      titleAssociations: [{ name: "Sea of Thieves", id: 987654321 }],
      progressState: "NotStarted",
      progression: {
        achievementState: "NotStarted",
        requirements: [{ id: "1", current: "0", target: "50" }],
        timeUnlocked: "",
      },
      mediaAssets: [
        { name: "Icon", type: "Icon", url: "/api/placeholder/60/60" },
      ],
      platform: "Xbox",
      isSecret: true,
      description: "Torne-se uma verdadeira lenda dos mares",
      lockedDescription: "Conquista secreta relacionada à progressão pirata",
      productId: "product4",
      achievementType: "Rare",
      participationType: "Individual",
      timeWindow: { startDate: "", endDate: "" },
      rewards: [
        {
          name: "Gamerscore",
          description: "Points",
          value: "100",
          type: "Gamerscore",
          valueType: "Int",
        },
      ],
      estimatedTime: "50 hours",
      deeplink: "",
      isRevoked: false,
    },
    {
      id: "achievement5",
      serviceConfigId: "service4",
      name: "Estrategista Supremo",
      titleAssociations: [{ name: "Age of Empires IV", id: 111222333 }],
      progressState: "InProgress",
      progression: {
        achievementState: "InProgress",
        requirements: [{ id: "1", current: "3", target: "8" }],
        timeUnlocked: "",
      },
      mediaAssets: [
        { name: "Icon", type: "Icon", url: "/api/placeholder/60/60" },
      ],
      platform: "Xbox",
      isSecret: false,
      description: "Complete 8 campanhas diferentes no nível difícil",
      lockedDescription: "Complete múltiplas campanhas",
      productId: "product5",
      achievementType: "Challenge",
      participationType: "Individual",
      timeWindow: { startDate: "", endDate: "" },
      rewards: [
        {
          name: "Gamerscore",
          description: "Points",
          value: "75",
          type: "Gamerscore",
          valueType: "Int",
        },
      ],
      estimatedTime: "30 hours",
      deeplink: "",
      isRevoked: false,
    },
  ];

  const filters = [
    { key: "", label: "Todas", icon: "🏆" },
    { key: "achieved", label: "Desbloqueadas", icon: "✅" },
    { key: "inprogress", label: "Em Progresso", icon: "⏳" },
    { key: "notstarted", label: "Não Iniciadas", icon: "🔒" },
    { key: "secret", label: "Secretas", icon: "🤐" },
  ];

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      // Em um cenário real, você buscaria conquistas por gamertag
      const response = await achievementsAPI.getAchievements("example_xuid");

      if (response.success) {
        const filtered = response.data.filter(
          (achievement) =>
            achievement.name.toLowerCase().includes(query.toLowerCase()) ||
            achievement.description
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            achievement.titleAssociations.some((title) =>
              title.name.toLowerCase().includes(query.toLowerCase()),
            ),
        );
        setAchievements(filtered);
      } else {
        // Filtrar dados mock baseado na busca
        const filtered = mockAchievements.filter(
          (achievement) =>
            achievement.name.toLowerCase().includes(query.toLowerCase()) ||
            achievement.description
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            achievement.titleAssociations.some((title) =>
              title.name.toLowerCase().includes(query.toLowerCase()),
            ),
        );
        setAchievements(filtered);
        setError("API não configurada - usando dados de demonstração");
      }
    } catch (err) {
      const filtered = mockAchievements.filter(
        (achievement) =>
          achievement.name.toLowerCase().includes(query.toLowerCase()) ||
          achievement.description.toLowerCase().includes(query.toLowerCase()) ||
          achievement.titleAssociations.some((title) =>
            title.name.toLowerCase().includes(query.toLowerCase()),
          ),
      );
      setAchievements(filtered);
      setError("API não configurada - usando dados de demonstração");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    let filtered = mockAchievements;

    switch (filter) {
      case "achieved":
        filtered = mockAchievements.filter(
          (a) => a.progression.achievementState === "Achieved",
        );
        break;
      case "inprogress":
        filtered = mockAchievements.filter(
          (a) => a.progression.achievementState === "InProgress",
        );
        break;
      case "notstarted":
        filtered = mockAchievements.filter(
          (a) => a.progression.achievementState === "NotStarted",
        );
        break;
      case "secret":
        filtered = mockAchievements.filter((a) => a.isSecret);
        break;
      default:
        filtered = mockAchievements;
    }

    setAchievements(filtered);
  };

  const handleAchievementClick = (achievement: Achievement) => {
    console.log("Visualizando conquista:", achievement.name);
    // Aqui você pode mostrar um modal ou navegar para detalhes
  };

  const displayedAchievements = searchQuery
    ? achievements
    : selectedFilter
      ? achievements
      : mockAchievements;

  const totalGamerscore = displayedAchievements.reduce(
    (sum: number, achievement: Achievement) => {
      const gamerscore = achievement.rewards?.find(
        (r) => r.type === "Gamerscore",
      );
      return sum + parseInt(gamerscore?.value || "0");
    },
    0,
  );

  const unlockedCount = displayedAchievements.filter(
    (a: Achievement) => a.progression.achievementState === "Achieved",
  ).length;

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Conquistas Xbox</h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Explore conquistas desbloqueadas, acompanhe seu progresso e descubra
          novos desafios nos seus jogos favoritos do Xbox.
        </p>
      </div>

      {/* Search and Stats */}
      <section className="mb-8">
        <div className="grid grid-3 gap-4 mb-6">
          <div className="card text-center">
            <div className="text-2xl font-bold text-primary">
              {displayedAchievements.length}
            </div>
            <div className="text-muted text-sm">Total de Conquistas</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-success">
              {unlockedCount}
            </div>
            <div className="text-muted text-sm">Desbloqueadas</div>
          </div>
          <div className="card text-center">
            <div className="text-2xl font-bold text-warning">
              {totalGamerscore.toLocaleString()}G
            </div>
            <div className="text-muted text-sm">Gamerscore Total</div>
          </div>
        </div>

        <SearchBar
          onSearch={handleSearch}
          placeholder="Buscar conquistas por nome, descrição ou jogo..."
          isLoading={isLoading}
          className="max-w-2xl mx-auto mb-6"
        />

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleFilterChange(filter.key)}
              className={`btn btn-sm flex items-center gap-2 ${
                selectedFilter === filter.key ? "btn-primary" : "btn-secondary"
              }`}
            >
              <span>{filter.icon}</span>
              {filter.label}
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
              : selectedFilter
                ? `${filters.find((f) => f.key === selectedFilter)?.label} Conquistas`
                : "Todas as Conquistas"}
          </h2>
          <div className="text-muted">
            {displayedAchievements.length} conquistas
          </div>
        </div>
      </section>

      {/* Achievements Grid */}
      <section className="mb-12">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : displayedAchievements.length > 0 ? (
          <div className="grid grid-2 gap-6">
            {displayedAchievements.map((achievement: Achievement) => (
              <AchievementCard
                key={achievement.id}
                achievement={achievement}
                onClick={() => handleAchievementClick(achievement)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 opacity-50">🏆</div>
            <h3 className="text-xl font-semibold mb-2">
              Nenhuma conquista encontrada
            </h3>
            <p className="text-muted">
              {searchQuery
                ? "Tente buscar com termos diferentes ou verifique a ortografia."
                : "Nenhuma conquista disponível nesta categoria."}
            </p>
          </div>
        )}
      </section>

      {/* Achievement Types Overview */}
      {!searchQuery && !selectedFilter && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Tipos de Conquistas
          </h2>
          <div className="grid grid-4 gap-4">
            <div className="card text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold">Standard</h3>
              <p className="text-sm text-muted">Conquistas básicas do jogo</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">💎</div>
              <h3 className="font-semibold">Rare</h3>
              <p className="text-sm text-muted">Conquistas raras e difíceis</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h3 className="font-semibold">Challenge</h3>
              <p className="text-sm text-muted">Desafios específicos</p>
            </div>
            <div className="card text-center">
              <div className="text-3xl mb-2">🤐</div>
              <h3 className="font-semibold">Secret</h3>
              <p className="text-sm text-muted">Conquistas secretas</p>
            </div>
          </div>
        </section>
      )}

      {/* Progress Overview */}
      {!searchQuery && !selectedFilter && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Progresso Geral
          </h2>
          <div className="card max-w-2xl mx-auto">
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Conquistas Desbloqueadas</span>
                <span>
                  {unlockedCount} / {mockAchievements.length}
                </span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar"
                  style={{
                    width: `${(unlockedCount / mockAchievements.length) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="grid grid-2 gap-4 text-center">
              <div>
                <div className="text-lg font-bold text-success">
                  {Math.round((unlockedCount / mockAchievements.length) * 100)}%
                </div>
                <div className="text-muted text-sm">Completado</div>
              </div>
              <div>
                <div className="text-lg font-bold text-primary">
                  {totalGamerscore.toLocaleString()}
                </div>
                <div className="text-muted text-sm">Gamerscore Obtido</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Help Section */}
      <section className="text-center">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Como Funciona</h3>
          <div className="text-left text-muted space-y-2">
            <p>
              • <strong>Desbloqueadas:</strong> Conquistas já completadas pelo
              jogador
            </p>
            <p>
              • <strong>Em Progresso:</strong> Conquistas com progresso parcial
            </p>
            <p>
              • <strong>Não Iniciadas:</strong> Conquistas ainda não começadas
            </p>
            <p>
              • <strong>Secretas:</strong> Conquistas com critérios ocultos
            </p>
            <p>
              • <strong>Gamerscore:</strong> Pontos obtidos por conquistar
              achievements
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AchievementsPage;
