import {
  MenuConfigItem,
  getMenus
} from '~/config/menu.config'

/**
 * 获取当前路由的菜单项
 * @param menus
 * @param path
 * @returns
 */
export function getCurrentMenuByPath(path: string) {
  const menus = getMenus()
  let finished = false
  const result: MenuConfigItem[] = []

  const action = (menu: MenuConfigItem) => {
    if (finished) return

    result.push(menu)

    if (menu.path === path) {
      finished = true
      return
    }

    if (menu.children) {
      menu.children.forEach(action)
    }

    if (!finished) {
      result.pop()
    }
  }

  menus.forEach(action)

  return result
}

/**
 * 获取当前路由的菜单项
 * @param menus
 * @param path
 * @returns
 */
export function getCurrentMenuById(id: string) {
  const menus = getMenus()
  let finished = false
  const result: MenuConfigItem[] = []

  const action = (menu: MenuConfigItem) => {
    if (finished) return

    result.push(menu)

    if (menu.id === id) {
      finished = true
      return
    }

    if (menu.children) {
      menu.children.forEach(action)
    }

    if (!finished) {
      result.pop()
    }
  }

  menus.forEach(action)

  return result
}
