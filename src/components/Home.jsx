import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Header from "./Header";
import Banner from "./Banner";

const Home = () => {
    // State to hold the products fetched from the API
    const [products, setProducts] = useState([]);

    // State to hold the search query
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch products from the API when the component mounts
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on search query
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // State for dark mode
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div className={`bg-gray-100 ${darkMode && 'dark'}`}>
            {/* Header component */}
            <Header dar={(dark) => setDarkMode(dark)} handleSearch={(query) => setSearchQuery(query)} />
            {/* Banner component */}
            <Banner />
            {/* Grid layout for products */}
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto dark:bg-[#00172D]">
                {/* Display filtered products */}
                {filteredProducts.slice(0, 4).map(({ id, title, price, description, category, image }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))}
                {/* Advertisement */}
                <img className="md:col-span-full" src="./ads.jpg" alt="ads" />
                {/* Additional products */}
                <div className="md:col-span-2">
                    {filteredProducts.slice(4, 5).map(({ id, title, price, description, category, image }) => (
                        <Product
                            key={id}
                            id={id}
                            title={title}
                            price={price}
                            description={description}
                            category={category}
                            image={image}
                        />
                    ))}
                </div>
                {/* Remaining products */}
                {filteredProducts.slice(5, products.length).map(({ id, title, price, description, category, image }) => (
                    <Product
                        key={id}
                        id={id}
                        title={title}
                        price={price}
                        description={description}
                        category={category}
                        image={image}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;
