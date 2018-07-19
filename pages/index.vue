<template lang="pug">
  .index
    .container.py-5
      form
        form-input(label="Base Password", v-model="base")
        form-input(label="Salt", v-model="salt")
        form-input(label="Hashed Password", v-model="hashed")
</template>

<script>
  import sjcl from 'sjcl'
  import bigInt from 'big-integer'
  import FormInput from '~/components/Form/Input'

  export default {
    components: { FormInput },
    data () {
      return {
        base: '',
        salt: ''
      }
    },
    computed: {
      hashed () {
        if (!this.base || !this.salt) {
          return
        }

        let digest = sjcl.hash.sha256.hash(this.base + this.salt)
        let hex = sjcl.codec.hex.fromBits(digest)
        let chars = [
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
          'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
          'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
          '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+',
          '{', '}', '|', ':', '"', '<', '>', '?', '-', '=', '[', ']', ';',
          ',', '.', '/', '\\', '\''
        ]

        return bigInt(hex.substring(0, 24), 16).toArray(chars.length).value.map(code => chars[code]).join('')
      }
    }
  }
</script>
