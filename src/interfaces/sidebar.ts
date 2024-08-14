export interface SidebarItem {
  title: string
  icon: JSX.Element
  bgColor: string
  textColor: string
  link: string
  children?: SidebarChildItem[]
  align?: 'left' | 'right'
}

export interface SidebarChildItem {
  title: string
  link: string
  icon?: JSX.Element
}
