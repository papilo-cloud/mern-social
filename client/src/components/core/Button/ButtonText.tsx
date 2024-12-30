import clsx from 'clsx'
import React from 'react'

const ButtonText: React.FC<React.ComponentProps<'span'>> = ({
    className,
    children,
    ...props
}) => {
  return (
    <span className={clsx(' tracking-wide font-normal text-lg text-white', className)} {...props}>
        {children}
    </span>
  )
}

export default ButtonText