import { Outlet } from "react-router-dom"
import Topbar from "../components/views/Topbar/Topbar"

export const Layout = () => {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  )
}
