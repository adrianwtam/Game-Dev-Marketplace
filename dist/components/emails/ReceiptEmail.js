"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptEmailHtml = exports.ReceiptEmail = void 0;
const utils_1 = require("../../lib/utils");
const components_1 = require("@react-email/components");
const date_fns_1 = require("date-fns");
const React = __importStar(require("react"));
const ReceiptEmail = ({ email, date, orderId, products }) => {
    const total = products.reduce((acc, curr) => acc + curr.price, 0) + 1;
    return (React.createElement(components_1.Html, null,
        React.createElement(components_1.Head, null),
        React.createElement(components_1.Preview, null, "Your DigitalHippo Receipt"),
        React.createElement(components_1.Body, { style: main },
            React.createElement(components_1.Container, { style: container },
                React.createElement(components_1.Section, null,
                    React.createElement(components_1.Column, null,
                        React.createElement(components_1.Img, { src: `${process.env.NEXT_PUBLIC_SERVER_URL}/hippo-email-sent.png`, width: '100', height: '100', alt: 'DigitalHippo' })),
                    React.createElement(components_1.Column, { align: 'right', style: tableCell },
                        React.createElement(components_1.Text, { style: heading }, "Receipt"))),
                React.createElement(components_1.Section, { style: informationTable },
                    React.createElement(components_1.Row, { style: informationTableRow },
                        React.createElement(components_1.Column, { style: informationTableColumn },
                            React.createElement(components_1.Text, { style: informationTableLabel }, "EMAIL"),
                            React.createElement(components_1.Link, { style: Object.assign({}, informationTableValue) }, email)),
                        React.createElement(components_1.Column, { style: informationTableColumn },
                            React.createElement(components_1.Text, { style: informationTableLabel }, "INVOICE DATE"),
                            React.createElement(components_1.Text, { style: informationTableValue }, (0, date_fns_1.format)(date, 'dd MMM yyyy'))),
                        React.createElement(components_1.Column, { style: informationTableColumn },
                            React.createElement(components_1.Text, { style: informationTableLabel }, "ORDER ID"),
                            React.createElement(components_1.Link, { style: Object.assign({}, informationTableValue) }, orderId)))),
                React.createElement(components_1.Section, { style: productTitleTable },
                    React.createElement(components_1.Text, { style: productsTitle }, "Order Summary")),
                products.map((product) => {
                    var _a;
                    const { image } = product.images[0];
                    return (React.createElement(components_1.Section, { key: product.id },
                        React.createElement(components_1.Column, { style: { width: '64px' } }, typeof image !== 'string' && image.url ? (React.createElement(components_1.Img, { src: image.url, width: '64', height: '64', alt: 'Product Image', style: productIcon })) : null),
                        React.createElement(components_1.Column, { style: { paddingLeft: '22px' } },
                            React.createElement(components_1.Text, { style: productTitle }, product.name),
                            product.description ? (React.createElement(components_1.Text, { style: productDescription }, product.description.length > 50
                                ? ((_a = product.description) === null || _a === void 0 ? void 0 : _a.slice(0, 50)) + '...'
                                : product.description)) : null,
                            React.createElement(components_1.Link, { href: `${process.env.NEXT_PUBLIC_SERVER_URL}/thank-you?orderId=${orderId}`, style: productLink }, "Download Asset")),
                        React.createElement(components_1.Column, { style: productPriceWrapper, align: 'right' },
                            React.createElement(components_1.Text, { style: productPrice }, (0, utils_1.formatPrice)(product.price)))));
                }),
                React.createElement(components_1.Section, null,
                    React.createElement(components_1.Column, { style: { width: '64px' } }),
                    React.createElement(components_1.Column, { style: { paddingLeft: '40px', paddingTop: 20 } },
                        React.createElement(components_1.Text, { style: productTitle }, "Transaction Fee")),
                    React.createElement(components_1.Column, { style: productPriceWrapper, align: 'right' },
                        React.createElement(components_1.Text, { style: productPrice }, (0, utils_1.formatPrice)(1)))),
                React.createElement(components_1.Hr, { style: productPriceLine }),
                React.createElement(components_1.Section, { align: 'right' },
                    React.createElement(components_1.Column, { style: tableCell, align: 'right' },
                        React.createElement(components_1.Text, { style: productPriceTotal }, "TOTAL")),
                    React.createElement(components_1.Column, { style: productPriceVerticalLine }),
                    React.createElement(components_1.Column, { style: productPriceLargeWrapper },
                        React.createElement(components_1.Text, { style: productPriceLarge }, (0, utils_1.formatPrice)(total)))),
                React.createElement(components_1.Hr, { style: productPriceLineBottom }),
                React.createElement(components_1.Text, { style: footerLinksWrapper },
                    React.createElement(components_1.Link, { href: '#' }, "Account Settings"),
                    " \u2022",
                    ' ',
                    React.createElement(components_1.Link, { href: '#' }, "Terms of Sale"),
                    " \u2022",
                    ' ',
                    React.createElement(components_1.Link, { href: '#' }, "Privacy Policy ")),
                React.createElement(components_1.Text, { style: footerCopyright },
                    "Copyright \u00A9 2023 DigitalHippo Inc. ",
                    React.createElement("br", null),
                    ' ',
                    React.createElement(components_1.Link, { href: '#' }, "All rights reserved"))))));
};
exports.ReceiptEmail = ReceiptEmail;
const ReceiptEmailHtml = (props) => (0, components_1.render)(React.createElement(exports.ReceiptEmail, Object.assign({}, props)), {
    pretty: true,
});
exports.ReceiptEmailHtml = ReceiptEmailHtml;
const main = {
    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
    backgroundColor: '#ffffff',
};
const resetText = {
    margin: '0',
    padding: '0',
    lineHeight: 1.4,
};
const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    width: '660px',
};
const tableCell = { display: 'table-cell' };
const heading = {
    fontSize: '28px',
    fontWeight: '300',
    color: '#888888',
};
const informationTable = {
    borderCollapse: 'collapse',
    borderSpacing: '0px',
    color: 'rgb(51,51,51)',
    backgroundColor: 'rgb(250,250,250)',
    borderRadius: '3px',
    fontSize: '12px',
    marginTop: '12px',
};
const informationTableRow = {
    height: '46px',
};
const informationTableColumn = {
    paddingLeft: '20px',
    borderStyle: 'solid',
    borderColor: 'white',
    borderWidth: '0px 1px 1px 0px',
    height: '44px',
};
const informationTableLabel = Object.assign(Object.assign({}, resetText), { color: 'rgb(102,102,102)', fontSize: '10px' });
const informationTableValue = {
    fontSize: '12px',
    margin: '0',
    padding: '0',
    lineHeight: 1.4,
};
const productTitleTable = Object.assign(Object.assign({}, informationTable), { margin: '30px 0 15px 0', height: '24px' });
const productsTitle = {
    background: '#fafafa',
    paddingLeft: '10px',
    fontSize: '14px',
    fontWeight: '500',
    margin: '0',
};
const productIcon = {
    margin: '0 0 0 20px',
    borderRadius: '14px',
    border: '1px solid rgba(128,128,128,0.2)',
};
const productTitle = Object.assign({ fontSize: '12px', fontWeight: '600' }, resetText);
const productDescription = Object.assign({ fontSize: '12px', color: 'rgb(102,102,102)' }, resetText);
const productLink = {
    fontSize: '12px',
    color: 'rgb(0,112,201)',
    textDecoration: 'none',
};
const productPriceTotal = {
    margin: '0',
    color: 'rgb(102,102,102)',
    fontSize: '10px',
    fontWeight: '600',
    padding: '0px 30px 0px 0px',
    textAlign: 'right',
};
const productPrice = {
    fontSize: '12px',
    fontWeight: '600',
    margin: '0',
};
const productPriceLarge = {
    margin: '0px 20px 0px 0px',
    fontSize: '16px',
    fontWeight: '600',
    whiteSpace: 'nowrap',
    textAlign: 'right',
};
const productPriceWrapper = {
    display: 'table-cell',
    padding: '0px 20px 0px 0px',
    width: '100px',
    verticalAlign: 'top',
};
const productPriceLine = { margin: '30px 0 0 0' };
const productPriceVerticalLine = {
    height: '48px',
    borderLeft: '1px solid',
    borderColor: 'rgb(238,238,238)',
};
const productPriceLargeWrapper = {
    display: 'table-cell',
    width: '90px',
};
const productPriceLineBottom = { margin: '0 0 75px 0' };
const footerLinksWrapper = {
    margin: '8px 0 0 0',
    textAlign: 'center',
    fontSize: '12px',
    color: 'rgb(102,102,102)',
};
const footerCopyright = {
    margin: '25px 0 0 0',
    textAlign: 'center',
    fontSize: '12px',
    color: 'rgb(102,102,102)',
};
