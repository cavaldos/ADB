import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function Finance() {
  const bankAccountData = {
    accountNumber: "123456789",
    accountHolderName: "John Doe",
    accountBalance: "10000.00",
    bankName: "XYZ Bank",
  };

  return (
    <Card className="m-4 p-4 bg-white shadow-md">
      <CardContent>
        <Typography variant="h5" component="div">
          Bank Account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Account Number: {bankAccountData.accountNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Account Holder Name: {bankAccountData.accountHolderName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Account Balance: {bankAccountData.accountBalance}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Bank Name: {bankAccountData.bankName}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Finance;
