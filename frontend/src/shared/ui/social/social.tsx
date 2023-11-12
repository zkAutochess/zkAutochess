import React, { FC } from 'react'
import styled from 'styled-components'

import nil from 'assets/images/nil.png'
import mantle from 'assets/images/mantle.png'
import scroll from 'assets/images/scroll.png'
import privy from 'assets/images/privy.png'

const SocialWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SocialTitle = styled.div`
    font-size: 24px;

    color: #fff;

    margin-right: 40px;
`

const SocialImage = styled.img`
    width: 100px;

    margin-right: 20px;
`

export const Social: FC = () => {
    return (
        <SocialWrapper>
            <SocialTitle>Powered by:</SocialTitle>
            <SocialImage src={nil} />
            <SocialImage src={mantle} />
            <SocialImage src={scroll} />
            <SocialImage src={privy} />
        </SocialWrapper>
    )
}
