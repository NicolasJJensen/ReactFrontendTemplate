import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import useUser from '@hooks/useUser'

export function PrivateRoute({ children, ...rest }) {
  const [user] = useUser()
  return user ? <Route {...rest} >{children}</Route> : <Redirect to='/sign_in' />
}

export function PublicRoute({ children, ...rest }) {
  const [user] = useUser()
  return !user ? <Route {...rest} >{children}</Route> : <Redirect to='/' />
}
