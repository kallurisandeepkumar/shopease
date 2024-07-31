// Product.js


function Product({ product ,handleAddToCart }) {
  

  

  return (
      <div>
      {product.name} - ${product.price}
      <button onClick={()=>handleAddToCart(product)}>Add to Cart</button>
      </div>
    
  );
}

export default Product;
