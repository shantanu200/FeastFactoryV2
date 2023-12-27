import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Recipe from "./pages/Recipe"
import SingleRecipe from "./pages/SingleRecipe"
import UserDashboard from "./pages/UserDashboard"
function App() {
  return (
    <Routes>
      <Route path="/" index element={<Home />} />
      <Route path="/recipe" element={<Recipe />} />
      <Route path="/recipe/:id" element={<SingleRecipe />} />
      <Route path="/user/:id" element={<UserDashboard />} />
      <Route path="/user" element={<UserDashboard />} />
    </Routes>
  )
}

export default App
