<template>
  <div>
    <label :class="inputClass" v-if="label">{{ label }}</label>
    <input
      :class="inputClass"
      v-on="listeners"
      v-bind="$attrs"
      type="text"
      :value="value"
      @input="updateValue"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin.js'

export default {
  mixins: [formFieldMixin],
  props: {
    inputClass: Object
  }
}
</script>

<style scoped></style>
