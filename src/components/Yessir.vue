<template>
    <div>
        <h2> Can't find the ingredient you're looking for? Tell us! </h2>
        <button> Request Additional Ingredient</button>
    </div>
  <div class="ingredient-picker" ref="root">
    <!-- Input-like field (click anywhere to open) -->
    <div
      class="field"
      role="combobox"
      :aria-expanded="open ? 'true' : 'false'"
      @click="openField"
      @keydown="onKeydown"
      tabindex="0"
    >
      <!-- Selected chips -->
      <div class="chips">
        <span
          v-for="(item, i) in selected"
          :key="i"
          class="chip"
          @click.stop
        >
          {{ item }}
          <button class="chip-x" @click="remove(i)">×</button>
        </span>

        <!-- Faux input (no typing yet; just for the caret/feel) -->
        <span class="caret-placeholder" aria-hidden="true"></span>
      </div>
    </div>

    <!-- Dropdown -->
    <div v-if="open" class="dropdown">
      <div class="menu" role="listbox">
        <label
          v-for="(item, i) in ingredients"
          :key="i"
          class="option"
          :class="{ selected: selected.includes(item) }"
        >
          <input
            type="checkbox"
            :value="item"
            v-model="selected"
          />
          <span class="label">{{ item }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const ingredients = ref<string[]>([
  'eggs', 'milk', 'flour', 'sugar', 'salt', 'butter', 'baking powder', 'vanilla extract'
])

const selected = ref<string[]>([])
const open = ref(false)
const root = ref<HTMLElement | null>(null)

function openField() {
  open.value = true
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    open.value = false
  } else if ((e.key === 'Enter' || e.key === ' ') && !open.value) {
    e.preventDefault()
    open.value = true
  }
}

function remove(index: number) {
  selected.value.splice(index, 1)
}

function onDocClick(ev: MouseEvent) {
  if (!root.value) return
  if (!root.value.contains(ev.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onDocClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocClick))
</script>

<style scoped>
.ingredient-picker {
  font-family: system-ui, sans-serif;
  position: relative;
  max-width: 480px;
}

/* Input-like field */
.field {
  display: flex;
  align-items: center;
  min-height: 44px; /* thumb-friendly */
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  padding: 0.4rem 0.6rem;
  cursor: text;
  background: #fff;
  transition: box-shadow .15s, border-color .15s;
  outline: none;
}
.field:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,.15);
}

/* Chips inside the field */
.chips {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  border-radius: 999px;
  padding: 0.25rem 0.55rem;
  font-size: 0.9rem;
}
.chip-x {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
}

/* Blinking caret illusion */
.caret-placeholder {
  display: inline-block;
  width: 1px;
  height: 1.2em;
  background: #111827;
  animation: caret 1s steps(2, start) infinite;
  margin-left: 2px;
}
@keyframes caret {
  50% { opacity: 0; }
}

/* Dropdown */
.dropdown {
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 0.25rem;
  z-index: 20;
}
.menu {
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 8px 20px rgba(0,0,0,.08);
  max-height: 12rem;
  overflow-y: auto;
  padding: 0.35rem;
}

/* Options styled like selectable pills */
.option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 0.55rem;
  border-radius: 0.45rem;
  cursor: pointer;
  transition: background .15s;
}
.option:hover {
  background: #f3f4f6;
}

.option.selected {
  background: #e0e7ff;
}

/* Custom checkbox look */
.option input[type='checkbox'] {
  appearance: none;
  -webkit-appearance: none;
  position: relative;
  width: 1.1rem;
  height: 1.1rem;
  border: 1px solid #cbd5e1;
  border-radius: 0.25rem;
  display: grid;
  place-content: center;
  cursor: pointer;
}
.option input[type='checkbox']::before {
  content: '✓';
  font-size: 0.85rem;
  line-height: 1;
  transform: scale(0);
  transition: transform .12s ease-in-out;
  color: #fff;
}
.option input[type='checkbox']:checked {
  background: #4f46e5;
  border-color: #4f46e5;
}
.option input[type='checkbox']:checked::before {
  transform: scale(1);
}
.label { user-select: none; }
</style>
