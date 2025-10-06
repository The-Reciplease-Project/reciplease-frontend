// __tests__/recipeApi.axios.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { resetModules, setEnv } from './helpers'

describe('AxiosRecipeApi', () => {
  beforeEach(() => {
    resetModules()
    setEnv({ VITE_API_SERVER_URL: 'http://api.test' })
  })

  it('posts with token header and returns data', async () => {
    vi.mock('axios', () => ({
      default: {
        post: vi.fn().mockResolvedValue({ data: { id: 'r1', name: 'Pasta' } }),
      },
    }))

    const { AxiosRecipeApi } = await import('@/services/recipeApi.axios')
    const getToken = vi.fn().mockResolvedValue('mock-token')
    const api = new AxiosRecipeApi(getToken)

    const dto = { name: 'Pasta', ingredients: ['noodles'] } as any
    const res = await api.createRecipe(dto)

    // access the mocked axios to assert
    const axiosMod: any = await import('axios')
    expect(axiosMod.default.post).toHaveBeenCalledWith(
      'http://api.test/recipes',
      dto,
      { headers: { Authorization: 'Bearer mock-token' } },
    )
    expect(res).toEqual({ id: 'r1', name: 'Pasta' })
  })
})
