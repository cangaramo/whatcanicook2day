// eslint-disable-next-line no-unused-vars
export const myMixin = {
    methods: {
        capitaLizeLetter(word) {
            if (typeof word !== 'string') return ''
            return word.charAt(0).toUpperCase() + word.slice(1)
        }
    }
}
