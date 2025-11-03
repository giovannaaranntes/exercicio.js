const fs = require('fs').promises;
const path = require('path');

class Logger {
    constructor(logFile = 'app.log'){
        this.logFile = path.join(__dirname, logFile);
        console.log(`📑 Logger criado! Arquivo: ${this.logFile}`);
    }

    async log(message, level ='INFO'){
        const timestamp = new Date().toISOString();
        const logEntry =`[${timestamp}] ${level}: ${message}\n`;

        try {
            await fs.appendFile(this.logFile, logEntry);
            console.log(`✅ Log salvo: ${level} - ${message}`);
        } catch (error){
            console.error('❌ Erro ao escrever log:', error.message);
        }
    }

    async info(message){
        await this.log(message, 'INFO');
    }

    async error(message){
        await this.log(message, 'ERROR');
    }

    async warn(message){
         await this.log(message, 'WARN');
    }
}

module.exports = Logger;