import { ref }  from 'vue';
import type { IngredientImport, IngredientExport } from '@/types/recipe';

export function useIngredients(){
    const items = ref<IngredientExport[]>([]);

    function add(item: IngredientExport){
        if(item && !items.value.includes(item)){
            items.value.push(item);
        }
    }

    function removeAt(index: number){
        if(index < 0 || index >= items.value.length) return;
        items.value.splice(index, 1);
    }

    function clear(){
        items.value = [];
    }

    return {
        items,
        add,
        removeAt,
        clear
    }
}