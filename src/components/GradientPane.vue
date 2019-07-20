<template>
  <div>
    <v-img :src="src" :gradient="gradientString"
      :height="height" :width="width">
      <slot></slot>
    </v-img>
  </div>
</template>

<script>
import Color from 'color'

export default {
  props: {
    color: String,
    targetColor: {
      default: null,
      type: String
    },
    src: {
      default: '/empty.png'
    },
    height: {
      default: ''
    },
    width: {
      default: ''
    }
  },
  data() {
    return {

    }
  },
  methods: {
    createTargetColor(color) {
      color = Color(color)
      var targetColor = color.lighten(0.6)
      return targetColor.hex()
    }
  },
  computed: {
    hexColor() {
      if (!this.color.startsWith('#')) {
        return this.$vuetify.theme[this.color]
      }
      return this.color
    },
    gradientString() {
      var targetColor = this.targetColor || this.createTargetColor(this.hexColor)
      var gs = `to bottom, ${this.hexColor}, ${targetColor}`
      console.log(gs)
      return gs
    }
  }
}
</script>

<style>

</style>
