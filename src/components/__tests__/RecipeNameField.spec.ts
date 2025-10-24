import { mount } from "@vue/test-utils";
import RecipeNameField from '@/components/recipe/RecipeNameField.vue'
import { describe, it } from "node:test";
import { expect } from "vitest";
import { wrap } from "module";

describe( 'RecipeNameField', () => {
    it('renders label and placeholder', () => {
        const wrapper = mount(RecipeNameField)
        const input = wrapper.get('input')
        expect(wrapper.text()).toContain('Recipe Name')
        expect(input.attributes('placeholder')).toBe('Enter recipe name')
    })
})