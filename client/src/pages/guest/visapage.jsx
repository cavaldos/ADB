import React, { useState } from "react";

const TransactionHistoryCard = ({ transaction }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4 p-6">
      <p className="text-gray-500 mb-1">Khoảng thời gian</p>
      <p className="text-gray-900 text-lg font-semibold">
        {transaction.createTime}
      </p>

      <p className="text-gray-500 mt-4 mb-1">Số tiền</p>
      <p
        className={`text-lg font-semibold ${
          transaction.amount < 0 ? "text-red-500" : "text-green-500"
        }`}
      >
        {transaction.amount} VND
      </p>

      <p className="text-gray-500 mt-4 mb-1">Nội dung</p>
      <p className="text-gray-900">{transaction.transferContent}</p>

      <p className="text-gray-500 mt-4 mb-1">Đến</p>
      <p className="text-gray-900">{transaction.to}</p>

      <p className="text-gray-500 mt-4 mb-1">Ngân hàng</p>
      <p className="text-gray-900">{transaction.bankName}</p>

      <p className="text-gray-500 mt-4 mb-1">Số tài khoản/Thẻ</p>
      <p className="text-gray-900">{transaction.accountNumber}</p>

      <div className="text-right mt-6">
        <a href="#" className="text-blue-500">
          Tra soát giao dịch
        </a>
      </div>
    </div>
  );
};

const TransactionHistoryList = ({ transactions }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {transactions.map((transaction) => (
        <TransactionHistoryCard
          key={transaction.historyBankingID}
          transaction={transaction}
        />
      ))}
    </div>
  );
};

const transactionData = [
  {
    historyBankingID: "1",
    createTime: "19/01/2024 23:19:00",
    amount: -400000,
    transferContent:
      "VO TRONG HAI VO TRONG HAI chuyen khoan- Ma GD AC SP/ CI503815",
    to: "VO TRONG HAI",
    bankName: "VCB - Ngan hang TMCP Ngoai Thuong Viet Nam",
    accountNumber: "0431000268802",
  },
  // Thêm nhiều dữ liệu khác tại đây
];

const VisaPage = () => {
  return (
    <>
      <div className="">
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
          <TransactionHistoryList transactions={transactionData} />
        </div>
      </div>
    </>
  );
};

export default VisaPage;
