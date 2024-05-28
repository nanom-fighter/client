import Good from "@src/components/Good"
import Example from "@src/pages/example/Example"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Example />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
