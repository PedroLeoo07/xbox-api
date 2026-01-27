"use client";

import React, { useState, useEffect } from "react";
import {
  SearchBar,
  ProfileCard,
  GameCard,
  AchievementCard,
  LoadingSpinner,
} from "@/components";
import { profileAPI } from "@/lib";
import { XboxProfile, XboxGame, Achievement } from "@/types";
import Link from "next/link";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState<XboxProfile[]>([]);
  const [featuredGames] = useState<XboxGame[]>([
    {
      id: 1,
      name: "Halo Infinite",
      genre: ["Shooter", "Action"],
      developers: ["343 Industries"],
      publishers: ["Microsoft Studios"],
      releaseDates: {
        Japan: "2021-12-08",
        NorthAmerica: "2021-12-08",
        Europe: "2021-12-08",
        Australia: "2021-12-08",
      },
    },
    {
      id: 2,
      name: "Forza Horizon 5",
      genre: ["Racing", "Sports"],
      developers: ["Playground Games"],
      publishers: ["Microsoft Studios"],
      releaseDates: {
        Japan: "2021-11-09",
        NorthAmerica: "2021-11-09",
        Europe: "2021-11-09",
        Australia: "2021-11-09",
      },
    },
  ]);
  const [recentAchievements] = useState<Achievement[]>([
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
      description: "Ganhe sua primeira partida online",
      lockedDescription: "Conquista secreta",
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
      estimatedTime: "5 minutes",
      deeplink: "",
      isRevoked: false,
    },
  ]);
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
    bio: "Gamer apaixonado por RPGs e jogos de estratégia",
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
        setError("API não configurada - usando dados de demonstração");
      }
    } catch (err) {
      setProfiles([mockProfile]);
      setError("API não configurada - usando dados de demonstração");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      <section style={{
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 1rem',
        background: 'linear-gradient(135deg, #0a0b0e 0%, #1a1d24 50%, #0e1014 100%)',
        borderBottom: '1px solid rgba(16, 124, 16, 0.3)'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            background: 'rgba(16, 124, 16, 0.1)',
            border: '1px solid rgba(16, 124, 16, 0.3)'
          }}>
            <span style={{ fontSize: '2.25rem' }}>🎮</span>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#16c716' }}>XBOX GAMING HUB</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
            fontWeight: 900,
            marginBottom: '1.5rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #16c716 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: 1.2
          }}>
            Sua Jornada<br/>Xbox Começa Aqui
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: '2.5rem',
            maxWidth: '48rem',
            margin: '0 auto 2.5rem',
            color: '#9aa0a6',
            lineHeight: 1.6
          }}>
            Explore perfis de jogadores, descubra novos jogos e acompanhe suas conquistas
          </p>

          <div style={{ maxWidth: '48rem', margin: '0 auto 2rem' }}>
            <SearchBar onSearch={handleSearch} placeholder="🔍 Buscar gamertag..." isLoading={isLoading} />
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {error && (
          <div style={{
            marginBottom: '2rem',
            padding: '1rem',
            borderRadius: '0.75rem',
            textAlign: 'center',
            background: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            color: '#ffc107'
          }}>
            <strong>⚠️ Aviso:</strong> {error}
          </div>
        )}

        {searchQuery && (
          <section style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem' }}>
              🔎 Resultados para "{searchQuery}"
            </h2>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
                <LoadingSpinner size="lg" />
              </div>
            ) : profiles.length > 0 ? (
              <div className="grid grid-2" style={{ gap: '1.5rem' }}>
                {profiles.map((profile) => (
                  <ProfileCard key={profile.xuid} profile={profile} onClick={() => console.log("Ver perfil")} />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '4rem 0', borderRadius: '0.75rem', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ fontSize: '4rem' }}>🔍</div>
                <p style={{ color: '#9aa0a6' }}>Nenhum perfil encontrado</p>
              </div>
            )}
          </section>
        )}

        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>🎮 Jogos em Destaque</h2>
            <Link href="/games" style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #107c10, #16c716)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(16, 124, 16, 0.4)'
            }}>Ver todos →</Link>
          </div>
          <div className="grid grid-2" style={{ gap: '1.5rem' }}>
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} onClick={() => console.log("Ver jogo")} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold' }}>🏆 Conquistas Recentes</h2>
            <Link href="/achievements" style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              fontWeight: 600,
              background: 'linear-gradient(135deg, #107c10, #16c716)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(16, 124, 16, 0.4)'
            }}>Ver todas →</Link>
          </div>
          <div className="grid grid-3" style={{ gap: '1.5rem' }}>
            {recentAchievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} onClick={() => console.log("Ver conquista")} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center' }}>⚡ Acesso Rápido</h2>
          <div className="grid grid-4" style={{ gap: '1.5rem' }}>
            <Link href="/profiles" className="card" style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👤</div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Perfis</h3>
              <p style={{ fontSize: '0.875rem', color: '#9aa0a6' }}>Buscar jogadores</p>
            </Link>
            <Link href="/games" className="card" style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Jogos</h3>
              <p style={{ fontSize: '0.875rem', color: '#9aa0a6' }}>Explorar catálogo</p>
            </Link>
            <Link href="/achievements" className="card" style={{ textAlign: 'center', padding: '2rem', cursor: 'pointer' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏆</div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Conquistas</h3>
              <p style={{ fontSize: '0.875rem', color: '#9aa0a6' }}>Ver progressos</p>
            </Link>
            <div className="card" style={{ textAlign: 'center', padding: '2rem', opacity: 0.5 }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Estatísticas</h3>
              <p style={{ fontSize: '0.875rem', color: '#6c757d' }}>Em breve</p>
            </div>
          </div>
        </section>

        <section style={{ textAlign: 'center' }}>
          <div className="card" style={{
            maxWidth: '48rem',
            margin: '0 auto',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>ℹ️ Sobre a Plataforma</h3>
            <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem', color: '#9aa0a6' }}>
              Plataforma que consome APIs oficiais do Xbox para fornecer informações detalhadas sobre perfis, jogos e conquistas.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', justifyContent: 'center' }}>
              <span className="badge badge-secondary">Next.js 15</span>
              <span className="badge badge-secondary">TypeScript</span>
              <span className="badge badge-secondary">CSS Puro</span>
              <span className="badge badge-secondary">Xbox API</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
