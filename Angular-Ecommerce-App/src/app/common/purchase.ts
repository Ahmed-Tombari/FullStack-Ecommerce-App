import { Address } from "./address";
import { Customer } from "./customer";
import { Order } from "./order";
import { Orderitem } from "./orderitem";

export class Purchase {
  customer: Customer;
  shippingAddress: Address;
  billingAddress: Address;
  order: Order;
  orderItems: Orderitem[];
}
