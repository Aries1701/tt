import ProductItem from "./ProductItem";
import products from "./product";

const ProductList = () => {
    return (
        <div>
            {products.map((product) => (
                <ProductItem
                    key={product.id}
                    name={product.name}
                    price={product.price}
                    inStock={product.inStock}
                />
            ))}
        </div>
    );
};

export default ProductList;