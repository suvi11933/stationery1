
import React, { useState } from "react";

function App() {
  const products = [
    { id: 1, name: "Notebook", price: 50, category: "Books" },
    { id: 2, name: "Pen", price: 10, category: "Writing" },
    { id: 3, name: "Pencil", price: 5, category: "Writing" },
    { id: 4, name: "Eraser", price: 5, category: "Writing" },
    { id: 5, name: "School Bag", price: 500, category: "Bags" },
    { id: 6, name: "Color Box", price: 80, category: "Art" },
    { id: 7, name: "Scale", price: 15, category: "Writing" },
    { id: 8, name: "Drawing Book", price: 60, category: "Books" }
  ];

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");

  function addToCart(product) {
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }

  function increaseQuantity(id) {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  }

  function decreaseQuantity(id) {
    setCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    ).filter(item => item.quantity > 0));
  }

  function removeItem(id) {
    setCart(cart.filter(item => item.id !== id));
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );

  const filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial", background: "#f2f2f2", minHeight: "100vh" }}>

      <header style={{ background: "#263b63", color: "white", padding: "25px", textAlign: "center" }}>
        <h1>🛍️ Vishali Stationery Shop</h1>
        <p>Your One Stop Shop for School and Office Supplies</p>
      </header>

      <nav style={{ background: "#172642", padding: "15px", textAlign: "center" }}>
        <a href="#home" style={{ color: "white", margin: "20px" }}>Home</a>
        <a href="#products" style={{ color: "white", margin: "20px" }}>Products</a>
        <a href="#cart" style={{ color: "white", margin: "20px" }}>
          Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </a>
      </nav>

      <section id="home" style={{ textAlign: "center", padding: "40px", background: "#dceaff" }}>
        <h2>Welcome to Our Stationery Shop!</h2>
        <p>All your stationery needs at affordable prices.</p>
      </section>

      <section id="products" style={{ padding: "25px", textAlign: "center" }}>
        <h2>Our Products</h2>

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: "12px", width: "250px", margin: "20px" }}
        />

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
          {filteredProducts.map(product => (
            <div key={product.id} style={{
              background: "white",
              width: "200px",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px #ccc"
            }}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <h4>Price: ₹{product.price}</h4>

              <button onClick={() => addToCart(product)}
                style={{ background: "#263b63", color: "white", padding: "10px", border: "none", cursor: "pointer" }}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && <p>No products found.</p>}
      </section>

      <section id="cart" style={{ padding: "25px", textAlign: "center" }}>
        <h2>Shopping Cart</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} style={{
              background: "white",
              padding: "15px",
              margin: "10px auto",
              maxWidth: "600px",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexWrap: "wrap"
            }}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>

              <button onClick={() => decreaseQuantity(item.id)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQuantity(item.id)}>+</button>

              <span>₹{item.price * item.quantity}</span>

              <button onClick={() => removeItem(item.id)}>Remove</button>
            </div>
          ))
        )}

        <h2>Total Amount: ₹{total}</h2>
      </section>

      <footer style={{ background: "#263b63", color: "white", padding: "20px", textAlign: "center" }}>
        <p>© 2026 Vishali Stationery Shop. All Rights Reserved.</p>
      </footer>

    </div>
  );
}

export default App;
