export class Product {
  label: string;
  price: number;
  options: [];
  description: string;
  constructor(label: string, price: number, options: [], description: string) {
    this.label = label;
    this.price = price;
    this.options = [];
    this.description = description;
  }
}
