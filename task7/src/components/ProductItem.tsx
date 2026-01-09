import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";

type ProductItemProps = {
    name: string;
    price: number;
    inStock: boolean;
};

const ProductItem = ({ name, price, inStock }: ProductItemProps) => {
    return (
        <Card>
            <h3>{name}</h3>
            <p> price {price.toLocaleString()} đ</p>

            {inStock ? <Badge label="In Stock" /> : <Badge label="Out of Stock" />}

            <div style={{marginTop: 8}}>
                <Button variant="primary">Add to Cart</Button>
                <span style={{marginLeft: 8}} />
                <Button variant="secondary">View Details</Button>
            </div>
        </Card>
    );
};

export default ProductItem;