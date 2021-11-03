import { Route, Switch } from "react-router"
import { useEffect, useState } from 'react'
import { deleteProduct, getAllProducts, postProduct, putProduct } from '../services/products'
import Products from "../screens/products/Products"
import Layouts from "../layouts/Layouts"
import Landing from "../screens/Landing"

export default function MainContainer(props) {
  const { currentUser } = props
  const [products, setProducts] = useState([])
  const history = useHistory()

  useEffect(() => {
    const fetchProducts = async () => {
      const productlist = await getAllProducts()
      setProducts(productlist)
    }
    fetchProducts()
  }, [])

  const handleProductCreate = async (formData) => {
    const newProduct = await postProduct(formData)
    setProducts((prevState) => [...prevState, newProduct])
    history.push('/products')
  }

  const handleProductUpdate = async (id, formData) => {
    const updateProduct = await putProduct(formData)
    setProducts((prevState) =>
      prevState.map((product) => {
        return product.id === Number(id) ? updateProduct : product
      }))
    history.push('/products')
  }

  const handleProductDelete = async (id) => {
    await deleteProduct(id)
    setProducts((prevState) => prevState.filter((product) => product.id !== id))
  }

  return (
    <div>

      <Switch>
        <Route exact path='/'>
          <Landing currentUser={currentUser} />
        </Route>
        <Route path='/products'>
          <Products products={products} handleProductDelete={handleProductDelete} />
        </Route>
      </Switch>

    </div>
  )
}
