import { Outlet } from "react-router"
import Navbar from "../component/Navbar"


const ServiceLayout = () => {
  return (
    <main>
      <Navbar />
      <Outlet/>
    </main>
  )
}
export default ServiceLayout