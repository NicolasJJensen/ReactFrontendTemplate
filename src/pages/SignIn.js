import React, { useRef } from 'react'

import api from '@helpers/api'

import useUser from '@hooks/useUser'

export default function SignIn(props) {
  const [user, setUser] = useUser()
  const formRef = useRef()

  const signIn = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)

    api.request({
      url: '/sign_in',
      method: 'post',
      data: formData
    })
    .then(res => setUser(res.data))
    .catch()
  }

  return (
    <form onSubmit={signIn} ref={formRef} >

      <label>Email:</label>
      <input name="email" />

      <label>Password:</label>
      <input name="password" type="password" />

      <button>Submit</button>
    </form>
  )
}
