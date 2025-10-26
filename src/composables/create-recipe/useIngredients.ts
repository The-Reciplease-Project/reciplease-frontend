import { ref }  from 'vue';
import type { RecipeItemExport } from '@/types/recipe';
export type Category = 'ingredients' | 'appliances' | 'cookware'

export function useRecipeItemSelector(){

    const ids = ref<Set<string>>(new Set());

    type ItemsByCategory = {
        ingredients: RecipeItemExport[],
        appliances: RecipeItemExport[],
        cookware: RecipeItemExport[],
    }

    const items = ref<ItemsByCategory>({
        ingredients: [],
        appliances: [],
        cookware: [],
    })

    function add(item: RecipeItemExport, category: Category){
        if(item && !ids.value.has(item.id)){
            items.value[category].push(item);
            ids.value.add(item.id);
        }
    }

    function removeAt(index: number, category: Category){
        if(index < 0 || index >= items.value[category].length) return;
        ids.value.delete(items.value[category][index].id);
        items.value[category].splice(index, 1);
    }

    function clear(category: Category){
        items.value[category] = [];
        ids.value.clear();
    }

    return {
        items,
        add,
        removeAt,
        clear,
        ids,
        
    }
}