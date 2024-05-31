import ThreeTest from "@src/pages/ThreeTest"
import Example from "@src/pages/example/Example"
import LCH from "@src/pages/lch/LCH"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ThreeTest />} />
        <Route path="/a" element={<LCH />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
