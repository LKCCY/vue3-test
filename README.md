# vue3-test

## 描述

从 `vue-next` 中截取 `reactivity`, `runtime-core`,`runtime-dom` 文件，**便于阅读和打断点**

## 你可以测试什么

使用 setUp 实现视图渲染
``` javascript
import { createApp, ref, h  } from '../runtime-dom/src/index'
const mountApp = createApp({
  setup () {
    const count = ref(10)
    const add = () => { count.value++ }
    return () => {
      return  h('button', {
        onClick: add
      }, count.value)
    }
  }
})
mountApp.mount('#app')
```

实现数据响应式
``` javascript
  import { reactive, effect } from '../reactivity/src/index'

  const state = reactive({ count: 1 })
  effect(() => {
    console.log(state.count)
  })

  setTimeout(() => {
    state.count++
  },1000)
```

使用渲染器渲染虚拟节点
```javascript
import { h, rendererOptions  } from '../runtime-dom/src/index'
import { createRenderer } from '../runtime-core/src/renderer'
const container = document.getElementById('app')
const vnode = h('button', {
  onClick: () => { console.log(123)}
}, 112)

// 创造渲染器
const renderer = createRenderer(rendererOptions)
// 渲染方法
const render = renderer.render

render(vnode, container)
```

没使用调度，数据响应时多次执行
```javascript
import { h, rendererOptions  } from '../runtime-dom/src/index'
import { createRenderer } from '../runtime-core/src/renderer'
import { effect, reactive } from '../reactivity/src/index'

const container = document.getElementById('app')
const model = reactive({ num: 1 })

// 创造渲染器
const renderer = createRenderer(rendererOptions)
// 渲染方法
const render = renderer.render

effect(() => {
  // console.log('执行')
  const vnode = h('button', { onClick: () => { console.log(123)} }, model.num)
  render(vnode, container)
})

setTimeout(() => {
  model.num = 2
  model.num = 3
}, 2000)
```

加入调度器,数据响应只执行一次
```javascript
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


```
