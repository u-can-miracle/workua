import { useState, useEffect } from "react";

interface IParams {
  onPreload: () => Promise<any>
}

function useDataFetching<T>(params: IParams) {
  const { onPreload } = params

  const [data, setData] = useState<T[]>()
  const [isLoadingCompleted, setIsLoadingCompleted] = useState(false)
  const [isRequestFailed, setIsRequestFailed] = useState(false)

  useEffect(() => {
    // TODO: implement canceling subscription
    onPreload()
      .then((response: T[]) => {
        setData(response)
        setIsLoadingCompleted(true)
      })
      .catch(err => {
        // log error here
        setIsRequestFailed(true)
        setIsLoadingCompleted(true)
      })
  }, [onPreload, setIsLoadingCompleted, setIsRequestFailed, setData])

  return {
    data,
    isLoadingCompleted,
    isRequestFailed,
  };
}

export default useDataFetching;
