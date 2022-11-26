import { useEffect } from 'react'

export const LoginSuccess = () => {
  useEffect(() => {
    setTimeout(() => {
      window.close()
    }, 1000)
  }, [])

  return <div>Gracias por logearte</div>
}
