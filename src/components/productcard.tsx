import { Heart } from "lucide-react";
import Image from "next/image";

interface Props {
  title: string;
  price: string;
  image: string;
}

export default function ProductCard({ title, price, image }: Props) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface text-foreground shadow-sm transition hover:shadow-md">
      <div className="relative">
        <Image
          src={image}
          width={250}
          height={320}
          alt={title}
          className="h-72 w-full object-cover"
        />
        <button className="absolute right-3 top-3 rounded-full border border-border bg-surface p-2 text-foreground shadow">
          <Heart size={16} />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-foreground">{title}</h3>
        <p className="mt-2 text-muted">{price}</p>
      </div>
    </div>
  );
}