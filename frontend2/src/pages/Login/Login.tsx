import { useDispatch, useSelector } from 'react-redux'
import { createUserAdapter } from '../../adapters/user.adapters'
import useFetchAndLoad from '../../hooks/useFetchAndLoad'
import { createUser } from '../../redux/states/user'
import { AppStore } from '../../redux/store'
import { login } from '../../services/public.services'

export const Login = () => {
  const { loading, callEndpoint } = useFetchAndLoad() // promise interceptor
  const dispatch = useDispatch()
  const useState = useSelector((store: AppStore) => store.user)
  const handleClick = async () => {
    const user = await callEndpoint(
      login({ email: 'chufo@gmail.com', password: 'asdasd' })
    )
    dispatch(createUser(createUserAdapter(user)))
  }
  return (
    <>
      {loading ? (
        <div>
          <h3>Loading</h3>
        </div>
      ) : (
        <>
          <button onClick={handleClick}>Logearse</button>
          <div>
            <h3>{JSON.stringify(useState)}</h3>
          </div>
        </>
      )}
    </>
  )
}

export default Login
