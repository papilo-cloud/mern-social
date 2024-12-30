import { ComponentProps, ReactNode, useState } from "react";
import { TabItemsProps } from "./TabItems";
import clsx from "clsx";

interface TabListsProps extends ComponentProps<'div'> {
    tabIndex: number;
    children: ReactNode
    buttonStyle?: string;
    activeButtonStyle: string
}
const TabLists = ({tabIndex=0, children, className, buttonStyle, activeButtonStyle}: TabListsProps) => {
    const [isActive, setIsactive] = useState(tabIndex)

    const handleTabClick = (index: number) => {
        setIsactive(index)
    }

    const tabs = children as unknown as TabItemsProps

    return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
        <ul className={clsx("flex w-full justify-between items-center bg-gray-400", className)}>
            { tabs.map((x, i) => <li key={i} className="w-full">
                <button
                    onClick={() => handleTabClick(i)}
                    className={clsx("p-2 text-base w-full", buttonStyle, isActive == i&&[activeButtonStyle])}>
                    {x.props.label}
                </button>
            </li>
            )}
        </ul>
        {tabs[isActive]}
    </div>
  )
}

export default TabLists