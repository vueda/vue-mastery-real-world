<template>
  <div>
    <label :class="selectClass" v-if="label">{{ label }}</label>
    <select
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
      :class="selectClass"
    >
      <option v-for="opt in options" :key="opt">
        {{ opt }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from '@/mixins/formFieldMixin.js'

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true
    },
    selectClass: Object
  }
}
</script>

<style lang="scss" scoped></style>
