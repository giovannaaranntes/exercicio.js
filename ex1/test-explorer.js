// test-explorer.js - Teste do explorador de arquivos

// Importa nossas funções
const { listarArquivos, mostrarResultados } = require('./fileExplorer');
const path = require('path');

// Função principal de teste
async function testarExplorador() {
  console.log('🧪 Iniciando teste do Explorador de Arquivos...');

  // Testa com a pasta atual (onde está o arquivo)
  const pastaAtual = __dirname;
  console.log(`📁 Pasta a ser explorada: ${pastaAtual}`);

  try {
    // Executa a exploração
    const arquivos = await listarArquivos(pastaAtual);

    // Mostra os resultados
    mostrarResultados(arquivos);

    console.log('\n✅ Teste concluído com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
  }
}

// Executa o teste
testarExplorador();