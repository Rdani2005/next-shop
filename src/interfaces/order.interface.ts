export interface Order {
  id: string;
  subTotal: number;
  tax: number;
  total: number;
  itemsInOrder: number;
  isPaid: boolean;
  paidAt: Date;
}
