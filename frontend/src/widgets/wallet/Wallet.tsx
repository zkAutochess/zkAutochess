import { cn } from '@bem-react/classname'
import { Icons } from 'assets'

import './Wallet.css'
import { usePrivy } from '@privy-io/react-auth'
import { useMemo } from 'react'
import { Button } from 'shared/ui'

const CnWallet = cn('wallet')

interface IWalletProps {}

export const Wallet: React.FC<IWalletProps> = () => {
    const { user, connectWallet, login, logout } = usePrivy()

    const address = useMemo(() => user?.wallet?.address, [user])

    return (
        <div className={CnWallet('wrapper')}>
            {!address ? (
                <Button onClick={login} view="dark" size="m">
                    Connect wallet
                </Button>
            ) : (
                <>
                    <div className={CnWallet()}>
                        {/* <div className={CnWallet('icons')}>
                            <Icons.Bitcoin />
                    <Icons.Metamask />
                        </div> */}
                        <div className={CnWallet('label')}>{`${address.slice(
                            0,
                            5,
                        )}...${address.slice(address.length - 5, address.length)}`}</div>
                        <div className={CnWallet('action')}>
                            <Icons.Close onClick={logout} />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

const BitcoinWallet = () => {
    return (
        <div className={CnWallet('dropdown-item')}>
            <div className={CnWallet('dropdown-item-left')}>
                <div className={CnWallet('dropdown-item-icon')}>{/* <Icons.Bitcoin /> */}</div>
                <div className={CnWallet('dropdown-item-address')}>0xecc6473...qf39</div>
            </div>
            <div className={CnWallet('dropdown-item-actions')}>
                <Icons.Copy />

                <Icons.Close />
            </div>
        </div>
    )
}

const EvmWallet = () => {
    return (
        <div className={CnWallet('dropdown-item')}>
            <div className={CnWallet('dropdown-item-left')}>
                <div className={CnWallet('dropdown-item-icon')}>{/* <Icons.Metamask /> */}</div>
                <div className={CnWallet('dropdown-item-address')}>0xecc6473...qf39</div>
            </div>
            <div className={CnWallet('dropdown-item-actions')}>
                <Icons.Copy />

                <Icons.Close />
            </div>
        </div>
    )
}
