"use client";

import React, { useState, useEffect } from "react";
import {
  SearchBar,
  ProfileCard,
  GameCard,
  AchievementCard,
  LoadingSpinner,
} from "@/components";
import { profileAPI, gamesAPI, achievementsAPI } from "@/lib";
import { XboxProfile, XboxGame, Achievement } from "@/types";
import Link from "next/link";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profiles, setProfiles] = useState<XboxProfile[]>([]);
  const [featuredGames, setFeaturedGames] = useState<XboxGame[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>(
    [],
  );
  const [error, setError] = useState<string | null>(null);

  // Mock data para demonstração (será substituído pela API real)
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

  const mockGames: XboxGame[] = [
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
  ];

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
  ];

  useEffect(() => {
    // Simular carregamento de dados iniciais
    setFeaturedGames(mockGames);
    setRecentAchievements(mockAchievements);
  }, []);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setError(null);
    setSearchQuery(query);

    try {
      // Em um cenário real, você faria a busca na API
      const response = await profileAPI.searchProfiles(query);

      if (response.success) {
        setProfiles(response.data);
      } else {
        // Para demonstração, usar dados mock se a API falhar
        setProfiles([mockProfile]);
        setError("API não configurada - usando dados de demonstração");
      }
    } catch (err) {
      // Para demonstração, usar dados mock se houver erro
      setProfiles([mockProfile]);
      setError("API não configurada - usando dados de demonstração");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section com fundo animado */}
      <section className="relative overflow-hidden py-20 px-4" style={{
        background: 'linear-gradient(135deg, #0a0b0e 0%, #1a1d24 50%, #0e1014 100%)',
        borderBottom: '1px solid rgba(16, 124, 16, 0.3)'
      }}>
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%2316c716\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}></div>

        <div className="container relative z-10 text-center">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3 rounded-full" style={{
            background: 'rgba(16, 124, 16, 0.1)',
            border: '1px solid rgba(16, 124, 16, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <span className="text-4xl animate-pulse">🎮</span>
            <span className="text-sm font-semibold" style={{ color: '#16c716' }}>XBOX GAMING HUB</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6" style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #16c716 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 40px rgba(16, 124, 16, 0.3)',
            letterSpacing: '-0.02em'
          }}>
            Sua Jornada<br/>Xbox Começa Aqui
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto" style={{
            color: '#9aa0a6',
            lineHeight: '1.6'
          }}>
            Explore perfis de jogadores, descubra novos jogos e acompanhe suas conquistas em uma experiência única e moderna
          </p>

          <SearchBar
            onSearch={handleSearch}
            placeholder="🔍 Buscar gamertag..."
            isLoading={isLoading}
            className="max-w-2xl mx-auto mb-8"
          />

          <div className="flex flex-wrap gap-4 justify-center items-center text-sm" style={{ color: '#6c757d' }}>
            <span>✨ Dados em tempo real</span>
            <span>•</span>
            <span>🎯 Conquistas detalhadas</span>
            <span>•</span>
            <span>📊 Estatísticas completas</span>
          </div>
        </div>
      </section>

      <div className="container py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 rounded-xl text-center" style={{
            background: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            color: '#ffc107'
          }}>
            <strong>⚠️ Aviso:</strong> {error}
          </div>
        )}

        {/* Search Results */}
        {searchQuery && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
              <span>🔎</span>
              <span>Resultados para "{searchQuery}"</span>
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-16">
                <LoadingSpinner size="lg" />
              </div>
            ) : profiles.length > 0 ? (
              <div className="grid grid-2 gap-6">
                {profiles.map((profile) => (
                  <ProfileCard
                    key={profile.xuid}
                    profile={profile}
                    onClick={() => console.log("Ver perfil:", profile.gamertag)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 rounded-xl" style={{
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl" style={{ color: '#9aa0a6' }}>Nenhum perfil encontrado</p>
        {/* Featured Games */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span>🎮</span>
              <span>Jogos em Destaque</span>
            </h2>
            <Link href="/games" className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105" style={{
              background: 'linear-gradient(135deg, #107c10, #16c716)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(16, 124, 16, 0.4)'
            }}>
              Ver todos →
            </Link>
          </div>
          <div className="grid grid-2 gap-6">
            {featuredGames.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onClick={() => console.log("Ver jogo:", game.name)}
              />
            ))}
          </div>
                key={game.id}
        {/* Recent Achievements */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span>🏆</span>
              <span>Conquistas Recentes</span>
            </h2>
            <Link href="/achievements" className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105" style={{
              background: 'linear-gradient(135deg, #107c10, #16c716)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(16, 124, 16, 0.4)'
            }}>
              Ver todas →
            </Link>
          </div>
          <div className="grid grid-3 gap-6">
            {recentAchievements.map((achievement) => (
              <AchievementCard
                key={achievement.id}
        {/* Quick Actions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center flex items-center justify-center gap-3">
            <span>⚡</span>
            <span>Acesso Rápido</span>
          </h2>
          <div className="grid grid-4 gap-6">
            <Link
              href="/profiles"
              className="group relative p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                background: 'rgba(30, 33, 39, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'linear-gradient(135deg, rgba(16, 124, 16, 0.1), rgba(22, 199, 22, 0.1))'
              }}></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">👤</div>
                <h3 className="font-bold text-xl mb-2">Perfis</h3>
                <p className="text-sm" style={{ color: '#9aa0a6' }}>Buscar jogadores</p>
              </div>
            </Link>

            <Link
              href="/games"
              className="group relative p-8 rounded-2xl text-center transition-all duration-300 hover:scale-105 overflow-hidden"
              style={{
                background: 'rgba(30, 33, 39, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{
                background: 'linear-gradient(135deg, rgba(16, 124, 16, 0.1), rgba(22, 199, 22, 0.1))'
              }}></div>
              <div className="relative z-10">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">🎮</div>
                <h3 className="font-bold text-xl mb-2">Jogos</h3>
                <p className="text-sm" style={{ color: '#9aa0a6' }}>Explorar catálogo</p>
              </div>
        {/* API Info */}
        <section className="text-center">
          <div className="max-w-3xl mx-auto p-10 rounded-2xl relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(16, 124, 16, 0.1) 0%, rgba(22, 199, 22, 0.05) 100%)',
            border: '1px solid rgba(16, 124, 16, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <div className="absolute top-0 right-0 text-9xl opacity-5">🎮</div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <span>ℹ️</span>
                <span>Sobre a Plataforma</span>
              </h3>
              <p className="text-lg mb-6" style={{ color: '#9aa0a6', lineHeight: '1.7' }}>
                Esta plataforma consome APIs oficiais do Xbox para fornecer informações detalhadas em tempo real sobre perfis de jogadores, biblioteca de jogos e sistema de conquistas. Uma experiência completa para gamers.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{
                  background: 'rgba(16, 124, 16, 0.2)',
                  border: '1px solid rgba(16, 124, 16, 0.4)',
                  color: '#16c716'
                }}>Next.js 15</span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{
                  background: 'rgba(16, 124, 16, 0.2)',
                  border: '1px solid rgba(16, 124, 16, 0.4)',
                  color: '#16c716'
                }}>TypeScript</span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{
                  background: 'rgba(16, 124, 16, 0.2)',
                  border: '1px solid rgba(16, 124, 16, 0.4)',
                  color: '#16c716'
                }}>CSS Moderno</span>
                <span className="px-4 py-2 rounded-full text-sm font-semibold" style={{
                  background: 'rgba(16, 124, 16, 0.2)',
                  border: '1px solid rgba(16, 124, 16, 0.4)',
                  color: '#16c716'
                }}>Xbox API</span>
              </div>
            </div>
          </div>
        </section>
      </div <h3 className="font-bold text-xl mb-2">Conquistas</h3>
                <p className="text-sm" style={{ color: '#9aa0a6' }}>Ver progressos</p>
              </div>
            </Link>

            <div
              className="relative p-8 rounded-2xl text-center opacity-50"
              style={{
                background: 'rgba(30, 33, 39, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <div className="text-5xl mb-4">📊</div>
              <h3 className="font-bold text-xl mb-2">Estatísticas</h3>
              <p className="text-sm" style={{ color: '#6c757d' }}>Em breve</p>
            </div>
          </div>
            <Link
            href="/achievements"
            className="card text-center hover:scale-105 transition-transform"
          >
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-semibold">Conquistas</h3>
            <p className="text-sm text-muted">Ver progressos</p>
          </Link>
          <div className="card text-center opacity-60">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-semibold">Estatísticas</h3>
            <p className="text-sm text-muted">Em breve</p>
          </div>
        </div>
      </section>

      {/* API Info */}
      <section className="text-center">
        <div className="card max-w-2xl mx-auto">
          <h3 className="text-xl font-bold mb-4">Sobre a API</h3>
          <p className="text-muted mb-4">
            Este frontend consome APIs do Xbox para fornecer informações em
            tempo real sobre perfis, jogos e conquistas. Configure suas
            credenciais da API para usar dados reais.
          </p>
          <div className="flex gap-2 justify-center">
            <span className="badge badge-secondary">Next.js</span>
            <span className="badge badge-secondary">TypeScript</span>
            <span className="badge badge-secondary">CSS Puro</span>
            <span className="badge badge-secondary">Xbox API</span>
          </div>
        </div>
      </section>
    </div>
  );
}
