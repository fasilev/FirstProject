// import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// const CartContext = createContext();

// const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [userId, setUserId] = useState(null);

//   // Fix 1: Remove dependency on localStorage changes
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
//     if (user && user.id) {
//       setUserId(user.id);
//       fetchCart(user.id);
//     }
//   }, []); // Empty dependency array

//   const fetchCart = useCallback(async (id) => {
//     try {
//       const res = await fetch(`http://localhost:2084/users/${id}`);
//       const data = await res.json();
//       setCartItems(data.cart || []);
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//     }
//   }, []);

//   const syncCartToBackend = useCallback(async (updatedCart) => {
//     if (!userId) return;
//     try {
//       await fetch(`http://localhost:2084/users/${userId}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ cart: updatedCart }),
//       });
//     } catch (err) {
//       console.error("Error syncing cart:", err);
//     }
//   }, [userId]);

//   const addToCart = useCallback((product) => {
//     setCartItems(prevItems => {
//       const existing = prevItems.find(item => item.id === product.id);
//       let updatedCart;

//       if (existing) {
//         updatedCart = prevItems.map(item =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       } else {
//         updatedCart = [...prevItems, { ...product, quantity: 1 }];
//       }

//       // Fix 2: Don't await sync to prevent blocking UI
//       syncCartToBackend(updatedCart);
//       return updatedCart;
//     });
//   }, [syncCartToBackend]);

//   const decreaseQuantity = useCallback((productId) => {
//     setCartItems(prevItems => {
//       const updatedCart = prevItems.map(item =>
//         item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
//       ).filter(item => item.quantity > 0);

//       syncCartToBackend(updatedCart);
//       return updatedCart;
//     });
//   }, [syncCartToBackend]);

//   const removeFromCart = useCallback((productId) => {
//     setCartItems(prevItems => {
//       const updatedCart = prevItems.filter(item => item.id !== productId);
//       syncCartToBackend(updatedCart);
//       return updatedCart;
//     });
//   }, [syncCartToBackend]);

//   const clearCart = useCallback(() => {
//     setCartItems([]);
//     syncCartToBackend([]);
//   }, [syncCartToBackend]);

//   // Fix 3: Memoize calculated values
//   const totalItems = React.useMemo(() => {
//     return cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   }, [cartItems]);

//   // Fix 4: Memoize context value to prevent unnecessary re-renders
//   const value = React.useMemo(() => ({
//     cartItems,
//     addToCart,
//     decreaseQuantity,
//     removeFromCart,
//     clearCart,
//     totalItems
//   }), [cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, totalItems]);

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within a CartProvider');
//   }
//   return context;
// };

// export { CartProvider, useCart };



import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [userId, setUserId] = useState(null);

  // When component mounts, and whenever localStorage changes (login/logout)
  useEffect(() => {
    const loadUser = () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser") || "null");
      if (user?.id) {
        setUserId(user.id);
        fetchCart(user.id);
      } else {
        setUserId(null);
        setCartItems([]);
      }
    };

    // Initial load
    loadUser();

    // Listen to localStorage changes (multi-tab safety!)
    window.addEventListener('storage', loadUser);

    return () => {
      window.removeEventListener('storage', loadUser);
    };
  }, []);

  const fetchCart = useCallback(async (id) => {
    try {
      const res = await fetch(`http://localhost:2084/users/${id}`);
      const data = await res.json();
      setCartItems(data.cart || []);
    } catch (err) {
      console.error("Error fetching cart:", err);
    }
  }, []);

  const syncCartToBackend = useCallback(async (updatedCart) => {
    if (!userId) return;
    try {
      await fetch(`http://localhost:2084/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: updatedCart }),
      });
    } catch (err) {
      console.error("Error syncing cart:", err);
    }
  }, [userId]);

  const addToCart = useCallback((product) => {
    setCartItems(prevItems => {
      const existing = prevItems.find(item => item.id === product.id);
      let updatedCart;

      if (existing) {
        updatedCart = prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }

      syncCartToBackend(updatedCart);
      return updatedCart;
    });
  }, [syncCartToBackend]);

  const decreaseQuantity = useCallback((productId) => {
    setCartItems(prevItems => {
      const updatedCart = prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      ).filter(item => item.quantity > 0);

      syncCartToBackend(updatedCart);
      return updatedCart;
    });
  }, [syncCartToBackend]);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => {
      const updatedCart = prevItems.filter(item => item.id !== productId);
      syncCartToBackend(updatedCart);
      return updatedCart;
    });
  }, [syncCartToBackend]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    syncCartToBackend([]);
  }, [syncCartToBackend]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(() => ({
    cartItems,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalItems
  }), [cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, totalItems]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CartProvider, useCart };
