import clsx from 'clsx'
import React from 'react'

const Button: React.FC<React.ComponentProps<'button'>> = ({
    className,
    children,
    ...props
}) => {
  return (
    <button className={clsx('flex items-center justify-center bg-primary',
        'py-2 px-4 border-0 rounded'
    , className)} {...props}>
        {children}
    </button>
  )
}

export default Button