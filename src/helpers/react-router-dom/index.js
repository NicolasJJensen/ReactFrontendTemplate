import { Switch, Route, Link, useParams } from 'react-router-dom'
import { NewRouter as Router } from './Router.js'
import { PrivateRoute, PublicRoute } from './Routes'
import useRedirect from './redirectHook'

export {
  Router,
  Switch,
  Link,
  Route,
  PrivateRoute,
  PublicRoute,
  useParams,
  useRedirect
}
