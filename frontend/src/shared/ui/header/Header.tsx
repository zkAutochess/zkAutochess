import { cn } from '@bem-react/classname'
import { Link } from 'react-router-dom'
import { Wallet } from 'widgets'
import logo from 'assets/images/logo.png'

import './Header.css'

const CnHeader = cn('header')

interface IHeaderProps {}

export const Header: React.FC<IHeaderProps> = () => {
    return (
        <div className={CnHeader()}>
            <div className={CnHeader('logo')}>
                <Link style={{ position: 'absolute', left: 25, top: 25 }} to="/">
                    <img style={{ width: 150, height: 150 }} src={logo} alt="Logo" />
                </Link>
            </div>
            <div className={CnHeader('navigation')}>
                <Link className={CnHeader('navigation-item')} to="/">
                    Rooms
                </Link>
                <Link className={CnHeader('navigation-item')} to="/create">
                    Create room
                </Link>
            </div>
            <div className={CnHeader('wallet')}>
                <Wallet />
            </div>
        </div>
    )
}
