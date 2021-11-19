import * as React from "react";
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Admin from "./views/Admin"
import Compose from "./views/Compose"
import Details from "./views/Details"
import Home from "./views/Home"

function App () {

return (
	<div>
	<Navbar />
	<Routes>
		<Route path="/" element={<Home/>} />
		<Route path="/details/:blogid" element={<Details/>} />
		<Route path="/admin/:blogid" element={<Admin/>} />
		<Route path="/compose" element={<Compose/>} />	
	</Routes>
</div>
)}


export default App;