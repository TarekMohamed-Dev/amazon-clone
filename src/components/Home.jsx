import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
import Header from "./Header";
import Banner from "./Banner";
const Home = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
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

    return (
        <>
            <Header handleSearch={(query) => setSearchQuery(query)} />
            <Banner />
            <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
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

                <img className="md:col-span-full" src="./ads.jpg" alt="ads" />

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
        </>
    );
};

export default Home;
