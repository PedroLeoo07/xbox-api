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
          <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <span className="badge">🎮 Gaming Hub Powered by Xbox API</span>

            <h1 className="hero-title">Explore o Universo Xbox</h1>

            <p className="hero-subtitle">
              Descubra perfis de jogadores, conquistas épicas e estatísticas
              detalhadas em tempo real. Conecte-se ao mundo Xbox como nunca antes.
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
                placeholder="Digite uma gamertag para começar sua jornada..."
                isLoading={isLoading}
              />
            </div>

            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                justifyContent: "center",
                flexWrap: "wrap",
                animation: "fadeInUp 0.8s ease-out 0.6s both",
              }}
            >
              <div className="stat-item">
                <span style={{ fontSize: "1.75rem" }}>⚡</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Dados em</div>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "var(--xbox-green-light)",
                    }}
                  >
                    Tempo Real
                  </div>
                </div>
              </div>
              <div className="stat-item">
                <span style={{ fontSize: "1.75rem" }}>🎯</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Milhares de</div>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "var(--xbox-green-light)",
                    }}
                  >
                    Conquistas
                  </div>
                </div>
              </div>
              <div className="stat-item">
                <span style={{ fontSize: "1.75rem" }}>📊</span>
                <div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.25rem" }}>Análise</div>
                  <div
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 700,
                      color: "var(--xbox-green-light)",
                    }}
                  >
                    Detalhada
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
      <section style={{ padding: "5rem 0", position: "relative" }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Recursos Incríveis
            </h2>
            <p className="section-subtitle">
              Tudo que você precisa para acompanhar sua jornada no Xbox em um só lugar
            </p>
          </div>

          <div className="grid">
            <div className="card feature-card">
              <div className="feature-icon">👤</div>
              <h3 className="feature-title">
                Perfis Detalhados
              </h3>
              <p className="feature-description">
                Visualize informações completas de qualquer gamertag, incluindo
                GamerScore, tempo de conta, conquistas e muito mais em tempo real.
              </p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon">🎮</div>
              <h3 className="feature-title">
                Biblioteca de Jogos
              </h3>
              <p className="feature-description">
                Explore o catálogo completo de jogos Xbox com informações
                detalhadas, capturas de tela e análises de cada título.
              </p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon">🏆</div>
              <h3 className="feature-title">
                Sistema de Conquistas
              </h3>
              <p className="feature-description">
                Acompanhe todas as conquistas, progresso detalhado e estatísticas 
                de cada jogo em uma interface intuitiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          padding: "5rem 0",
          background: "linear-gradient(180deg, rgba(16, 124, 16, 0.05) 0%, var(--bg-secondary) 100%)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div 
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(16, 124, 16, 0.15) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: 800,
              marginBottom: "1rem",
              background: "linear-gradient(135deg, var(--xbox-green-light), var(--xbox-accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Pronto para Começar sua Jornada?
          </h2>
          <p
            style={{
              fontSize: "1.25rem",
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              maxWidth: "700px",
              margin: "0 auto 2.5rem",
              lineHeight: 1.6,
            }}
          >
            Comece a explorar o universo Xbox agora mesmo. Descubra perfis,
            conquistas e muito mais em tempo real.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              className="btn btn-primary"
              onClick={() => document.querySelector("input")?.focus()}
              style={{ minWidth: "180px" }}
            >
              🎮 Começar Agora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
