export interface Account {
  id: number;
  company: string;
  username: string;
  password: string;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  isAnony: boolean;
}
export interface Invoice {
  id: number;
  accountID: number;
  customerID: number;
  transactionID: number;
  invoiceDate: Date;
  status: boolean;
  total: number;
  notebook: string;
}

export interface InvoiceDetail {
  id: number;
  productID: number;
  invoiceID: number;
  quantity: number;
  unitPrice: number;
  unitCost: number;
}

export interface Product {
  id: number; // ID của sản phẩm
  name: string; // Tên sản phẩm
  volume: number; // Thể tích sản phẩm
  price: number; // Giá sản phẩm
  cost: number; // Chi phí sản phẩm
  unit: string; // Đơn vị tính
  type: string; // Loại sản phẩm
  size: number; // Kích thước sản phẩm
}

export interface Transaction {
  id: number;
  productID: number;
  transactionType: 'sale' | 'receipt';
  quantity: number;
  transactionDate: Date;
}
export interface Revenue {
  id: number;
  accountID: number;
  invoiceID: number;
  invoiceDetailID: number;
  date: Date;
  profit: number;
  turnover : number;
}

