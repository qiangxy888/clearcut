/**
 * Simple API key auth + usage tracking
 * Uses a JSON file for dev; swap for Redis/DB in production
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const DATA_DIR = path.join(process.cwd(), 'data');
const KEYS_FILE = path.join(DATA_DIR, 'api-keys.json');

interface ApiKeyData {
  key: string;
  email: string;
  plan: 'free' | 'pro';
  usageThisMonth: number;
  monthKey: string; // "2026-03"
  createdAt: string;
}

const PLAN_LIMITS = {
  free: 50, // 50 images/month
  pro: 5000, // 5000 images/month
};

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadKeys(): Record<string, ApiKeyData> {
  ensureDir();
  if (!fs.existsSync(KEYS_FILE)) return {};
  return JSON.parse(fs.readFileSync(KEYS_FILE, 'utf-8'));
}

function saveKeys(keys: Record<string, ApiKeyData>) {
  ensureDir();
  fs.writeFileSync(KEYS_FILE, JSON.stringify(keys, null, 2));
}

function currentMonth(): string {
  return new Date().toISOString().slice(0, 7); // "2026-03"
}

/** Generate a new API key */
export function createApiKey(email: string, plan: 'free' | 'pro' = 'free'): string {
  const key = `cc_${crypto.randomBytes(24).toString('hex')}`;
  const keys = loadKeys();
  keys[key] = {
    key,
    email,
    plan,
    usageThisMonth: 0,
    monthKey: currentMonth(),
    createdAt: new Date().toISOString(),
  };
  saveKeys(keys);
  return key;
}

/** Validate API key and check quota */
export function validateApiKey(apiKey: string): { valid: boolean; error?: string; remaining?: number } {
  if (!apiKey || !apiKey.startsWith('cc_')) {
    return { valid: false, error: 'Invalid API key format. Keys start with cc_' };
  }

  const keys = loadKeys();
  const data = keys[apiKey];
  if (!data) {
    return { valid: false, error: 'API key not found' };
  }

  // Reset monthly counter if new month
  const month = currentMonth();
  if (data.monthKey !== month) {
    data.usageThisMonth = 0;
    data.monthKey = month;
  }

  const limit = PLAN_LIMITS[data.plan];
  if (data.usageThisMonth >= limit) {
    return { valid: false, error: `Monthly limit reached (${limit} images). Upgrade to Pro for more.` };
  }

  return { valid: true, remaining: limit - data.usageThisMonth };
}

/** Increment usage counter */
export function recordUsage(apiKey: string): void {
  const keys = loadKeys();
  const data = keys[apiKey];
  if (!data) return;

  const month = currentMonth();
  if (data.monthKey !== month) {
    data.usageThisMonth = 0;
    data.monthKey = month;
  }
  data.usageThisMonth++;
  saveKeys(keys);
}

/** Get usage stats */
export function getUsage(apiKey: string): { used: number; limit: number; plan: string } | null {
  const keys = loadKeys();
  const data = keys[apiKey];
  if (!data) return null;

  const month = currentMonth();
  if (data.monthKey !== month) {
    return { used: 0, limit: PLAN_LIMITS[data.plan], plan: data.plan };
  }
  return { used: data.usageThisMonth, limit: PLAN_LIMITS[data.plan], plan: data.plan };
}
