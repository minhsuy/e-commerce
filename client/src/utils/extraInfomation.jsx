import { icons } from "./icons";
import path from "./path";

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


const { MdOutlineDashboard, MdOutlineGroups, RiProductHuntLine, CiMoneyBill
} = icons
export const adminSidebar = [
    {
        id: 1,
        type: "SINGLE",
        text: "Dashboard",
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <MdOutlineDashboard></MdOutlineDashboard>
    },
    {
        id: 2,
        type: "SINGLE",
        text: "Manage User",
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <MdOutlineGroups></MdOutlineGroups>
    },
    {
        id: 3,
        type: "PARENT",
        text: "Manage Products",
        icon: <RiProductHuntLine></RiProductHuntLine>,
        submenu: [
            {
                text: 'Create product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`
            },
            {
                text: 'Manage product',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`
            },
        ]
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Manage Orders',
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <CiMoneyBill></CiMoneyBill>
    }

];

