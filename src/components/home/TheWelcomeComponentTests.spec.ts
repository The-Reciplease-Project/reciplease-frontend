// Since the components in TheWelcome page rely on an external source i.e. Auth0, we have to mock the authentication process

// tests/unit/TheWelcome.renders.spec.ts
import { mount, RouterLinkStub } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TheWelcome from './TheWelcome.vue'
import * as auth0 from '@auth0/auth0-vue'

// --- Mocks ---
vi.mock('@/services/userinfo.service', () => ({
  useUserInfo: () => ({
    getUserInfo: vi.fn().mockResolvedValue({ profile: { name: 'Test User' } }),
  }),
}))

// Mock Auth0 with refs we can flip per test
import { ref } from 'vue'
const isAuthenticatedRef = ref(false)
const isLoadingRef = ref(false)

vi.mock('@auth0/auth0-vue', () => ({
  useAuth0: () => ({
    isAuthenticated: isAuthenticatedRef,
    isLoading: isLoadingRef,
  }),
}))

function setAuthState({ authenticated, loading }: { authenticated: boolean; loading: boolean }) {
  isAuthenticatedRef.value = authenticated
  isLoadingRef.value = loading
}

describe('TheWelcome (render states)', () => {
  const mountOpts = {
    shallow: true,
    global: {
      stubs: {
        // Use real stub so we can assert the "to" prop
        RouterLink: RouterLinkStub,
      },
    },
  } as const

  it('renders nothing relevant when loading', () => {
    setAuthState({ authenticated: false, loading: true })
    const wrapper = mount(TheWelcome, mountOpts)

    expect(wrapper.findComponent({ name: 'LoginButton' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'SignupButton' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'LogoutButton' }).exists()).toBe(false)
    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(false)
  })

  it('renders Login/Signup when NOT authenticated', () => {
    setAuthState({ authenticated: false, loading: false })
    const wrapper = mount(TheWelcome, mountOpts)

    expect(wrapper.findComponent({ name: 'LoginButton' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'SignupButton' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'LogoutButton' }).exists()).toBe(false)
    expect(wrapper.findComponent(RouterLinkStub).exists()).toBe(false)
  })

  it('renders Logout and "Create Recipe" link when authenticated', () => {
    setAuthState({ authenticated: true, loading: false })
    const wrapper = mount(TheWelcome, mountOpts)

    expect(wrapper.findComponent({ name: 'LogoutButton' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'LoginButton' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'SignupButton' }).exists()).toBe(false)

    const link = wrapper.findComponent(RouterLinkStub)
    expect(link.exists()).toBe(true)
    expect(link.props('to')).toBe('/add-recipe')

    // The button inside the RouterLink should exist (stub preserves slot content)
    const btn = wrapper.find('button.thing')
    expect(btn.exists()).toBe(true)
    expect(btn.text()).toContain('Create Recipe')
  })
})
