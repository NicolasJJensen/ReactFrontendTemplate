import React, { useRef } from 'react'

import api from '@helpers/api'

import useUser from '@hooks/useUser'

export default function SignUp(props) {
  const [user, setUser] = useUser()
  const formRef = useRef()

  const signUp = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)

    api.request({
      url: '/sign_up',
      method: 'post',
      data: formData
    })
    .then(res => setUser(res.data))
    .catch()
  }

  return (
    <form onSubmit={signUp} ref={formRef} >
      <label>Username:</label>
      <input name="username" />

      <label>Email:</label>
      <input name="email" />

      <label>Password:</label>
      <input name="password" type="password" />

      <label>Password Confirmation:</label>
      <input name="password_confirmation" type="password" />

      <button>Submit</button>
    </form>
  )
}
