import ProductCard from "./productcard";

const products = [
  {
    title: "Antique Table Lamp",
    price: "$165",
    image: "/src/assets/images/banana.jpg",
  },
  {
    title: "Leather Jacket",
    price: "$95",
    image: "/src/assets/images/banana.jpg",
  },
  {
    title: "Vintage Keyboard",
    price: "$180",
    image: "/src/assets/images/banana.jpg",
  },
  {
    title: "Green Necklace",
    price: "$45",
    image: "/src/assets/images/banana.jpg",
  },
  {
    title: "Leather Boots",
    price: "$110",
    image: "/src/assets/images/banana.jpg",
  },
  {
    title: "Silver Tray",
    price: "$72",
    image: "/src/assets/images/banana.jpg",
  },
];

export default function ProductGrid() {
  return (
    <div className="grid flex-1 grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.title} {...product} />
      ))}
    </div>
  );
}