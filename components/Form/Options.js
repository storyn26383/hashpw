import Base from './Base'

export default {
  mixins: [Base],
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  computed: {
    normalizedItems () {
      if (Object.isObject(this.items)) {
        return this.items.reduce((items, text, value) => [...items, { text, value }], [])
      }

      if (Array.isArray(this.items)) {
        return this.items.map(item => {
          if (Object.isObject(item)) {
            return item
          }

          return { text: item, value: item }
        })
      }

      return []
    }
  }
}
