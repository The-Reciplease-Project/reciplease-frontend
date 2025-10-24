import { mount } from '@vue/test-utils'
import CreateRecipeForm from '@/components/CreateRecipeForm.vue'
import { expect, it} from 'vitest'

it('includes RecipeNameField component', () => {
    const wrapper = mount(CreateRecipeForm, {shallow: true})
    expect(wrapper.findComponent({name: 'RecipeNameField'}).exists()).toBe(true)
})
