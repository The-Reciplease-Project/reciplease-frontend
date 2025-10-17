import { describe, expect, it, test }  from 'vitest'
import { useIngredients } from '../useIngredients'

// describe('useIngredients', () => {
//     it('starts with an empty list', () => {
//         const { items } = useIngredients();
//         expect(items.value).toEqual([]);
//     })

//     it('adds a trimmed, unique ingredient', ()=> {
//         const { items, add } = useIngredients();
//         add('  Rice     ');
//         expect(items.value).toEqual(['Rice']);
//     })

//     it('prevents adding duplicates', ()=> {
//         const { items, add } = useIngredients();
//         add('Rice');
//         add('Rice');
//         expect(items.value).toEqual(['Rice']);
//     })

//     it('removed at a current index', ()=> {
//         const { items, add, removeAt } = useIngredients();
//         add('Rice');
//         add('Beans');
//         removeAt(0);
//         expect(items.value).toEqual(['Beans']);
//     })

//     it('removeAt is a no-op for out-of-bounds indexes', () => {
//     const { items, add, removeAt } = useIngredients()
//     add('salt')
//     removeAt(-1)
//     removeAt(99)
//     expect(items.value).toEqual(['salt'])
//   })

//   it('clear empties the list', () => {
//     const { items, add, clear } = useIngredients()
//     add('salt')
//     add('pepper')
//     clear()
//     expect(items.value).toEqual([])
//   })
// })