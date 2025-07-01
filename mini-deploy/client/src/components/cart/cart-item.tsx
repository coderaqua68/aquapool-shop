import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

interface CartItemProps {
  item: {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    quantity: number;
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex items-center space-x-4 py-4 border-b">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-[hsl(207,90%,54%)] font-semibold">
          {parseInt(item.price).toLocaleString()} ₽
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <Minus className="w-4 h-4" />
        </Button>
        <span className="w-8 text-center">{item.quantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => removeItem(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
