import clsx from "clsx";
import { ComponentProps, useEffect } from "react";
import { useAuth } from "../../../context/Context";

export interface SnackbarProps extends ComponentProps<'div'> {
    isOpen?: boolean;
    timedOut: number;
    textStyle?: string;
    message: string
}

const Snackbar = ({isOpen, textStyle, timedOut=3, message, className, children}: SnackbarProps) => {

    const {auth} = useAuth()

    useEffect(() => {
        const onTimeout = () => {
            auth.setOpen(false)
        }
        const timed = setTimeout(onTimeout , timedOut*1000);

        return () => clearTimeout(timed)
    }, [isOpen])

  return (
    <>{
        isOpen && <div className={clsx('bg-black z-50 py-3 px-6 fixed top-4 left-[50%] translate-x-[-50%] animate-scale rounded-md', className)}>
        <p className={clsx("text-red-700 text-base", textStyle)}>{message} <b>{children}!</b></p>
    </div>
    }</>
  )
}

export default Snackbar