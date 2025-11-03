// fileExplorer.js - Explorador de arquivos recursivo

// IMPORTAÇÕES
// Ferramentas que vamos usar
const fs = require('fs').promises; // Sistema de arquivos (versão Promise)
const path = require('path'); // Manipulação de caminhos

// FUNÇÃO PRINCIPAL - Lista todos os arquivos recursivamente
async function listarArquivos(diretorio) {
  console.log(`📂 Explorando: ${diretorio}`);

  // Array para guardar todos os arquivos encontrados
  const arquivos = [];

  try {
    // Lê o conteúdo do diretório (lista tudo que tem dentro)
    const items = await fs.readdir(diretorio);
    console.log(`📁 Encontrados ${items.length} itens em: ${diretorio}`);

    // Para cada item encontrado...
    for (const item of items) {
      // Monta o caminho completo do item
      const fullPath = path.join(diretorio, item);

      // Pega informações sobre o item (é pasta ou arquivo?)
      const stats = await fs.stat(fullPath);

      // Se for uma pasta (Diretório)...
      if (stats.isDirectory()) {
        console.log(`➡️ Pasta encontrada: ${item}`);

        // RECURSÃO: a função chama ela mesma (como bonecas russas, uma dentro da outra)
        const subArquivos = await listarArquivos(fullPath);

        // Adiciona todos os arquivos da subpasta ao nosso array
        // O "..." espalha os elementos (como despejar uma caixa dentro de outra)
        arquivos.push(...subArquivos);
      } else {
        // Se for um arquivo, adiciona ao array
        console.log(`📄 Arquivo encontrado: ${item}`);
        arquivos.push(fullPath);
      }
    }
  } catch (error) {
    // Se der erro (pasta não existe, sem permissão, etc.)
    console.error(`❌ Erro ao explorar ${diretorio}:`, error.message);
  }

  return arquivos;
}

// FUNÇÃO AUXILIAR - Mostra os resultados de forma organizada
function mostrarResultados(arquivos) {
  console.log('\n--- RELATÓRIO FINAL ---');
  console.log(`Total de arquivos encontrados: ${arquivos.length}`);

  if (arquivos.length > 0) {
    console.log('\nLista de arquivos:');
    arquivos.forEach((arquivo, index) => {
      console.log(`${index + 1}. ${arquivo}`);
    });
  }
}

// EXPORTA as funções para outros arquivos usarem
module.exports = {
  listarArquivos,
  mostrarResultados,
};