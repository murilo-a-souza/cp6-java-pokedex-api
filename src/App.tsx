import Header from "./components/Header/Header.tsx";
import {Outlet} from "react-router-dom";

export default function App() {
  return (
    <div>
        <Header></Header>
        <Outlet></Outlet>
    </div>
  )
}
