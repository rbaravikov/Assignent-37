import { Link } from "react-router-dom"
import '../styles/products.scss'
import { useEffect, useState } from "react"

const Products = ({ setTitle }) => {
    const [products, setProducts] = useState([])
    const [sortedProducts, setSortedProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState()

    const fetchProducts = async () => {
        const resp = await fetch('http://localhost:3000/products')
        const data = await resp.json()
        setFilteredProducts(data)
        setProducts(data)
    }

    useEffect(() =>
        {fetchProducts()}, []
    )

    const filterProducts = (e) => {
        e.target.value === 'all' ?  setFilteredProducts([...products]) :
        e.target.value === 'all' ?  setFilteredProducts([...sortedProducts]) :
        setFilteredProducts(filteredProducts.filter(product => product.category === e.target.value))
    }

    const sortProducts = (e) => {
        if(filteredProducts.length === products.length && e.target.value === "none") {setSortedProducts([...products])}
        else if(e.target.value === "none") {setSortedProducts([...filteredProducts])}
        else if (e.target.value === "increase") {setSortedProducts([...filteredProducts].sort((a, b) => a.price - b.price))}
        else if(e.target.value === "decrease") {setSortedProducts([...filteredProducts].sort((a, b) => b.price - a.price))}
        setFilteredProducts([...sortedProducts])
}
    useEffect(() => {setFilteredProducts([...sortedProducts])}, [sortedProducts])

    return (
        <div className="productsPage">
            <div className="filterContainer">
                <label >
                Filter by category:
                <select name="category" id="category" onChange={filterProducts}>
                    <option value="all">all</option>
                    <option value="electronics">electronics</option>
                </select>
                </label>
                <label >
                Sort by price:    
                <select name="price" id="price" onChange={sortProducts}>
                    <option value="none">none</option>
                    <option value="increase">Price increase</option>
                    <option value="decrease">Price decrease</option>
                </select>
                </label>
            </div>
            <div className="cardsContainer">

                {filteredProducts && filteredProducts.map((product) => (
                    <div className="card" key={product.id} >
                        <h1>{product.title}</h1>
                        <h3>{product.category}<br/>{product.price} €</h3>
                        <p>{product.description}</p>
                        <Link to={'/reviews/' + product.id} onClick={() => setTitle(product.title)}>Show Reviews</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products