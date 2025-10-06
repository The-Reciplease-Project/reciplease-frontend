// test/helpers.ts
import { beforeEach, afterEach, vi } from 'vitest'

export function resetModules() {
  vi.resetModules()
}

export function setEnv(env: Record<string, string>) {
  for (const [k, v] of Object.entries(env)) vi.stubEnv(k, v)
}

export function restoreEnv() {
  vi.unstubAllEnvs?.()
}

beforeEach(() => {
  vi.restoreAllMocks()
})

afterEach(() => {
  restoreEnv()
})
