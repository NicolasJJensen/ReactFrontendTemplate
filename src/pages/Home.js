import React from 'react'
import { useRedirect } from '@react-router-dom'

import api from '@helpers/api'

import useUser from '@hooks/useUser'

export default function Home(props) {
  const [user, setUser] = useUser()
  const redirectTo = useRedirect()

  const signOut = () => {
    api.request({
      url: '/sign_out',
      method: 'delete'
    })
    .then(() => alert('Signed Out'))
    .catch(() => alert('Error :/'))
    setUser(null)
  }

  const checkSignedIn = () => {
    api.request({
      url: '/signed_in',
      method: 'get'
    })
    .then(() => alert('Signed In'))
    .catch(() => alert('Not Signed In'))
  }

  return (
    <div>
      <button onClick={() => redirectTo('/sign_up')} >Sign Up</button>
      <button onClick={() => redirectTo('/sign_in')} >Sign In</button>
      <button onClick={signOut} >Sign Out</button>
      <button onClick={checkSignedIn} >Am I Signed In?</button>
    </div>
  )
}
