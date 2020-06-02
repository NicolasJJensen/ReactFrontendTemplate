import React, { useState, useEffect } from 'react'
import {
  Router,
  Switch,
  Route,
  PrivateRoute,
  PublicRoute
} from '@react-router-dom'

import api from '@helpers/api'
import UserContext from '@context/user'

import Home from "@pages/Home"
import SignUp from "@pages/SignUp"
import SignIn from "@pages/SignIn"
import Chatroom from "@pages/Chatroom"
import Chatrooms from "@pages/Chatrooms"

export default function App() {
  const [user, setUser] = useState()
  const [error, setError] = useState()

  const [loading, setLoading] = useState(true)

  // On App load
  useEffect(() => {
    // Make request to get current user
    api.request({
      url: 'signed_in',
      method: 'get',
    })
    .then(res => {
      setUser(res.data)
      setLoading(false)
    })
    .catch(() => setLoading(false))
  }, [])

  //    this is so when a user refreshes the page it first checks if they're logged in 
  //    before redirecting them away from a public/private route
  //    previously they would reload the page and it would no longer know if they were logged in
  //    it would then immediately redirect them to the sign in page
  //    then the request to check if they are logged in would finish and it would redirect them again to the home page
  //    so any time a user refreshed a PrivateRoute they would get redirected to their Homepage
  // (Only necessary if cookie is NOT a HTTPOnly Cookie)
  if(loading) {
    return <></>
  }

  return (
    <UserContext.Provider value={[user, setUser]} >
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PublicRoute path="/sign_up">
            <SignUp />
          </PublicRoute>
          <PublicRoute path="/sign_in">
            <SignIn />
          </PublicRoute>
          <PrivateRoute path="/chatrooms/:chatroom_id" >
            <Chatroom />
          </PrivateRoute>
          <PrivateRoute path="/chatrooms" >
            <Chatrooms />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  )
}
