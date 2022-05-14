import { createContext, useState,useEffect } from "react"
import { useMoralis, useMoralisQuery } from "react-moralis"

export const ZamozaContext = createContext()

export const ZamozaProvider = ({children}) => {
    const [username,setUsername] = useState('')
    const [nickName,setNickname] = useState('')
    const [assets,setAssets] = useState([])

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

    useEffect(()=>{
        ;(async()=>{
            if(isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()
    },[isAuthenticated,user,username])

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
        }}
        >
            {children}
        </ZamozaContext.Provider>
    )
}