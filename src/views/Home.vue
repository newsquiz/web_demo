<template>
  <app-frame>

  </app-frame>
</template>

<script>
  import AppFrame from '../components/AppFrame'

  export default {
    components: {
      AppFrame
    },
    data() {
      return {
        
      }
    },
    computed: {
      topics() {
        return this.$store.state.topics
      }
    }
  }
</script>
