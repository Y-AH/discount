import { Discounts } from "./dicounts";
import { Item } from "./item";
import { Product, ProductType } from "./product";
import { User, UserType } from "./user";

export class Bill {
  private static FIXED_DISCOUNT_PER = 100;
  private static FIXED_DISCOUNT_AMOUNT = 5;

  public user: User;

  private itemsMap: { [key: string]: Item } = {};

  constructor(user: User, items: Item[] = []) {
    this.user = user;
    items.forEach(this.addItem);
  }

  /**
   * addItem
   * @param item
   */
  public addItem(item: Item) {
    const productId = item.product.id;
    const oldItem = this.itemsMap[productId];
    if (oldItem) {
      item.quantity += oldItem.quantity;
      this.itemsMap[productId] = item;
    } else {
      this.itemsMap[productId] = item;
    }
  }

  public percentageDiscount() {
    const applicableAmount = this.totalForItems(
      this.items().filter(item => item.product.type !== ProductType.GROCERY)
    );
    let discountAmount = 0;
    if (this.user.type !== UserType.DEFAULT) {
      discountAmount = applicableAmount * Discounts[this.user.type];
    } else {
      if (this.user.yearsSinceJoined() >= 2) {
        discountAmount = applicableAmount * Discounts.LOYAL;
      }
    }
    return discountAmount;
  }

  public fixedDiscount() {
    const total = this.totalForItems(this.items());
    const disocuntTimes = Math.floor(total / Bill.FIXED_DISCOUNT_PER);
    return disocuntTimes * Bill.FIXED_DISCOUNT_AMOUNT;
  }

  public totalAfterDiscounts() {
    return (
      this.totalWithoutDiscount() -
      this.fixedDiscount() -
      this.percentageDiscount()
    );
  }

  public items(): Item[] {
    return Object.values(this.itemsMap);
  }

  private totalForItems(items: Item[]) {
    return items.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }

  private totalWithoutDiscount() {
    return this.totalForItems(this.items());
  }
}
