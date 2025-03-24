import { icons } from "./icons";
import path from "./path";

export const navigation = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "BLOGS",
    path: `/${path.BLOGS}`,
  },
  {
    id: 4,
    value: "CONTACT US",
    path: `/${path.CONTACT}`,
  },
  {
    id: 5,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 6,
    value: "FAQ",
    path: `/${path.FAQ}`,
  },
];

export const productInfoTabs = [
  {
    id: 1,
    name: "DESCRIPTION",
    content: `
It's been a while since we met the last of the Mi kind. Even though the Xiaomi Mi 4 went on sale back in the summer of 2014, it succeeded in staying relevant for over 20 months and surpassed the lifespan of many competitors. Xiaomi surely took the time to make the Mi 5 worthy of the flagship series name.

The Mi 5 was the first Xiaomi phone to be unveiled under the massive spotlight of the world's biggest mobile expo - the MWC in Barcelona. And with its stunning looks and capable performance, the Mi 5 deserved nothing less.

The Xiaomi Mi 5 is instantly likeable - the new flagship comes with unbelievably thin bezels, a sharp profile, a curved back and a lightweight body - all adding to one of the most impressive exteriors a modern smartphones can hope for.

Then you learn that inside there is the latest Snapdragon 820 chipset, a new 16MP camera with 4-axis optical stabilization and yet no camera hump, generous storage options, rich connectivity options, and a beefy battery. How about that?`,
  },
  {
    id: 2,
    name: "WARRANTY",
    content: `Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:

Frames Used In Upholstered and Leather Products
Limited Lifetime Warranty
A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  },
  {
    id: 3,
    name: "DELIVERY",
    content: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
Picking up at the store
Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
Delivery`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
Picking up at the store`,
  },
];

export const colors = [
  "black",
  "brown",
  "gray",
  "white",
  "pink",
  "yellow",
  "orange",
  "purple",
  "green",
  "blue",
];

export const sorts = [
  {
    id: 1,
    value: "-sold",
    text: "Best selling",
  },
  {
    id: 2,
    value: "-title",
    text: "Alphabet , A-Z",
  },
  {
    id: 3,
    value: "title",
    text: "Alphabet , Z-A",
  },
  {
    id: 4,
    value: "-price",
    text: "Price , high to low",
  },
  {
    id: 5,
    value: "price",
    text: "Price , low to high",
  },
  {
    id: 6,
    value: "-createdAt",
    text: "Date ",
  },
];

export const voteOptions = [
  {
    id: 1,
    text: "Quá tệ",
  },
  {
    id: 2,
    text: "Tệ",
  },
  {
    id: 3,
    text: "Trung bình",
  },
  {
    id: 4,
    text: "Tốt",
  },
  {
    id: 5,
    text: "Xuất sắc",
  },
];

export const roles = [
  {
    code: 0,
    value: "Admin",
  },
  {
    code: 1,
    value: "User",
  },
];
export const activeStatus = [
  {
    code: false,
    value: "Active",
  },
  {
    code: true,
    value: "Blocked",
  },
];
