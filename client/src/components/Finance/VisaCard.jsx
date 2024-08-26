import React from "react";
import { FaArrowRight } from "react-icons/fa";

const TransactionHistoryCard = ({ transaction }) => {
  return (
    <div className="w-[800px]  bg-white shadow-md rounded-lg overflow-hidden my-4 p-6 ">
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

      <div className="flex gap-3">
        <div>
          <p className="text-gray-500 mt-4 mb-1">Đến</p>
          <p className="text-gray-900">{transaction.to}</p>

          <p className="text-gray-500 mt-4 mb-1">Ngân hàng</p>
          <p className="text-gray-900">{transaction.bankName}</p>

          <p className="text-gray-500 mt-4 mb-1">Số tài khoản/Thẻ</p>
          <p className="text-gray-900">{transaction.accountNumber}</p>
        </div>
        <div className=" flex ">
          <FaArrowRight className=" my-auto text-xl text-green-600" />
        </div>
        <div>
          <p className="text-gray-500 mt-4 mb-1">Đến</p>
          <p className="text-gray-900">{transaction.to}</p>

          <p className="text-gray-500 mt-4 mb-1">Ngân hàng</p>
          <p className="text-gray-900">{transaction.bankName}</p>

          <p className="text-gray-500 mt-4 mb-1">Số tài khoản/Thẻ</p>
          <p className="text-gray-900">{transaction.accountNumber}</p>
        </div>
      </div>
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
function VisaCard() {
  const transactionData = [
    {
      historyBankingID: "1",
      createTime: "19/01/2024 23:19:00",
      amount: -400000,
      transferContent:
        "VO TRONG HAI VO TRONG HAI chuyen khoan- Ma GD AC SP/ CI503815ddd dfhkadshfk dskfhksdhfk ksdfkjdsahkfjhd asdfkhsdkfjhsadkjfh",
      to: "VO TRONG HAI",
      bankName:
        "VCB - Ngan hang TMCP Ngoai Thuong Viet Nam ddd ddddd dddddd dddd ddddd",
      accountNumber: "0431000268802",
    },
    {
      historyBankingID: "1",
      createTime: "19/01/2024 23:19:00",
      amount: -400000,
      transferContent:
        "VO TRONG HAI VO TRONG HAI chuyen khsdoan- Ma GD AC SP/ CI503815",
      to: "VO TRONG HAI",
      bankName: "VCB - Ngan hang TMCP Ngoai Thuong Viet Nam",
      accountNumber: "0431000268802",
    },
  ];

  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
        {transactionData.map((transaction) => (
          <TransactionHistoryCard
            key={transaction.historyBankingID}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
}

export default VisaCard;
