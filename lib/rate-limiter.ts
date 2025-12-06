// Simple in-memory rate limiter for login attempts
// Tracks login attempts by IP address

interface RateLimitEntry {
    count: number
    resetTime: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

const RATE_LIMIT_WINDOW = 15 * 60 * 1000 // 15 minutes in milliseconds
const MAX_ATTEMPTS = 5

/**
 * Check if an IP address has exceeded the rate limit
 * @param ip - IP address to check
 * @returns true if rate limit exceeded, false otherwise
 */
export function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const entry = rateLimitMap.get(ip)

    if (!entry) {
        return false
    }

    // Reset if window has passed
    if (now > entry.resetTime) {
        rateLimitMap.delete(ip)
        return false
    }

    return entry.count >= MAX_ATTEMPTS
}

/**
 * Record a login attempt for an IP address
 * @param ip - IP address making the attempt
 */
export function recordAttempt(ip: string): void {
    const now = Date.now()
    const entry = rateLimitMap.get(ip)

    if (!entry || now > entry.resetTime) {
        // New entry or expired entry
        rateLimitMap.set(ip, {
            count: 1,
            resetTime: now + RATE_LIMIT_WINDOW,
        })
    } else {
        // Increment existing entry
        entry.count++
    }
}

/**
 * Get remaining attempts for an IP address
 * @param ip - IP address to check
 * @returns number of remaining attempts
 */
export function getRemainingAttempts(ip: string): number {
    const entry = rateLimitMap.get(ip)
    if (!entry || Date.now() > entry.resetTime) {
        return MAX_ATTEMPTS
    }
    return Math.max(0, MAX_ATTEMPTS - entry.count)
}

/**
 * Get time until rate limit resets (in seconds)
 * @param ip - IP address to check
 * @returns seconds until reset, or 0 if not rate limited
 */
export function getResetTime(ip: string): number {
    const entry = rateLimitMap.get(ip)
    if (!entry || Date.now() > entry.resetTime) {
        return 0
    }
    return Math.ceil((entry.resetTime - Date.now()) / 1000)
}

/**
 * Clean up expired entries (run periodically)
 */
export function cleanupExpiredEntries(): void {
    const now = Date.now()
    for (const [ip, entry] of rateLimitMap.entries()) {
        if (now > entry.resetTime) {
            rateLimitMap.delete(ip)
        }
    }
}

// Clean up every 5 minutes
setInterval(cleanupExpiredEntries, 5 * 60 * 1000)
