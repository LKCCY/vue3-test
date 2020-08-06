import { createApp, ref, h  } from '../runtime-dom/src/index'


createApp({
  setup () {
    const count = ref(10)
    const add = () => { count.value++ }
    return () => h('button', {
      onclick: add
    }, count.value)
  }
}).mount('#app')

// 基础
// createApp({
//   data () {
//     return {
//       count: 1
//     }
//   },
//   render () {
//     return h('button', {
//       onclick: () => { this.count++ }
//     },this.count)
//   }
// }).mount('#app')

