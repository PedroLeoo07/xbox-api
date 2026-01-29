"use client";

import React, { useState } from "react";
import { SearchBar, ProfileCard, LoadingSpinner } from "@/components";
import { profileAPI } from "@/lib";
import { XboxProfile } from "@/types";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState<XboxProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  const mockProfile: XboxProfile = {
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
    bio: "Gamer apaixonado por jogos",
    location: "São Paulo, Brasil",
    tenure: 8,
    avatar: "/api/placeholder/100/100",
  };

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);
    try {
      const response = await profileAPI.searchProfiles(query);
      if (response.success) {
        setProfiles(response.data);
      } else {
        setProfiles([mockProfile]);
        setError("Usando dados de demonstração");
      }
    } catch {
      setProfiles([mockProfile]);
      setError("Usando dados de demonstração");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <span className="badge">🎮 Gaming Hub</span>

            <h1 className="hero-title">Explore o Universo Xbox</h1>

            <p className="hero-subtitle">
              Descubra perfis de jogadores, conquistas épicas e estatísticas
              detalhadas em tempo real com nossa plataforma integrada à Xbox API
            </p>

            <div
              style={{
                maxWidth: "700px",
                margin: "0 auto 3rem",
                animation: "fadeInUp 0.8s ease-out 0.4s both",
              }}
            >
              <SearchBar
                onSearch={handleSearch}
                placeholder="Digite uma gamertag para começar..."
                isLoading={isLoading}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "2rem",
                justifyContent: "center",
                flexWrap: "wrap",
                animation: "fadeInUp 0.8s ease-out 0.6s both",
              }}
            >
              <div className="stat-item">
                <span style={{ fontSize: "1.5rem" }}>⚡</span>
                <div>
                  <div className="stat-label">Dados</div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--xbox-green-light)",
                    }}
                  >
                    Tempo Real
                  </div>
                </div>
              </div>
              <div className="stat-item">
                <span style={{ fontSize: "1.5rem" }}>🎯</span>
                <div>
                  <div className="stat-label">Acompanhe</div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--xbox-green-light)",
                    }}
                  >
                    Conquistas
                  </div>
                </div>
              </div>
              <div className="stat-item">
                <span style={{ fontSize: "1.5rem" }}>📊</span>
                <div>
                  <div className="stat-label">Analise</div>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--xbox-green-light)",
                    }}
                  >
                    Estatísticas
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {isLoading && (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      )}

      {error && (
        <div
          className="container"
          style={{ textAlign: "center", padding: "2rem 0" }}
        >
          <p style={{ color: "var(--text-muted)" }}>{error}</p>
        </div>
      )}

      {!isLoading && profiles.length > 0 && (
        <section style={{ padding: "2rem 0" }}>
          <div className="container">
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 700,
                marginBottom: "1.5rem",
                color: "var(--text-primary)",
              }}
            >
              Resultados da Busca
            </h2>
            <div className="grid">
              {profiles.map((profile) => (
                <ProfileCard key={profile.xuid} profile={profile} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "2.5rem",
                fontWeight: 800,
                marginBottom: "1rem",
                background:
                  "linear-gradient(135deg, var(--xbox-green-light), var(--xbox-green))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Recursos Principais
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.125rem" }}>
              Tudo que você precisa para acompanhar sua jornada no Xbox
            </p>
          </div>

          <div className="grid">
            <div className="card">
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>👤</div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Perfis Detalhados
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Visualize informações completas de qualquer gamer tag, incluindo
                GamerScore, tempo de conta e muito mais.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🎮</div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Biblioteca de Jogos
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Explore o catálogo completo de jogos Xbox com informações
                detalhadas sobre cada título.
              </p>
            </div>

            <div className="card">
              <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🏆</div>
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 600,
                  marginBottom: "0.5rem",
                }}
              >
                Sistema de Conquistas
              </h3>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
                Acompanhe todas as conquistas, progresso e estatísticas de cada
                jogo em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "4rem 0",
          background:
            "linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "var(--text-primary)",
            }}
          >
            Pronto para começar?
          </h2>
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              maxWidth: "600px",
              margin: "0 auto 2rem",
            }}
          >
            Comece a explorar o universo Xbox agora mesmo. Busque qualquer
            gamertag e descubra um mundo de informações.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => document.querySelector("input")?.focus()}
          >
            Começar Agora
          </button>
        </div>
      </section>
    </div>
  );
}
