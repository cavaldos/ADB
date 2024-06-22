import { Invoice } from "../interfaces/model.interface";
// export interface Invoice {
//   id: number;
//   accountID: number;
//   customerID: number;
//   transactionID: number;
//   invoiceDate: Date;
//   status: boolean;
//   total: number;
//   notebook: string;
// }

// export interface InvoiceDetail {
//   id: number;
//   productID: number;
//   invoiceID: number;
//   quantity: number;
//   unitPrice: number;
//   unitCost: number;
// }

const invoices: Invoice[] = [
  {
    id: 1,
    accountID: 1,
    customerID: 1,
    transactionID: 1,
    invoiceDate: new Date(),
    status: true,
    total: 100000,
    notebook: "Đã thanh toán",
  },
  {
    id: 2,
    accountID: 2,
    customerID: 2,
    transactionID: 2,
    invoiceDate: new Date(),
    status: true,
    total: 200000,
    notebook: "Đã thanh toán",
  },
  {
    id: 3,
    accountID: 3,
    customerID: 3,
    transactionID: 3,
    invoiceDate: new Date(),
    status: true,
    total: 300000,
    notebook: "Đã thanh toán",
  },
  {
    id: 4,
    accountID: 4,
    customerID: 4,
    transactionID: 4,
    invoiceDate: new Date(),
    status: true,
    total: 400000,
    notebook: "Đã thanh toán",
  },
  {
    id: 5,
    accountID: 5,
    customerID: 5,
    transactionID: 5,
    invoiceDate: new Date(),
    status: true,
    total: 500000,
    notebook: "Đã thanh toán",
  },
  {
    id: 6,
    accountID: 6,
    customerID: 6,
    transactionID: 6,
    invoiceDate: new Date(),
    status: true,
    total: 600000,
    notebook: "Đã thanh toán",
  },
];

const invoiceDetails = [
  {
    id: 1,
    productID: 1,
    invoiceID: 1,
    quantity: 1,
    unitPrice: 10000,
    unitCost: 5000,
  },
  {
    id: 2,
    productID: 2,
    invoiceID: 2,
    quantity: 1,
    unitPrice: 10000,
    unitCost: 5000,
  },
  {
    id: 3,
    productID: 3,
    invoiceID: 3,
    quantity: 1,
    unitPrice: 10000,
    unitCost: 5000,
  },
  {
    id: 4,
    productID: 4,
    invoiceID: 4,
    quantity: 1,
    unitPrice: 10000,
    unitCost: 5000,
  },
  {
    id: 5,
    productID: 5,
    invoiceID: 5,
    quantity: 1,
    unitPrice: 10000,
    unitCost: 5000,
  },
  {
    id: 6,
    productID: 6,
    invoiceID: 6,
    quantity: 1,
    unitPrice: 10000,
    unitCost: 5000,
  },
];

export { invoices, invoiceDetails };
