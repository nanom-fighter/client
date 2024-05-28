import ThreeTest from "@src/pages/ThreeTest"
import Example from "@src/pages/example/Example"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ThreeTest />} />
        <Route path="/a" element={<ThreeTest />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
