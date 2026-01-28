"use client";

import React, { useState } from "react";
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
  const [error, setError] = useState<string | null>(null);

  const mockProfile: XboxProfile = {
    xuid: "2533274792093064",
    gamertag: "ExampleGamer",
    gamerScore: 125450,
    accountTier: "Gold",
    xboxOneRep: "GoodPlayer",
    preferredColor: { primaryColor: "#107c10", secondaryColor: "#0e6e0e", tertiaryColor: "#005a00" },
    realName: "João Silva",
    bio: "Gamer apaixonado por jogos",
    location: "São Paulo, Brasil",
    tenure: 8,
    avatar: "/api/placeholder/100/100",
  };

  const featuredGames: XboxGame[] = [
    {
      id: 1,
      name: "Halo Infinite",
      genre: ["Shooter", "Action"],
      developers: ["343 Industries"],
      publishers: ["Microsoft Studios"],
      releaseDates: { Japan: "2021-12-08", NorthAmerica: "2021-12-08", Europe: "2021-12-08", Australia: "2021-12-08" },
    },
    {
      id: 2,
      name: "Forza Horizon 5",
      genre: ["Racing", "Sports"],
      developers: ["Playground Games"],
      publishers: ["Microsoft Studios"],
      releaseDates: { Japan: "2021-11-09", NorthAmerica: "2021-11-09", Europe: "2021-11-09", Australia: "2021-11-09" },
    },
  ];

  const achievements: Achievement[] = [
    {
      id: "1",
      serviceConfigId: "s1",
      name: "Primeira Vitória",
      titleAssociations: [{ name: "Halo Infinite", id: 219630713 }],
      progressState: "Achieved",
      progression: { achievementState: "Achieved", requirements: [{ id: "1", current: "1", target: "1" }], timeUnlocked: "2024-01-15T10:30:00Z" },
      mediaAssets: [{ name: "Icon", type: "Icon", url: "/api/placeholder/60/60" }],
      platform: "Xbox",
      isSecret: false,
      description: "Ganhe sua primeira partida",
      lockedDescription: "",
      productId: "p1",
      achievementType: "Standard",
      participationType: "Individual",
      timeWindow: { startDate: "", endDate: "" },
      rewards: [{ name: "Gamerscore", description: "Points", value: "15", type: "Gamerscore", valueType: "Int" }],
      estimatedTime: "5 min",
      deeplink: "",
      isRevoked: false,
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
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero Espetacular */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, rgba(16, 124, 16, 0.15) 0%, transparent 70%)',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 100 0 L 0 0 0 100\' fill=\'none\' stroke=\'rgba(16,124,16,0.1)\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100\' height=\'100\' fill=\'url(%23grid)\'/%3E%3C/svg%3E")',
          opacity: 0.3,
        }}></div>

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10, padding: '2rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            marginBottom: '2rem',
            borderRadius: '9999px',
            background: 'linear-gradient(135deg, rgba(16, 124, 16, 0.2), rgba(22, 199, 22, 0.1))',
            border: '1px solid rgba(16, 124, 16, 0.5)',
            backdropFilter: 'blur(10px)',
            animation: 'slideDown 0.8s ease-out',
          }}>
            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>🎮</span>
            <span style={{ 
              fontSize: '0.9rem', 
              fontWeight: 700, 
              color: '#16c716',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>Xbox Gaming Hub</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            fontWeight: 900,
            marginBottom: '2rem',
            background: 'linear-gradient(135deg, #ffffff 0%, #16c716 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            textShadow: '0 0 80px rgba(16, 124, 16, 0.5)',
            animation: 'slideUp 1s ease-out',
          }}>
            A EVOLUÇÃO<br/>DO GAMING
          </h1>

          <p style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
            color: '#a0a0a0',
            maxWidth: '800px',
            margin: '0 auto 3rem',
            lineHeight: 1.8,
            animation: 'fadeIn 1.2s ease-out',
          }}>
            Descubra um universo de possibilidades. Explore perfis, conquistas e estatísticas em tempo real com a mais avançada plataforma Xbox.
          </p>

          <div style={{ 
            maxWidth: '700px', 
            margin: '0 auto 3rem',
            animation: 'scaleIn 1s ease-out',
          }}>
            <SearchBar
              onSearch={handleSearch}
              placeholder="Buscar gamertag..."
              isLoading={isLoading}
            />
          </div>

          <div style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            fontSize: '0.95rem',
            color: '#707070',
            animation: 'fadeIn 1.5s ease-out',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>⚡</span>
              <span>Tempo Real</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🎯</span>
              <span>Conquistas Detalhadas</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.5rem' }}>📊</span>
              <span>Análise Completa</span>
            </div>
          </div>
        </div>

        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'pulse 2s ease-in-out infinite',
        }}>
          <div style={{
            width: '40px',
            height: '60px',
            border: '2px solid rgba(16, 124, 16, 0.5)',
            borderRadius: '20px',
            position: 'relative',
          }}>
            <div style={{
              width: '6px',
              height: '10px',
              background: '#16c716',
              borderRadius: '3px',
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'slideDown 1.5s ease-in-out infinite',
            }}></div>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1rem', position: 'relative', zIndex: 1 }}>
        {error && (
          <div style={{
            padding: '1.5rem',
            marginBottom: '3rem',
            borderRadius: 'var(--radius-xl)',
            background: 'rgba(255, 193, 7, 0.1)',
            border: '1px solid rgba(255, 193, 7, 0.3)',
            color: '#ffc107',
            textAlign: 'center',
          }}>
            <strong>ℹ️</strong> {error}
          </div>
        )}

        {searchQuery && (
          <section style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>🔍</span>
              Resultados para "{searchQuery}"
            </h2>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem 0' }}>
                <LoadingSpinner size="lg" />
              </div>
            ) : profiles.length > 0 ? (
              <div className="grid grid-2" style={{ gap: '2rem' }}>
                {profiles.map((profile) => (
                  <ProfileCard key={profile.xuid} profile={profile} onClick={() => {}} />
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem', opacity: 0.5 }}>🔍</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Nenhum resultado</h3>
                <p style={{ color: '#707070' }}>Tente outro termo de busca</p>
              </div>
            )}
          </section>
        )}

        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>🎮</span>
              Em Destaque
            </h2>
            <Link href="/games" style={{
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--gradient-primary)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: 'var(--glow-green)',
              transition: 'all var(--transition)',
              display: 'inline-block',
            }}>
              Ver Todos →
            </Link>
          </div>
          <div className="grid grid-2" style={{ gap: '2rem' }}>
            {featuredGames.map((game) => (
              <GameCard key={game.id} game={game} onClick={() => {}} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span>🏆</span>
              Conquistas
            </h2>
            <Link href="/achievements" style={{
              padding: '1rem 2rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--gradient-primary)',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.95rem',
              boxShadow: 'var(--glow-green)',
              transition: 'all var(--transition)',
              display: 'inline-block',
            }}>
              Ver Todas →
            </Link>
          </div>
          <div className="grid grid-3" style={{ gap: '2rem' }}>
            {achievements.map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} onClick={() => {}} />
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '2.5rem', textAlign: 'center' }}>
            Explore Agora
          </h2>
          <div className="grid grid-4" style={{ gap: '2rem' }}>
            {[
              { icon: '👤', title: 'Perfis', desc: 'Jogadores Xbox', href: '/profiles' },
              { icon: '🎮', title: 'Jogos', desc: 'Catálogo Completo', href: '/games' },
              { icon: '🏆', title: 'Conquistas', desc: 'Desbloqueios', href: '/achievements' },
              { icon: '📊', title: 'Stats', desc: 'Em Breve', href: '#' },
            ].map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="card"
                style={{
                  textAlign: 'center',
                  padding: '3rem 2rem',
                  cursor: item.href === '#' ? 'default' : 'pointer',
                  opacity: item.href === '#' ? 0.5 : 1,
                }}
              >
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#707070' }}>{item.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="card" style={{ 
          textAlign: 'center', 
          padding: '4rem 2rem',
          background: 'radial-gradient(ellipse at center, rgba(16, 124, 16, 0.15) 0%, rgba(15, 15, 15, 0.95) 70%)',
          border: '1px solid rgba(16, 124, 16, 0.3)',
        }}>
          <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1.5rem' }}>
            Plataforma Premium Xbox
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#a0a0a0', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.8 }}>
            Tecnologia de ponta para análise completa do ecossistema Xbox. Dados em tempo real, interface intuitiva, experiência premium.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['Next.js 15', 'TypeScript', 'React 18', 'Xbox API'].map((tech) => (
              <span key={tech} style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(16, 124, 16, 0.2)',
                border: '1px solid rgba(16, 124, 16, 0.4)',
                color: '#16c716',
                fontSize: '0.9rem',
                fontWeight: 700,
              }}>
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
