"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductFiles = void 0;
const addUser = ({ req, data }) => {
    const user = req.user;
    return Object.assign(Object.assign({}, data), { user: user === null || user === void 0 ? void 0 : user.id });
};
const yourOwnAndPurchased = async ({ req }) => {
    const user = req.user;
    if ((user === null || user === void 0 ? void 0 : user.role) === "admin")
        return true;
    if (!user)
        return false;
    const { docs: products } = await req.payload.find({
        collection: 'products',
        depth: 0,
        where: {
            user: {
                equals: user.id,
            },
        },
    });
    const ownProductFileIds = products.map((prod) => prod.product_files).flat();
    const { docs: orders } = await req.payload.find({
        collection: 'orders',
        depth: 2,
        where: {
            user: {
                equals: user.id,
            },
        },
    });
    const purchaseProductFileIds = orders.map((order) => {
        return order.products.map((product) => {
            if (typeof product === "string")
                return req.payload.logger.error('Search depth not sufficient to find purchased file IDs');
            return typeof product.product_files === "string"
                ? product.product_files
                : product.product_files.id;
        });
    })
        .filter(Boolean)
        .flat();
    return {
        id: {
            in: [...ownProductFileIds, ...purchaseProductFileIds,],
        },
    };
};
exports.ProductFiles = {
    slug: 'product_files',
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
    },
    hooks: {
        beforeChange: [addUser],
    },
    access: {
        read: yourOwnAndPurchased,
        update: ({ req }) => req.user.role === "admin",
        delete: ({ req }) => req.user.role === "admin",
    },
    upload: {
        staticURL: "/product_files",
        staticDir: "product_files",
        mimeTypes: ["image/*", "font/*", "application/postscript"],
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: 'users',
            admin: {
                condition: () => false,
            },
            hasMany: false,
            required: true,
        },
    ],
};
