
export const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-min-32-characters-long'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'


export const getSecretKey = () => new TextEncoder().encode(JWT_SECRET)