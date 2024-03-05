import { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";

const ProductFeed = () => {
    const [products, setProducts] = useState([]);

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

    return (
        <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
            {products.slice(0, 4).map(({ id, title, price, description, category, image }) => (

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
            <img className="md:col-span-full" src="/public/ads.jpg" alt="ads" />

        <div className="md:col-span-2">
                {products.slice(4, 5).map(({ id, title, price, description, category, image }) => (

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

            {products.slice(5,products.length).map(({ id, title, price, description, category, image }) => (

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
    );
};

export default ProductFeed;
