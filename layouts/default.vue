<template lang="pug">
  main
    nuxt
</template>

<script>
  export default {
    head () {
      return {
        meta: [
          { hid: 'og:url', name: 'og:url', content: location.href }
        ],
        link: [
          { hid: 'canonical', rel: 'canonical', href: location.href }
        ]
      }
    }
  }
</script>
