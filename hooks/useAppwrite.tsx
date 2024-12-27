import { useEffect, useState } from "react"
import { Alert } from "react-native"

//!! Змінити тип у функції
const useAppwrite = (fn: any) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const fetchPostsData = async () => {
        setIsLoading(true)

        try {
            const response = await fn()
            setData(response)
        } catch (error: any) {
            Alert.alert('Error', error.message)
        } finally {
            setIsLoading(false)
        }
    }

    //!! Перевірити працездатність
    useEffect(() => {

        fetchPostsData()
    }, [])

    const refetch = () => fetchPostsData()

    return { data, isLoading, refetch }
}

export default useAppwrite


