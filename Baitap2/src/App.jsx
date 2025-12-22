import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Nav from './component/Nav'
import ProductsDetails from './component/ProductsDetails'
import Search from './pages/Search'
export default function App() {
  return (
    <>
    <Nav/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/gioi-thieu' element={<About/>}/>
      <Route path="/san-pham" element={<Products />} />
      <Route path="/san-pham/:id" element={<ProductsDetails />} />
      <Route path='/tim-kiem' element={<Search/>}/>
      <Route path='/lien-he' element={<Contact/>}/>
    </Routes>
    </>
  )
}
