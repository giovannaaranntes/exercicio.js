const fs = require('fs').promises;
const path = require('path');

class Logger {
  constructor() {
    this.logPath = path.join(__dirname, '..', '..', 'logs', 'system.log');
    this.ensureLogDirectory();
  }

  async ensureLogDirectory() {
    try {
      await fs.mkdir(path.dirname(this.logPath), { recursive: true });
    } catch (error) {
      console.error('Erro ao criar diretório de logs:', error.message);
    }
  }

  async log(level, message, data = null) {
    try {
      const timestamp = new Date().toISOString();
      const logEntry = {
        timestamp,
        level: level.toUpperCase(),
        message,
        data,
      };

      const logLine = JSON.stringify(logEntry) + '\n';
      await fs.appendFile(this.logPath, logLine);

      const emoji = this.getEmojiForLevel(level);
      console.log(`${emoji} [${timestamp}] ${level.toUpperCase()}: ${message}`);
    } catch (error) {
      console.error('Erro ao escrever log:', error.message);
    }
  }

  getEmojiForLevel(level) {
    const emojis = {
      success: '✅',
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
      debug: '🐛',
    };
    return emojis[level.toLowerCase()] || '📝';
  }

  async success(message, data = null) {
    await this.log('success', message, data);
  }

  async warning(message, data = null) {
    await this.log('warning', message, data);
  }

  async error(message, data = null) {
    await this.log('error', message, data);
  }

  async debug(message, data = null) {
    await this.log('debug', message, data);
  }

  async readLogs(lines = 10) {
    try {
      const content = await fs.readFile(this.logPath, 'utf8');
      const logLines = content.trim().split('\n');
      return logLines.slice(-lines).map(line => JSON.parse(line));
    } catch (error) {
      console.log('Arquivo de log não encontrado');
      return [];
    }
  }
}

module.exports = Logger;