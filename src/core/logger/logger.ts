import chalk from 'chalk';

type LogLevel = 'log' | 'info' | 'error' | 'warn' | 'debug' | 'verbose';

export class Logger {
  private context?: string;

  constructor(context?: string) {
    this.context = context;
  }

  private formatMessage(level: LogLevel, message: string) {
    const timestamp = new Date().toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const contextStr = this.context ? chalk.gray(`[${this.context}]`) : '';
    let levelStr = '';

    switch (level) {
      case 'log':
        levelStr = chalk.green('LOG');
        break;
      case 'info':
        levelStr = chalk.blue('INFO');
        break;
      case 'error':
        levelStr = chalk.red('ERR');
        break;
      case 'warn':
        levelStr = chalk.yellow('WRN');
        break;
      case 'debug':
        levelStr = chalk.cyan('DBG');
        break;
      case 'verbose':
        levelStr = chalk.magenta('VER');
        break;
    }

    return `[${levelStr}] ${chalk.gray(timestamp)} ${contextStr} ${message}`;
  }

  log(message: string) {
    console.log(this.formatMessage('log', message));
  }
  info(message: string) {
    console.log(this.formatMessage('info', message));
  }
  error(message: string) {
    console.error(this.formatMessage('error', message));
  }
  warn(message: string) {
    console.warn(this.formatMessage('warn', message));
  }
  debug(message: string) {
    console.debug(this.formatMessage('debug', message));
  }
  verbose(message: string) {
    console.log(this.formatMessage('verbose', message));
  }
}
