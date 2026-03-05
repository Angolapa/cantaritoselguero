export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage?: string;
  selectedSize: { id: string; name: string; price: number };
  selectedModifiers: { id: string; name: string; priceAdjustment: number }[];
  quantity: number;
  unitPrice: number;
}
