// Pegamos as ferramentas que vamos usar
const fs = require('fs').promises; // Para mexer com arquivos
const path = require('path'); // Para trabalhar com endereços

// Nosso assistente para arquivos
// static - funções que funcionam sem precisar criar um objeto primeiro
class FileHelper {

  // PASSO 1: Função para LER um arquivo JSON (como ler uma receita)
  static async readJSON(filePath) {
    try {
      // Lê o arquivo como se fosse um texto normal
      const data = await fs.readFile(filePath, 'utf8');
      // JSON.parse - "tradutor" que transforma texto em informações que o computador entende
      return JSON.parse(data);
    } catch (error) {
      console.error("🤖 Robô: Ops! Não consegui ler este arquivo:", error);
      return null; // Retorna "nada" se deu erro
    }
  }

  // PASSO 2: Função para ESCREVER um arquivo JSON (como escrever uma receita)
  static async writeJSON(filePath, data) {
    try {
      // JSON.stringify - "tradutor" que transforma informações do computador em texto
      const jsonData = JSON.stringify(data, null, 2);
      // Salva o texto no arquivo
      await fs.writeFile(filePath, jsonData, 'utf8');
      return true; // Deu certo!
    } catch (error) {
      console.error("🤖 Robô: Ops! Não consegui salvar este arquivo:", error);
      return false; // Deu erro!
    }
  }

  // Função para CRIAR uma pasta (se não existir)
  static async ensureDirectory(dirPath) {
    try {
      // Cria a pasta (e todas as pastas "de dentro" se precisar)
      await fs.mkdir(dirPath, { recursive: true });
      return true; // Deu certo!
    } catch (error) {
      console.error('🤖 Robô: Ops! Não consegui criar a pasta:', error);
      return false; // Deu erro!
    }
  }
}

// PASSO 4: Deixa outros arquivos usarem nosso "assistente de arquivos"
module.exports = FileHelper;