import crypto from 'crypto'

const JWT_SECRET = process.env.JWT_SECRET || 'pgt_secure_members_hub_climax_secret_key_2026'

/**
 * Custom base64 to base64url encoder/decoder (100% compatible with all Node versions)
 */
function toBase64Url(str: string): string {
  return Buffer.from(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function fromBase64Url(base64url: string): string {
  let base64 = base64url
    .replace(/-/g, '+')
    .replace(/_/g, '/')
  while (base64.length % 4) {
    base64 += '='
  }
  return Buffer.from(base64, 'base64').toString('utf8')
}

/**
 * Hash password using PBKDF2 sha512 with a unique salt (OWASP Recommended)
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex')
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return `${salt}:${hash}`
}

/**
 * Verify a cleartext password against a stored hashed password
 */
export function verifyPassword(password: string, stored: string): boolean {
  const parts = stored.split(':')
  if (parts.length !== 2) return false
  const [salt, hash] = parts
  const testHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === testHash
}

/**
 * Create a secure HMAC SHA256 JWT-compatible token (Zero-Dependency JWT)
 */
export function signToken(payload: object): string {
  const header = toBase64Url(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = toBase64Url(JSON.stringify({ ...payload, iat: Math.floor(Date.now() / 1000) }))
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url')
  return `${header}.${body}.${signature}`
}

/**
 * Verify HMAC SHA256 token and return payload
 */
export function verifyToken(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const [header, body, signature] = parts
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(`${header}.${body}`).digest('base64url')
    if (signature !== expectedSig) return null
    return JSON.parse(fromBase64Url(body))
  } catch (error) {
    console.error('JWT Token Verification Error:', error)
    return null
  }
}
