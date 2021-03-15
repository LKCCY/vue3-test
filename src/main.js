/**
 * 使用 setUp 实现 render
 */
// import { createApp, ref, h  } from '../runtime-dom/src/index'


// const mountApp = createApp({
//   setup () {
//     const count = ref(10)
//     const add = () => { count.value++ }
//     return () => {
//       return  h('button', {
//         onClick: add
//       }, count.value)
//     }
//   }
// })
// mountApp.mount('#app')



/**
 * vue2 中渲染的实现
 */

// import { createApp, h  } from '../runtime-dom/src/index'

// const mountApp = createApp({
//   render (a, b, c, d, e, f) {
//     return h('button', {
//       onClick: this.add
//     }, this.count)
//   },
//   data () {
//     return {
//       count: 0
//     }
//   },
//   methods: {
//     add () {
//       this.count = this.count + 1
//     }
//   }
// })

// mountApp.mount('#app')

/**
 * vue3 patchChildren
 * patchKeyedChildren
 */

// import { createApp, h, reactive } from '../runtime-dom/src/index'

// const mountApp = createApp({
//   setup () {
//     let list = reactive([{ sort: 1 }, { sort: 2 }, { sort: 3 }])
//     const reSort = () => { list.sort((a, b) => { return b.sort - a.sort }) }
//     return () => {
//       const childList = list.map(app => h('li', { key: app.sort }, app.sort))
//       return  h('ul', {
//         onClick: reSort
//       }, childList)
//     }
//   }
// })
// mountApp.mount('#app')

/**
 * composition 数据响应
 */

// import { reactive, effect } from '../reactivity/src/index'

// const state = reactive({ count: 1 })
// console.log('state: ', state)

// effect(() => {
//   console.log(state.count)
// })

// setTimeout(() => {
//   state.count++
// },1000)



/**
 * 创造 vnode 节点
 * 渲染器渲染
 */
// import { h, rendererOptions  } from '../runtime-dom/src/index'
// import { createRenderer } from '../runtime-core/src/renderer'
// const container = document.getElementById('app')
// const vnode = h('button', {
//   onClick: () => { console.log(123)}
// }, 112)

// // 创造渲染器
// const renderer = createRenderer(rendererOptions)
// // 渲染方法
// const render = renderer.render

// render(vnode, container)


/**
 * 监听变化得vode节点
 * composition-api 动态渲染
 * 没有加入调度器，多次执行
 */
// import { h, rendererOptions  } from '../runtime-dom/src/index'
// import { createRenderer } from '../runtime-core/src/renderer'
// import { effect, reactive } from '../reactivity/src/index'

// const container = document.getElementById('app')
// const model = reactive({ num: 1 })

// // 创造渲染器
// const renderer = createRenderer(rendererOptions)
// // 渲染方法
// const render = renderer.render

// effect(() => {
//   // console.log('执行')
//   const vnode = h('button', { onClick: () => { console.log(123)} }, model.num)
//   render(vnode, container)
// })

// setTimeout(() => {
//   model.num = 2
//   // model.num = 3
// }, 2000)


/**
 * 监听变化得vnode节点
 * 加入调度队列，单次执行
 */

import { h, rendererOptions  } from '../runtime-dom/src/index'
import { createRenderer } from '../runtime-core/src/renderer'
import { effect, reactive } from '../reactivity/src/index'
import { queueJob, nextTick } from '../runtime-core/src/scheduler'


const container = document.getElementById('app')
const model = reactive({ num: 1 })

// 创造渲染器
const renderer = createRenderer(rendererOptions)
// 渲染方法
const render = renderer.render

effect(() => {
  console.log('执行')
  const vnode = h('button', { onClick: () => { console.log(123)} }, model.num)
  nextTick(() => {
    let _button = document.getElementsByTagName('button')[0]
    console.log(_button.innerText)
  })
  render(vnode, container)
}, { scheduler: queueJob })

setTimeout(() => {
  model.num = 2
  model.num = 3
}, 2000)
