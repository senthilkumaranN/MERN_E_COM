export const registerFormControls = [
    {
        name: "username",
        label: "User Name",
        placeholder: 'Enter your name',
        componentType: 'input',
        type: 'text',
    },
    {
        name: "email",
        label: "Email",
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: "password",
        label: "Password",
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
    }
]

export  const registerLoginFrom = [

    {
        name: "email",
        label: "Email",
        placeholder: 'Enter your email',
        componentType: 'input',
        type: 'email',
    },
    {
        name: "password",
        label: "Password",
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
    }
]

export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: 'textarea',
        type: "text",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "men", label: "Men"},
            { id: "women", label: "Women"},
            { id: "Kids", label: "Kids"},
            { id: "accessories", label: "Accessories"},
            { id: "footwear", label: "Footwear"},
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike"},
            { id: "adidas", label: "Adidas"},
            { id: "puma", label: "Puma"},
            { id: "levi", label: "Levi's"},
            { id: "zara", label: "Zara"},
            { id: "h&m", label: "H&M"},
        ],
    },
    {
        label: "Price",
        name: "price",
        componentType: 'input',
        type: "number",
        placeholder: "Enter product Price",
    },
    {
        label: "Sale-Price",
        name: "salePrice",
        componentType: 'input',
        type: 'number',
        placeholder: "Enter product Sale-Price",
    },
    {
        label: "Total-Stock",
        name: "totalStock",
        componentType: 'input',
        type: 'number',
        placeholder: "Enter Total Stock",
    },
]

export const ShoppingViewHeaderMenuItems = [
    {
        id: 'home',
        label: 'Home',
        path: '/shop/home'

    },
    {
       id: 'product',
       label: "Products",
       path:"/shop/list"
    },
    {
        id: 'men',
        label: 'Men',
        path: '/shop/list'
    },
    {
        id: 'women',
        label: 'Women',
        path: '/shop/list'
    },
    {
        id: 'kids',
        label: 'Kids',
        path: '/shop/list'
    },
    {
        id: 'footwear',
        label: 'Footwear',
        path: '/shop/list'
    },
    {
        id: 'accessories',
        label: 'Accessories',
        path: '/shop/list'
    },
    {
        id: 'search',
        label: 'Search',
        path: '/shop/search'
    }
]

export const FilterOptions = {
    category: [
        { id: "men", label: "Men"},
        { id: "women", label: "Women"},
        { id: "kids", label: "Kids"},
        { id: "accessories", label: "Accessories"},
        { id: "footwear", label: "Footwear"},
    ],
    brand: [
        { id: "nike", label: "Nike"},
        { id: "adidas", label: "Adidas"},
        { id: "puma", label: "Puma"},
        { id: "levi", label: "Levi's"},
        { id: "zara", label: "Zara"},
        { id: "h&m", label: "H&M"},
    ]
}

export const sortOptions = [
    { id: "price-lowtohigh", label:"Price: Low to High"},
    { id: "price-hightolow", label:"Price: High to Low"},
    { id: "title-atoz", label:"Title: A to Z"},
    { id: "title-ztoa", label:"Title: Z to A"},
]

export const addressFormControls = [
    {
        label: "Address",
        name: "Address",
        componentType: "input",
        type: "text",
        placeholder: "Enter your Address",
    },
    {
        label: "Phone",
        name: "Phone",
        componentType: "input",
        type: "text",
        placeholder: "Enter your Phone number",
    },
    {
        label: "City",
        name: "City",
        componentType: "input",
        type: "text",
        placeholder: "Enter your City",
    },
    {
        label: "Pincode",
        name: "Pincode",
        componentType: "input",
        type: "text",
        placeholder: "Enter your Pincode",
    },
    {
        label: "Notes",
        name: "Notes",
        componentType: "input",
        type: "text",
        placeholder: "Enter your Additional Notes",
    },
]