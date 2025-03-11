import { icons } from "./icons";

const { FaShieldAlt, IoIosGift, MdLocalShipping, FaReply, FaTty } = icons;

export const extraInfomation = [
    {
        id: 1,
        title: "Guarantee",
        sub: "Quality checked",
        icons: <FaShieldAlt></FaShieldAlt>,
    },
    {
        id: 2,
        title: "Free Shipping",
        sub: "Free on all products",
        icons: <IoIosGift></IoIosGift>,
    },
    {
        id: 3,
        title: "Special gift cards",
        sub: "Special gift cards",
        icons: <MdLocalShipping></MdLocalShipping>,
    },
    {
        id: 4,
        title: "Free return",
        sub: "Consultancy",
        icons: <FaReply></FaReply>,
    },
    {
        id: 5,
        title: "Consultancy",
        sub: "Life time 24/7/365",
        icons: <FaTty></FaTty>,
    },
];
