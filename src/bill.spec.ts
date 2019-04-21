import { Bill } from "./bill";
import { expect } from "chai";
import "mocha";
import { User, UserType } from "./user";
import { Product, ProductType } from "./product";
import { Item } from "./item";

const employeeUser = new User("employee", new Date(), UserType.EMPLOYEE);
const affiliateUser = new User("affiliate", new Date(), UserType.AFFILIATE);
const defaultUser = new User("default", new Date());
const loyalUser = new User("Loyal", new Date(2015, 1, 1, 12, 0, 0, 0));

const groceryProduct = new Product(
  "grocery",
  "product 1",
  150,
  ProductType.GROCERY
);
const defaultProduct = new Product("default", "product 2", 85);

describe("Adding Items", () => {
  it("Adding an item with the same product should not increase the items count", () => {
    const bill = new Bill(defaultUser);
    bill.addItem(new Item(groceryProduct));
    bill.addItem(new Item(groceryProduct));
    expect(bill.items().length).to.equal(1);
    expect(bill.items()[0].quantity).to.equal(2);
  });
});

describe("Testing Percentage Discounts", () => {
  it("Test Employee dicount 30%.", () => {
    const bill = new Bill(employeeUser);
    bill.addItem(new Item(groceryProduct, 1));
    bill.addItem(new Item(defaultProduct, 1));
    expect(bill.percentageDiscount()).to.equal(defaultProduct.price * 0.3);
  });

  it("Test Affiliate Discount 10%.", () => {
    const bill = new Bill(affiliateUser);
    bill.addItem(new Item(groceryProduct, 1));
    bill.addItem(new Item(defaultProduct, 1));
    expect(bill.percentageDiscount()).to.equal(defaultProduct.price * 0.1);
  });

  it("Test Loyal Discount 5%.", () => {
    const bill = new Bill(loyalUser);
    bill.addItem(new Item(groceryProduct, 1));
    bill.addItem(new Item(defaultProduct, 1));
    expect(bill.percentageDiscount()).to.equal(defaultProduct.price * 0.05);
  });

  it("Testing default user Discount 0%.", () => {
    const bill = new Bill(defaultUser);
    bill.addItem(new Item(groceryProduct, 1));
    bill.addItem(new Item(defaultProduct, 1));
    expect(bill.percentageDiscount()).to.equal(0);
  });
});

describe("Test Fixed Discount.", () => {
  it("Fixed Discount", () => {
    const bill = new Bill(defaultUser);
    bill.addItem(new Item(new Product("990item", "990", 990)));
    expect(bill.fixedDiscount()).to.equal(45);
  });
});

describe("Testing total Calculation.", () => {
  it("Total with no discounts", () => {
    const bill = new Bill(defaultUser, []);
    bill.addItem(new Item(defaultProduct));
    expect(bill.totalAfterDiscounts()).to.equal(defaultProduct.price);
  });
});
