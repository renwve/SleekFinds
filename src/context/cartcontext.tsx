"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  savedItems: Product[];

  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;

  saveItem: (product: Product) => void;
  removeSavedItem: (productId: string) => void;
  moveSavedToCart: (product: Product) => void;

  cartCount: number;
  subtotal: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [savedItems, setSavedItems] = useState<Product[]>([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("sleekfinds-cart");
    const storedSaved = localStorage.getItem("sleekfinds-saved");

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }

    if (storedSaved) {
      setSavedItems(JSON.parse(storedSaved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "sleekfinds-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(
      "sleekfinds-saved",
      JSON.stringify(savedItems)
    );
  }, [savedItems]);

  function addToCart(product: Product) {
    setCartItems((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...current,
        {
          product,
          quantity: 1,
        },
      ];
    });
  }

  function removeFromCart(productId: string) {
    setCartItems((current) =>
      current.filter(
        (item) => item.product.id !== productId
      )
    );
  }

  function increaseQuantity(productId: string) {
    setCartItems((current) =>
      current.map((item) =>
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
    setCartItems((current) =>
      current
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

  function saveItem(product: Product) {
    setSavedItems((current) => {
      const alreadySaved = current.some(
        (item) => item.id === product.id
      );

      if (alreadySaved) {
        return current;
      }

      return [...current, product];
    });
  }

  function removeSavedItem(productId: string) {
    setSavedItems((current) =>
      current.filter((item) => item.id !== productId)
    );
  }

  function moveSavedToCart(product: Product) {
    addToCart(product);
    removeSavedItem(product.id);
  }

  const cartCount = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      ),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total +
          item.product.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const total = subtotal;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        saveItem,
        removeSavedItem,
        moveSavedToCart,
        cartCount,
        subtotal,
        total,
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