import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const SaleOrder = () => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const wrapperRef = useRef(null);

  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5001/user/${searchTerm}`)
      .then((res) => {setCustomer(res.data);})
      .catch((err) => {console.log(err);});
  }, [searchTerm]);

  const filteredCustomers = customer.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);
  return (
    <div className="bg-white shadow-md rounded px-16 pt-6 pb-8 mb-4">
      <div className="mb-4" ref={wrapperRef}>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="customerName"
        >
          Khách hàng *
        </label>
        <div style={{ position: "relative" }}>
          <input
            className="shadow appearance-none border rounded w-[50%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="customerName"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={() => setShowSuggestions(true)}
            placeholder="Nhập tên khách hàng"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded ml-4 shadow appearance-none border bg-green-600"
            onClick={() => setShowSuggestions(!showSuggestions)}
          >
            Search
          </button>
          {showSuggestions && (
            <div
              className="absolute bg-white border border-gray-300 rounded mt-1 w-[50%] max-h-60 overflow-y-auto shadow-lg"
              style={{ zIndex: 1000 }}
            >
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="border-b border-gray-200 p-2 text-left">
                      Mã
                    </th>
                    <th className="border-b border-gray-200 p-2 text-left">
                      Tên khách hàng
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          setSearchTerm(customer.name);
                          setShowSuggestions(false);
                          setPhone(customer.phone);
                          setEmail(customer.gmail);
                        }}
                      >
                        <td className="border-b border-gray-200 p-2">
                          {customer.id}
                        </td>
                        <td className="border-b border-gray-200 p-2">
                          {customer.name}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="border-b border-gray-200 p-2"
                        colSpan="2"
                        style={{ textAlign: "center" }}
                      >
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/*  */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="debt"
          >
            Công nợ
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="debt"
            type="text"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="deliveryAddress"
          >
            Địa chỉ giao hàng
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="deliveryAddress"
            type="text"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="phone"
          >
            Điện thoại
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="text"
            value={phone}
            readOnly
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={email}
            readOnly

          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="reference"
          >
            Số CT tham chiếu
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="reference"
            type="text"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vatInvoice"
          >
            Xuất hóa đơn VAT
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="vatInvoice"
          >
            <option value="noInvoice">Không lấy HĐ</option>
            <option value="invoice">Lấy HĐ</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="notes"
        >
          Ghi chú
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="notes"
          rows="3"
        />
      </div>

      <div className="mt-6 flex justify-end space-x-4"></div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                #
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Barcode
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Mã hàng
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Tên hàng
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                ĐVT
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                SL Tồn
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Số lượng
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Đơn giá
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Thành tiền
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Giảm (%)
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Giảm giá
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Thuế suất
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Tiền thuế
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
                Tổng tiền
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                className="px-6 py-4 whitespace-no-wrap border-b border-gray-500 text-sm leading-5 text-gray-700"
                colSpan="14"
              >
                Không có dữ liệu
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          className="text-blue-500 hover:text-blue-700 font-bold"
          type="button"
        >
          Thêm (F12)
        </button>
      </div>

      <div className="mt-6">
        <div className="flex justify-end">
          <div className="text-right">
            <div className="text-gray-700">Giảm (%)</div>
            <div className="text-gray-700">Thành tiền: 0 VND</div>
            <div className="text-gray-700">Giảm giá: 0 VND</div>
            <div className="text-gray-700">Tổng tiền: 0 VND</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleOrder;
