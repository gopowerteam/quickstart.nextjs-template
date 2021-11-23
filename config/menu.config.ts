const menuConfig: MenuConfigItem[] = [
  {
    title: '学习中心',
    children: [
      {
        title: '线下培训',
        path: '/offline-training'
      }
    ]
  }
]

export interface MenuConfigItem {
  title: string
  id?: string
  path?: string
  children?: MenuConfigItem[]
}

export const useMenus = () => {
  const generateKey = () =>
    Math.random().toString(32).slice(2)

  const action = (item: MenuConfigItem) => {
    item.id = item.id ?? generateKey()

    if (item.children) {
      item.children.forEach(action)
    }
  }

  menuConfig.forEach(action)

  return menuConfig
}