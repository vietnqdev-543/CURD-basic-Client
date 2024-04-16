import React, { Children } from 'react'
import { useSelector } from 'react-redux'
import NotFound from '../notFound/NotFound'

const ProtectedRoute = ({children}) => {
    const isAdmin = useSelector(state => state.account.user.isAdmin)
    const isLogin = useSelector(state => state.account.isLogin)
  return (
    <div>
        {isAdmin && isLogin ? <> {children} </> :  <NotFound />}
    </div>
  )
}

export default ProtectedRoute