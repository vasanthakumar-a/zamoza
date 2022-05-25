import '../styles/globals.css'
import { MoralisProvider } from 'react-moralis'
import { ZamozaProvider } from '../context/ZamozaContext'
import { ModalProvider } from 'react-simple-hook-modal'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl='https://inm1zo7ggx2z.usemoralis.com:2053/server'
      appId='2ZBbqFcUCoTBYQmm4yXiHixRmMQZ14vwlTS1YwhP'
    >
      <ZamozaProvider>
        <ModalProvider>
          <Component {...pageProps} />
        </ModalProvider>
      </ZamozaProvider>
    </MoralisProvider>
  )
}

export default MyApp
