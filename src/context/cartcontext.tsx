"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Product } from "@/data/products";

const CART_STORAGE_KEY = "sleekfinds-cart";
const SAVED_STORAGE_KEY = "sleekfinds-saved";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  savedItems: Product[];
  subtotal: number;
  total: number;

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;

  saveItem: (product: Product) => void;
  removeSavedItem: (productId: string) => void;
  moveSavedToCart: (product: Product) => void;

  isSaved: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Load cart + saved items from browser storage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      const storedSaved = localStorage.getItem(SAVED_STORAGE_KEY);

      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);

        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }

      if (storedSaved) {
        const parsedSaved = JSON.parse(storedSaved);

        if (Array.isArray(parsedSaved)) {
          setSavedItems(parsedSaved);
        }
      }
    } catch (error) {
      console.error("Failed to load cart data:", error);
    } finally {
      setLoaded(true);
    }
  }, []);

  // Persist cart
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(cartItems)
      );
    } catch (error) {
      console.error("Failed to save cart:", error);
    }
  }, [cartItems, loaded]);

  // Persist saved items
  useEffect(() => {
    if (!loaded) return;

    try {
      localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(savedItems)
      );
    } catch (error) {
      console.error("Failed to save saved items:", error);
    }
  }, [savedItems, loaded]);

  // -------------------------
  // CART
  // -------------------------

  function addToCart(product: Product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(productId: string) {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.product.id !== productId
      )
    );
  }

  function increaseQuantity(productId: string) {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  }

  function decreaseQuantity(productId: string) {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.product.id === productId
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  // -------------------------
  // SAVED ITEMS / WISHLIST
  // -------------------------

  function saveItem(product: Product) {
    setSavedItems((currentItems) => {
      const alreadySaved = currentItems.some(
        (item) => item.id === product.id
      );

      if (alreadySaved) {
        return currentItems;
      }

      return [...currentItems, product];
    });
  }

  function removeSavedItem(productId: string) {
    setSavedItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== productId
      )
    );
  }

  function moveSavedToCart(product: Product) {
    addToCart(product);
    removeSavedItem(product.id);
  }

  function isSaved(productId: string) {
    return savedItems.some(
      (item) => item.id === productId
    );
  }

  function isInCart(productId: string) {
    return cartItems.some(
      (item) => item.product.id === productId
    );
  }

  // -------------------------
  // TOTALS
  // -------------------------

  const subtotal = cartItems.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedItems,
        subtotal,
        total,

        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,

        saveItem,
        removeSavedItem,
        moveSavedToCart,

        isSaved,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}