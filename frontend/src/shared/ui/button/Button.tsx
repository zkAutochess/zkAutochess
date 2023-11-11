import { cn } from '@bem-react/classname'

import './Button.css'

const CnButton = cn('button')

interface IButtonProps
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    view: 'orange' | 'dark'
    size: 'm' | 'l'
}

export const Button: React.FC<IButtonProps> = ({ view, size, ...props }) => {
    return <button {...props} className={CnButton({ view, size })} />
}
