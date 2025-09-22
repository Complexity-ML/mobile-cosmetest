type Level = 'silent' | 'error' | 'warn' | 'info' | 'debug';

const envLevel = (process.env.EXPO_PUBLIC_LOG_LEVEL as Level) || (__DEV__ ? 'debug' : 'error');

function shouldLog(level: Level) {
  const order: Record<Level, number> = { silent: 0, error: 1, warn: 2, info: 3, debug: 4 };
  return order[level] <= order[envLevel];
}

export const logger = {
  debug: (...args: any[]) => { if (shouldLog('debug')) console.debug(...args); },
  info:  (...args: any[]) => { if (shouldLog('info')) console.info(...args); },
  warn:  (...args: any[]) => { if (shouldLog('warn')) console.warn(...args); },
  error: (...args: any[]) => { if (shouldLog('error')) console.error(...args); },
};

export default logger;

