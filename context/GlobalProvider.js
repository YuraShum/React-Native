import { getCurrentUser } from "@/lib/appwrite";
import { createContext, useContext, useState, useEffect, Children } from "react";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCurrentUser().then((res) => {
            if (res) {
                setIsLoggedIn(true)
                setUser(req)
            } else {
                setIsLoggedIn(false)
                setUser(null)
            }
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            setIsLoading(false)
        })

    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLoading,
                user,
                setUser,
                isLoggedIn,
                setIsLoggedIn
            }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
