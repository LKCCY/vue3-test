import { warn, getCurrentInstance } from '../../../runtime-core/src/index'
import { EMPTY_OBJ } from '@vue/shared'

export function useCssModule(name = '$style'): Record<string, string> {
  /* istanbul ignore else */
  if (!__GLOBAL__) {
    const instance = getCurrentInstance()!
    if (!instance) {
      __DEV__ && warn(`useCssModule must be called inside setup()`)
      return EMPTY_OBJ
    }
    // TODO: 临时修改 instance.type.__cssModules
    const type = instance.type as any
    const modules = type.__cssModules
    if (!modules) {
      __DEV__ && warn(`Current instance does not have CSS modules injected.`)
      return EMPTY_OBJ
    }
    const mod = modules[name]
    if (!mod) {
      __DEV__ &&
        warn(`Current instance does not have CSS module named "${name}".`)
      return EMPTY_OBJ
    }
    return mod as Record<string, string>
  } else {
    if (__DEV__) {
      warn(`useCssModule() is not supported in the global build.`)
    }
    return EMPTY_OBJ
  }
}
