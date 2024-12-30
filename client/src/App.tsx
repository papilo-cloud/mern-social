import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./Layout/Layout"
import Signin from "./components/views/Signin"
import Home from "./components/views/Home"
import PrivateRoute from "./utils/auth/PrivateRoute"
import EditProfile from "./components/views/EditProfile"
import Profile from "./components/views/Profile"
import Users from "./components/views/Users"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Layout />}>
          <Route index element={ <Home />} />
          <Route path="/signin" element={ <Signin />} />
          <Route path="/user/:userId" element={ 
              <PrivateRoute>
                  <Profile />
              </PrivateRoute>
          } />
          <Route path="/user/edit/:userId" element={ 
              <PrivateRoute>
                  <EditProfile />
              </PrivateRoute>
           } />
          <Route path="/users" element={ <Users /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
