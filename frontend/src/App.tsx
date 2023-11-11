import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import { Create, Game, Home, Join } from 'pages'
import { QueryClientProvider, QueryClient } from 'react-query'
import styled from 'styled-components'
import { Header } from 'shared/ui'
import { PrivyProvider } from '@privy-io/react-auth'

import './App.css'

const queryClient = new QueryClient()

const AppWrapper = styled.div``

function App() {
    return (
        <PrivyProvider appId="clou7wxo3001rl40fe3hhsnwk">
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <AppWrapper className="pageLayout">
                        <Header />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/create" element={<Create />} />
                            <Route path="/game/:id" element={<Game />} />
                            <Route path="/join/:id" element={<Join />} />
                        </Routes>
                    </AppWrapper>
                </BrowserRouter>
            </QueryClientProvider>
        </PrivyProvider>
    )
}

export default App
