import React, { useState } from 'react'
import RedirectContext from "./redirectContext"
import {
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom'

export function NewRouter(props) {
  const [redirect, setRedirect] = useState()

  const renderRedirect = () => {
    if(redirect) {
      let newRedirect = redirect
      setTimeout(() => setRedirect(), 1)
      return <Redirect push to={newRedirect} />
    }
    return <></>
  }

  return (
    <RedirectContext.Provider value={setRedirect}>
      <Router>
        {renderRedirect()}
        {props.children}
      </Router>
    </RedirectContext.Provider>
  )
}
