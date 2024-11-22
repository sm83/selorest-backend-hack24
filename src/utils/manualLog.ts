import getCurrentTime from './getCurrentTime';

const colorGreenBold = (message: string) => {
  return `\x1b[1m\x1b[32m${message}\x1b[0m`; // Убрали %s и просто вернули отформатированное сообщение
};

const manualLog = (rawMessage: string) => {
  const prefix = `[Manual] - ${getCurrentTime()} |`;
  const result = `${colorGreenBold(prefix)} ${rawMessage}`;
  return result;
};

// Для корректного отображения логов используйте console.log прямо в функции
const printManualLog = (rawMessage: string) => {
  console.log(manualLog(rawMessage));
};

export { manualLog, printManualLog };
