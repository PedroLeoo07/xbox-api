'use client';

import { useState, useEffect } from 'react';
import { SearchBar, ProfileCard, GameCard, AchievementCard, LoadingSpinner } from '@/components';
import { profileAPI, gamesAPI, achievementsAPI } from '@/lib';
import { XboxProfile, XboxGame, Achievement } from '@/types';
import Link from 'next/link';

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [profiles, setProfiles] = useState<XboxProfile[]>([]);
  const [featuredGames, setFeaturedGames] = useState<XboxGame[]>([]);
  const [recentAchievements, setRecentAchievements] = useState<Achievement[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Mock data para demonstração (será substituído pela API real)
  const mockProfile: XboxProfile = {
    xuid: '2533274792093064',
    gamertag: 'ExampleGamer',
    gamerScore: 125450,
    accountTier: 'Gold',
    xboxOneRep: 'GoodPlayer',
    preferredColor: {
      primaryColor: '#107c10',
      secondaryColor: '#0e6e0e',
      tertiaryColor: '#005a00'
    },
    realName: 'João Silva',
    bio: 'Gamer apaixonado por RPGs e jogos de estratégia',
    location: 'São Paulo, Brasil',
    tenure: 8,
    avatar: '/api/placeholder/100/100'
  };

  const mockGames: XboxGame[] = [
    {
      titleId: '219630713',
      name: 'Halo Infinite',
      type: 'Game',
      devices: ['Xbox Series X|S', 'Xbox One', 'PC'],
      displayImage: '/api/placeholder/200/200',
      description: 'A lendária franquia Halo retorna com a campanha Master Chief mais ampla até hoje.',
      publisherName: 'Microsoft Studios',
      developerName: '343 Industries',
      releaseDate: '2021-12-08',
      category: 'Shooter'
    },
    {
      titleId: '1738253896',
      name: 'Forza Horizon 5',
      type: 'Game',
      devices: ['Xbox Series X|S', 'Xbox One', 'PC'],
      displayImage: '/api/placeholder/200/200',
      description: 'Explore os mundos vibrantes e em constante evolução do México.',
      publisherName: 'Microsoft Studios',
      developerName: 'Playground Games',
      releaseDate: '2021-11-09',
      category: 'Racing'
    }
  ];

  const mockAchievements: Achievement[] = [
    {
      id: 'achievement1',
      serviceConfigId: 'service1',
      name: 'Primeira Vitória',
      titleAssociations: [{ name: 'Halo Infinite', id: 219630713 }],
      progressState: 'Achieved',
      progression: {
        achievementState: 'Achieved',
        requirements: [{ id: '1', current: '1', target: '1' }],
        timeUnlocked: '2024-01-15T10:30:00Z'
      },
      mediaAssets: [{ name: 'Icon', type: 'Icon', url: '/api/placeholder/60/60' }],
      platform: 'Xbox',
      isSecret: false,
      description: 'Ganhe sua primeira partida online',
      lockedDescription: 'Conquista secreta',
      productId: 'product1',
      achievementType: 'Standard',
      participationType: 'Individual',
      timeWindow: { startDate: '', endDate: '' },
      rewards: [{ name: 'Gamerscore', description: 'Points', value: '15', type: 'Gamerscore', valueType: 'Int' }],
      estimatedTime: '5 minutes',
      deeplink: '',
      isRevoked: false
    }
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
        setError('API não configurada - usando dados de demonstração');
      }
    } catch (err) {
      // Para demonstração, usar dados mock se houver erro
      setProfiles([mockProfile]);
      setError('API não configurada - usando dados de demonstração');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Xbox API Frontend
        </h1>
        <p className="text-xl text-muted mb-8 max-w-2xl mx-auto">
          Explore perfis, jogos e conquistas do Xbox com nossa interface moderna e intuitiva.
        </p>
        <SearchBar
          onSearch={handleSearch}
          placeholder="Buscar gamertag..."
          isLoading={isLoading}
          className="max-w-lg mx-auto"
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
          <h2 className="text-2xl font-bold mb-6">
            Resultados para "{searchQuery}"
          </h2>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : profiles.length > 0 ? (
            <div className="grid grid-2 gap-6">
              {profiles.map((profile) => (
                <ProfileCard
                  key={profile.xuid}
                  profile={profile}
                  onClick={() => console.log('Ver perfil:', profile.gamertag)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted">
              <p>Nenhum perfil encontrado. Tente outro termo.</p>
            </div>
          )}
        </section>
      )}

      {/* Featured Games */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Jogos em Destaque</h2>
          <Link href="/games" className="btn btn-secondary btn-sm">
            Ver todos
          </Link>
        </div>
        <div className="grid grid-2 gap-6">
          {featuredGames.map((game) => (
            <GameCard
              key={game.titleId}
              game={game}
              onClick={() => console.log('Ver jogo:', game.name)}
            />
          ))}
        </div>
      </section>

      {/* Recent Achievements */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Conquistas Recentes</h2>
          <Link href="/achievements" className="btn btn-secondary btn-sm">
            Ver todas
          </Link>
        </div>
        <div className="grid grid-3 gap-6">
          {recentAchievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              onClick={() => console.log('Ver conquista:', achievement.name)}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Acesso Rápido</h2>
        <div className="grid grid-4 gap-4">
          <Link href="/profiles" className="card text-center hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">👤</div>
            <h3 className="font-semibold">Perfis</h3>
            <p className="text-sm text-muted">Buscar jogadores</p>
          </Link>
          <Link href="/games" className="card text-center hover:scale-105 transition-transform">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="font-semibold">Jogos</h3>
            <p className="text-sm text-muted">Explorar catálogo</p>
          </Link>
          <Link href="/achievements" className="card text-center hover:scale-105 transition-transform">
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
            Este frontend consome APIs do Xbox para fornecer informações em tempo real 
            sobre perfis, jogos e conquistas. Configure suas credenciais da API para 
            usar dados reais.
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