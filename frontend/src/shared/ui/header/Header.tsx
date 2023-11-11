import { cn } from '@bem-react/classname'
import { Icons } from 'assets'
import { Link } from 'react-router-dom'

import './Header.css'

const CnHeader = cn('header')

interface IHeaderProps {}

export const Header: React.FC<IHeaderProps> = () => {
    return (
        <div className={CnHeader()}>
            <div className={CnHeader('logo')}>
                <Link to="/">{/* <Icons.Logo /> */}</Link>
            </div>
            <div className={CnHeader('navigation')}>
                <Link className={CnHeader('navigation-item')} to="/">
                    Rooms
                </Link>
                <Link className={CnHeader('navigation-item')} to="/create">
                    Create room
                </Link>
            </div>
            <div className={CnHeader('wallet')}></div>
        </div>
    )
}
