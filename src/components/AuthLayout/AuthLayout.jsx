import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

const AuthLayout = ({ children, authentication = true }) => {

  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const status = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && status !== authentication) {
      navigate('/')
    } else if (!authentication && status !== authentication) (
      navigate('/login')
    )
    setLoader(false)

  }, [status, authentication, navigate])


  return (
    loader ? (<h1> loading....</h1>) : (<>{children}</>)

  )

}

export default AuthLayout
