import { ref }  from 'vue';

export function useIngredients(){
    const items = ref<string[]>([]);

    function add(item: string){
        const trimmed = item.trim();
        if(trimmed && !items.value.includes(trimmed)){
            items.value.push(trimmed);
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