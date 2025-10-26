// tests/unit/CreateRecipeForm.renders.spec.ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CreateRecipeForm from '@/components/create-recipe/CreateRecipeForm.vue'

describe('CreateRecipeForm (render)', () => {
  it('renders RecipeNameField', () => {
    const wrapper = mount(CreateRecipeForm, { shallow: true })
    expect(wrapper.findComponent({ name: 'RecipeNameField' }).exists()).toBe(true)
  })

  it('renders 3 RecipeItemSelect components', () => {
    const wrapper = mount(CreateRecipeForm, { shallow: true })
    expect(wrapper.findAllComponents({ name: 'RecipeItemSelect' })).toHaveLength(3)
  })

  it('renders 3 RecipeItemList components', () => {
    const wrapper = mount(CreateRecipeForm, { shallow: true })
    expect(wrapper.findAllComponents({ name: 'RecipeItemList' })).toHaveLength(3)
  })

  it('renders RecipeTimer', () => {
    const wrapper = mount(CreateRecipeForm, { shallow: true })
    expect(wrapper.findComponent({ name: 'RecipeTimer' }).exists()).toBe(true)
  })

  it('renders RecipeSteps', () => {
    const wrapper = mount(CreateRecipeForm, { shallow: true })
    expect(wrapper.findComponent({ name: 'RecipeSteps' }).exists()).toBe(true)
  })
})
