<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';

interface DropdownOption {
  label: string;
  value: string;
}

const props = withDefaults(defineProps<{
  options: DropdownOption[];
  modelValue?: string;
  label?: string;
  id?: string;
  placeholder?: string;
}>(), {
  modelValue: '',
  label: '',
  id: 'dropdown',
  placeholder: 'All',
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const isOpen = ref(false);
const root = ref<HTMLElement | null>(null);

const selectedLabel = computed(
  () =>
    props.options.find((option) => option.value === props.modelValue)?.label ??
    props.placeholder
);

const toggle = () => {
  if (props.options.length === 0) return;
  isOpen.value = !isOpen.value;
};

const select = (value: string) => {
  emit('update:modelValue', value);
  isOpen.value = false;
};

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node | null;
  if (root.value && target && !root.value.contains(target)) {
    isOpen.value = false;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleDocumentClick);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick);
});
</script>

<template>
  <div class="dropdown" :class="{ 'dropdown--empty': options.length === 0 }">
    <label v-if="label" class="dropdown-label" :for="id">{{ label }}</label>
    <div ref="root" class="dropdown-field" @keydown="handleKeydown">
      <button
        class="dropdown-trigger"
        type="button"
        :id="id"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        :disabled="options.length === 0"
        @click="toggle"
      >
        <span>{{ selectedLabel }}</span>
        <span
          class="dropdown-chevron"
          :class="{ 'is-open': isOpen }"
          aria-hidden="true"
        >&#9662;</span>
      </button>
      <Transition name="dropdown-options-transition">
        <ul
          v-if="isOpen"
          class="dropdown-options"
          role="listbox"
          :aria-label="label || 'Options'"
        >
          <li v-for="option in options" :key="option.value">
            <button
              class="dropdown-option"
              :class="{ 'is-selected': modelValue === option.value }"
              type="button"
              role="option"
              :aria-selected="modelValue === option.value"
              @click="select(option.value)"
            >
              {{ option.label }}
            </button>
          </li>
        </ul>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.dropdown {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.dropdown--empty {
  opacity: 0.5;
}

.dropdown-label {
  color: #ffffff;
  font-size: 1rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.dropdown-field {
  position: relative;
  min-width: 18rem;
}

.dropdown-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.06);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 0.62rem 1rem;
  font-size: 0.95rem;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  cursor: pointer;
  transition: border-color 0.22s ease, background-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
}

.dropdown-trigger:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.14);
  border-color: rgba(232, 217, 181, 0.9);
  box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.2);
  transform: translateY(-1px);
}

.dropdown-trigger:focus-visible:not(:disabled) {
  border: 1px solid #e8d9b5;
  background: rgba(255, 255, 255, 0.16);
  box-shadow: 0 0 0 3px rgba(232, 217, 181, 0.25);
  outline: none;
}

.dropdown-trigger:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.dropdown-chevron {
  font-size: 1.3rem;
  transition: transform 0.2s ease;
}

.dropdown-chevron.is-open {
  transform: rotate(180deg);
}

.dropdown-options {
  position: absolute;
  top: calc(100% + 0.6rem);
  left: 0;
  right: 0;
  margin: 0;
  padding: 0.4rem;
  list-style: none;
  border-radius: 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: #131313;
  box-shadow: 0 18px 34px rgba(0, 0, 0, 0.45);
  z-index: 20;
}

.dropdown-option {
  width: 100%;
  border: 0;
  background: transparent;
  color: #f3f3f3;
  text-align: left;
  border-radius: 0.55rem;
  padding: 0.62rem 0.72rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: background-color 0.18s ease, color 0.18s ease;
}

.dropdown-option:hover:not(.is-selected),
.dropdown-option:focus-visible:not(.is-selected) {
  background: #2a2a2a;
  color: #ffffff;
  outline: none;
}

.dropdown-option.is-selected {
  background: #e8d9b5;
  color: #0f0f0f;
  font-weight: 600;
}

.dropdown-options-transition-enter-active,
.dropdown-options-transition-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-options-transition-enter-from,
.dropdown-options-transition-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
