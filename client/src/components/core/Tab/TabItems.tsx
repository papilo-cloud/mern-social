import { ReactNode } from 'react'

export interface TabItemsProps {
    [x: string]: any;
    label: string;
    children: ReactNode
}
const TabItems = ({label, children}: TabItemsProps) => {
  return (
    <div 
        className=''
        aria-labelledby={label}
        id={label}>
        {children}
    </div>
  )
}

export default TabItems