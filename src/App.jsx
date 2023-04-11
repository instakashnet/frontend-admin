import React, { useEffect } from 'react'
import { Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getCountriesInit, getBanks, getCurrenciesInit } from './store/actions'

// Import Routes
import { Route } from 'react-router-dom'
import { routes } from './routes'
import { PrivateRoute } from './routes/private'
import { LoginScreen } from './pages/Authentication/login.screen'

// layouts & components
import VerticalLayout from './components/VerticalLayout'
import NonAuthLayout from './components/NonAuthLayout'
import { CustomAlert } from './components/UI/Alert'
import { RefreshSession } from './hoc/refresh-session.component'

// Import scss
import './assets/css/app.css'
import './assets/scss/theme.scss'
import './assets/scss/custom.scss'

console.log({ stage: import.meta.env.REACT_APP_STAGE })

const App = () => {
  const { isSignedIn } = useSelector((state) => state.Login),
    dispatch = useDispatch()

  useEffect(() => {
    if (isSignedIn) {
      dispatch(getCountriesInit())
      dispatch(getCurrenciesInit())
      dispatch(getBanks())
    }
  }, [isSignedIn, dispatch])

  return (
    <RefreshSession>
      <Switch>
        <Route exact path='/login'>
          <NonAuthLayout>
            <LoginScreen />
          </NonAuthLayout>
        </Route>
        {routes.map((route) => (
          <PrivateRoute layout={VerticalLayout} component={route.component} isSignedIn={isSignedIn} key={route.path} {...route} />
        ))}
      </Switch>
      <CustomAlert className='fixed-alert' />
    </RefreshSession>
  )
}

export default App
