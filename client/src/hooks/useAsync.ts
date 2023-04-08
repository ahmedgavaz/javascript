import { useEffect } from "react"

export function useAsync<T>(
    load:()=> Promise<T>,
    onResult: (data: T) => void
){
    return useEffect(()=>{
        load().then((result)=>{
            onResult(result);
        })
    })
}