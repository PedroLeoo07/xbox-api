#!/usr/bin/env node

// Simple test script to check Xbox API
const fetch = require('node-fetch');

const API_URL = 'https://api.sampleapis.com/xbox/games';

async function testAPI() {
  console.log('🎮 Testando Xbox Games API...\n');
  
  try {
    console.log('📡 Fazendo requisição para:', API_URL);
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const games = await response.json();
    console.log(`✅ API respondeu com ${games.length} jogos\n`);
    
    // Contar jogos com gêneros
    const gamesWithGenres = games.filter(g => g.genre && g.genre.length > 0);
    console.log(`📊 Estatísticas:`);
    console.log(`  - Total de jogos: ${games.length}`);
    console.log(`  - Jogos com gêneros: ${gamesWithGenres.length}`);
    console.log(`  - Jogos sem gêneros: ${games.length - gamesWithGenres.length}`);
    
    // Mostrar exemplos
    console.log('\n🎯 Exemplos de jogos com gêneros:');
    const examples = gamesWithGenres.slice(0, 5);
    examples.forEach((game, i) => {
      console.log(`${i+1}. "${game.name}"`);
      console.log(`   Gêneros: [${game.genre.join(', ')}]`);
      console.log(`   Desenvolvedor: ${game.developers[0] || 'N/A'}`);
      console.log('');
    });
    
    // Contar gêneros únicos
    const allGenres = new Set();
    gamesWithGenres.forEach(game => {
      game.genre.forEach(genre => allGenres.add(genre));
    });
    
    console.log(`🏷️  Gêneros únicos encontrados: ${allGenres.size}`);
    console.log('Primeiros 10 gêneros:', Array.from(allGenres).slice(0, 10).join(', '));
    
    console.log('\n✅ API está funcionando corretamente!');
    
  } catch (error) {
    console.error('❌ Erro ao testar API:', error.message);
    process.exit(1);
  }
}

testAPI();