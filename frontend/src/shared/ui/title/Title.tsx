import { cn } from '@bem-react/classname'
import React, { FC } from 'react'

import './Title.css'

const CnTitle = cn('title')

interface ITitleProps {
    size?: 'l'
    children?: React.ReactNode
}

export const Title: FC<ITitleProps> = ({ size = 'l', children }) => {
    return <div className={CnTitle({ size })}>{children}</div>
}
