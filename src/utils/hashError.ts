const hashError = (error: string) => {
  let hash = 0;
  for (let i = 0; i < error.length; i++) {
    const char = error.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Преобразуем к 32-битному целому
  }
  return String(hash).slice(-8);
};

export default hashError;
