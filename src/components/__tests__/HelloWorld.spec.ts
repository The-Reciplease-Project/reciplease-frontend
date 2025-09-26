import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import TheWelcome from '../TheWelcome.vue'

// 👇 Mock Auth0 so useAuth0() doesn't blow up
vi.mock('@auth0/auth0-vue', () => ({
  useAuth0: () => ({
    isAuthenticated: { value: false },
    isLoading: { value: false }
  })
}))

describe('TheWelcome.vue', () => {
  it('mounts without crashing', () => {
    const wrapper = mount(TheWelcome)
    expect(wrapper.html()).toBeTruthy()
  })
})
