import { ref }  from 'vue';
import type { IngredientImport, IngredientExport } from '@/types/recipe';

export function useIngredients(){
    const items = ref<IngredientExport[]>([]);
    const ids = ref<Set<string>>(new Set());

    function add(item: IngredientExport){
        if(item && !ids.value.has(item.id)){
            items.value.push(item);
            ids.value.add(item.id);
        }
    }

    function removeAt(index: number){
        if(index < 0 || index >= items.value.length) return;
        ids.value.delete(items.value[index].id);
        items.value.splice(index, 1);
    }

    function clear(){
        items.value = [];
        ids.value.clear();
    }

    return {
        items,
        add,
        removeAt,
        clear,
        ids
    }
}