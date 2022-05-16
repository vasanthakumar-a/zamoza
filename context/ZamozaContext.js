import { createContext, useState,useEffect } from "react"
import { useMoralis, useMoralisQuery } from "react-moralis"
import { zamozaAbi, zamozaCoinAddress } from '../lib/constants'
import { ethers } from "ethers"

export const ZamozaContext = createContext()

export const ZamozaProvider = ({children}) => {
    const [username,setUsername] = useState('')
    const [nickName,setNickname] = useState('')
    const [assets,setAssets] = useState([])
    const [currentAccount,setCurrentAccount] = useState('')
    const [tokenAmount,setTokenAmount] = useState('')
    const [amountDue,setAmountDue] = useState('')
    const [etherScanLink,setEtherScanLink] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [balance, setBalance] = useState('')

    const {
        authenticate,
        isAuthenticated,
        enableWeb3,
        Moralis,
        user,
        isWeb3Enabled,
    } = useMoralis()

    const {
        data: assetsData,
        error: assetsDataError,
        isLoading: userDataisLoading,
    } = useMoralisQuery('assets')

    const getBalance = async () => {
        try {
            if (!isAuthenticated || !currentAccount) return
            
            const options = {
                contractAddress: zamozaCoinAddress,
                functionName: 'balanceOf',
                abi: zamozaAbi,
                params: {
                    account: currentAccount
                },
            }

            if(isWeb3Enabled) {
                const response = await Moralis.executeFunction(options)
                setBalance(response.toString())
            }
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        ;(async()=>{
            if(isAuthenticated) {
                await getBalance()
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
                const account = await user?.get('ethAddress')
                setCurrentAccount(account)
            }
            
        })()
    },[isAuthenticated,user,username,currentAccount,getBalance])

    useEffect(() => {
        ;(async()=>{
            if(isWeb3Enabled){
                await getAssets()
            }
        })()
    },[assetsData,isWeb3Enabled,userDataisLoading])

    const handleSetUsername = () => {
        if(user) {
            if(nickName) {
                user.set('nickname',nickName)
                user.save()
                setNickname('')
            } else {
                console.log('Cant Set Empty NickName')
            }
        } else {
            console.log('No User')
        }
    }

    const buyTokens = async() => {
        try {
            if (!isAuthenticated) {
                await authenticate()
            }
            const amount = ethers.BigNumber.from(tokenAmount)
            const price = ethers.BigNumber.from('100000000000000')
            const calcPrice = amount.mul(price)

            const options = {
                contractAddress: zamozaCoinAddress,
                functionName: 'mint',
                abi: zamozaAbi,
                msgValue: calcPrice,
                params: {
                    amount,
                }
            }

            const transaction = await Moralis.executeFunction(options)
            const recipt = await transaction.wait(4)
            setIsLoading(false)
            console.log(recipt)
            setEtherScanLink(`https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`)
        } catch(error) {
            console.log(error)
        }
    }

    const getAssets = async() => {
        try{
            await enableWeb3
            setAssets(assetsData)
        } catch(error) {
            console.log(error)
        }
    }


    return (
        <ZamozaContext.Provider
        value={{
            isAuthenticated,
            nickName,
            setNickname,
            username,
            handleSetUsername,
            assets,
            buyTokens,
            getBalance,
            balance,
            setTokenAmount,
            tokenAmount,
            amountDue,
            setAmountDue,
            isLoading,
            setIsLoading,
            setEtherScanLink,
            etherScanLink,
        }}
        >
            {children}
        </ZamozaContext.Provider>
    )
}