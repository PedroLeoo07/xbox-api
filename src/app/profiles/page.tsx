"use client";

import React, { useState } from "react";
import { SearchBar, ProfileCard, LoadingSpinner } from "@/components";
import { profileAPI } from "@/lib";
import { XboxProfile } from "@/types";

export default function ProfilesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [profiles, setProfiles] = useState<XboxProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Mock data para demonstração
  const mockProfiles: XboxProfile[] = [
    {
      xuid: "2533274792093064",
      gamertag: "ExampleGamer",
      gamerScore: 125450,
      accountTier: "Gold",
      xboxOneRep: "GoodPlayer",
      preferredColor: {
        primaryColor: "#107c10",
        secondaryColor: "#0e6e0e",
        tertiaryColor: "#005a00",
      },
      realName: "João Silva",
      bio: "Gamer apaixonado por RPGs e jogos de estratégia",
      location: "São Paulo, Brasil",
      tenure: 8,
      avatar: "/api/placeholder/100/100",
    },
    {
      xuid: "2533274792093065",
      gamertag: "ProGamer2024",
      gamerScore: 89750,
      accountTier: "Gold",
      xboxOneRep: "GoodPlayer",
      preferredColor: {
        primaryColor: "#ff6b35",
        secondaryColor: "#f7931e",
        tertiaryColor: "#ffdc00",
      },
      realName: "Maria Santos",
      bio: "Competitiva em FPS e entusiasta de jogos indie",
      location: "Rio de Janeiro, Brasil",
      tenure: 5,
      avatar: "/api/placeholder/100/100",
    },
    {
      xuid: "2533274792093066",
      gamertag: "RetroGamerBR",
      gamerScore: 67890,
      accountTier: "Silver",
      xboxOneRep: "GoodPlayer",
      preferredColor: {
        primaryColor: "#9b59b6",
        secondaryColor: "#8e44ad",
        tertiaryColor: "#6c3483",
      },
      bio: "Colecionador de jogos retrô e fan de plataforma",
      location: "Belo Horizonte, Brasil",
      tenure: 12,
      avatar: "/api/placeholder/100/100",
    },
  ];

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      const response = await profileAPI.searchProfiles(query);

      if (response.success) {
        setProfiles(response.data);
      } else {
        // Filtrar dados mock baseado na busca
        const filtered = mockProfiles.filter(
          (profile) =>
            profile.gamertag.toLowerCase().includes(query.toLowerCase()) ||
            profile.realName?.toLowerCase().includes(query.toLowerCase()) ||
            profile.location?.toLowerCase().includes(query.toLowerCase()),
        );
        setProfiles(filtered);
        setError("API não configurada - usando dados de demonstração");
      }
    } catch (err) {
      const filtered = mockProfiles.filter(
        (profile) =>
          profile.gamertag.toLowerCase().includes(query.toLowerCase()) ||
          profile.realName?.toLowerCase().includes(query.toLowerCase()) ||
          profile.location?.toLowerCase().includes(query.toLowerCase()),
      );
      setProfiles(filtered);
      setError("API não configurada - usando dados de demonstração");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileClick = (profile: XboxProfile) => {
    console.log("Visualizando perfil:", profile.gamertag);
    // Aqui você pode navegar para uma página de detalhes do perfil
    // router.push(`/profiles/${profile.xuid}`);
  };

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="section-header">
        <h1 className="section-title">Perfis Xbox</h1>
        <p className="section-subtitle">
          Busque e explore perfis de jogadores Xbox. Descubra estatísticas,
          conquistas e informações detalhadas sobre qualquer gamertag.
        </p>
      </div>

      {/* Search Section */}
      <section className="mb-8">
        <SearchBar
          onSearch={handleSearch}
          placeholder="Digite o gamertag ou nome real do jogador..."
          isLoading={isLoading}
          className="max-w-2xl mx-auto"
        />
      </section>

      {/* Error Message */}
      {error && (
        <div className="mb-8 p-4 bg-warning text-dark rounded-lg text-center">
          <strong>Aviso:</strong> {error}
        </div>
      )}

      {/* Search Results */}
      {searchQuery && (
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Resultados para "{searchQuery}"
            </h2>
            <div className="text-muted">
              {profiles.length}{" "}
              {profiles.length === 1
                ? "perfil encontrado"
                : "perfis encontrados"}
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : profiles.length > 0 ? (
            <div className="grid grid-2 gap-6">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.xuid}
                  profile={profile}
                  onClick={() => handleProfileClick(profile)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 opacity-50">🔍</div>
              <h3 className="text-xl font-semibold mb-2">
                Nenhum perfil encontrado
              </h3>
              <p className="text-muted">
                Tente buscar com um gamertag diferente ou verifique a
                ortografia.
              </p>
            </div>
          )}
        </section>
      )}

      {/* Features Section */}
      {!searchQuery && (
        <section className="mb-12" style={{ marginTop: "4rem" }}>
          <h2
            className="section-title"
            style={{ fontSize: "2rem", marginBottom: "2rem" }}
          >
            Recursos de Perfis
          </h2>
          <div className="grid">
            <div className="card feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Estatísticas Detalhadas</h3>
              <p className="feature-description">
                Veja gamerscore, tempo no Xbox, reputação e muito mais.
              </p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-title">Jogos Recentes</h3>
              <p className="feature-description">
                Descubra quais jogos o jogador tem jogado recentemente.
              </p>
            </div>
            <div className="card feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">Conquistas</h3>
              <p className="feature-description">
                Explore todas as conquistas desbloqueadas pelo jogador.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Popular Profiles */}
      {!searchQuery && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Perfis Populares</h2>
          <div className="grid grid-2 gap-6">
            {mockProfiles.slice(0, 2).map((profile) => (
              <ProfileCard
                key={profile.xuid}
                profile={profile}
                onClick={() => handleProfileClick(profile)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Help Section */}
      {!searchQuery && (
        <section style={{ textAlign: "center", marginTop: "4rem" }}>
          <div
            className="card"
            style={{ maxWidth: "800px", margin: "0 auto", padding: "2.5rem" }}
          >
            <h3 className="feature-title" style={{ marginBottom: "1.5rem" }}>
              💡 Como Buscar Perfis
            </h3>
            <div
              style={{
                textAlign: "left",
                color: "var(--text-secondary)",
                fontSize: "1rem",
                lineHeight: "1.8",
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                •{" "}
                <strong style={{ color: "var(--xbox-green-light)" }}>
                  Gamertag:
                </strong>{" "}
                Digite o nome de usuário exato do Xbox
              </p>
              <p style={{ marginBottom: "1rem" }}>
                •{" "}
                <strong style={{ color: "var(--xbox-green-light)" }}>
                  Nome Real:
                </strong>{" "}
                Busque pelo nome real do jogador
              </p>
              <p style={{ marginBottom: "1rem" }}>
                •{" "}
                <strong style={{ color: "var(--xbox-green-light)" }}>
                  Localização:
                </strong>{" "}
                Encontre jogadores por cidade ou país
              </p>
              <p>
                •{" "}
                <strong style={{ color: "var(--xbox-green-light)" }}>
                  Dicas:
                </strong>{" "}
                Use termos específicos para melhores resultados
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
