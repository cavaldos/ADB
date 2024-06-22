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
export interface VWInvoice {
  id: number;
  accountID: number;
  accountName: string;
  customerID: number;
  transactionID: number;
  invoiceDate: Date;
  total: number;
  status: boolean;
  notebook: string;
  invoiceDetailList: VWInvoiceDetail[];
}
export interface VWInvoiceDetail {
  id: number;
  productID: number;
  productName: string;
  invoiceID: number;
  quantity: number;
  unitPrice: number;
  unitCost: number;
}

export interface VWProduct {
  id: number; // ID của sản phẩm
  name: string; // Tên sản phẩm
  volume: number; // Thể tích sản phẩm
  price: number; // Giá sản phẩm
  cost: number; // Chi phí sản phẩm
  unit: string; // Đơn vị tính
  type: string; // Loại sản phẩm
  size: number; // Kích thước sản phẩm
}

export interface VWTransaction {
  id: number;
  productID: number;
  productName: string;
  transactionType: 'sale' | 'receipt';
  quantity: number;
  transactionDate: Date;
}
export interface VWRevenue {
  id: number;
  accountID: number;
  accountName: string;
  accountCompany: string;
  invoiceID: number;
  invoiceName: string;
  phone: string;
  date: Date;
  profit: number;
  turnover : number;
}
