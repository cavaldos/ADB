import React from "react";

function Visa(props) {
  const {
    BankAccountID,
    AccountHolderName,
    AccountBalance,
    AccountNumber,
    BankName,
    UserName,
    FullName,
    Role,
  } = props;

  return (
    <div className="space-y-16">
      <div className="w-96 h-56 m-auto bg-red-100 rounded-xl relative text-white shadow-2xl transition-transform transform hover:scale-110">
        <img
          className="relative object-cover w-full h-full rounded-xl"
          src="https://i.imgur.com/kGkSg1v.png"
          alt="Visa Card Background"
        />
        <div className="w-full px-8 absolute top-8">
          <div className="flex justify-between">
            <div>
              <p className="font-light">BankName: {BankName}</p>
              <p className="font-medium tracking-widest">{AccountHolderName}</p>
            </div>
            <img
              className="w-14 h-14"
              src="https://i.imgur.com/bbPHJVe.png"
              alt="Visa Logo"
            />
          </div>
          <div className="pt-1">
            <p className="font-light">Card Number</p>
            <p className="font-medium tracking-more-wider">
              {AccountNumber}
            </p>
          </div>
          <div className="pt-6 pr-6">
            <div className="flex justify-between">
              <div>
                <p className="font-light text-xs">Account Balance</p>
                <p className="font-medium tracking-wider text-sm">$ {AccountBalance}</p>
              </div>
              {/* <div>
                <p className="font-light text-xs">Expiry</p>
                <p className="font-medium tracking-wider text-sm">03/25</p>
              </div>
              <div>
                <p className="font-light text-xs">CVV</p>
                <p className="font-bold tracking-more-wider text-sm">···</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Visa;
