import React from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const BankAccount = () => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Bank Account Registration Form
      </h2>
      <form>
        <div className="mb-4">
          <TextField
            select
            label="Please specify the type of account you want to open."
            fullWidth
            variant="outlined"
            className="mt-2"
          >
            <MenuItem value="">
              <em>*Please Select*</em>
            </MenuItem>
            <MenuItem value="savings">Savings</MenuItem>
            <MenuItem value="checking">Checking</MenuItem>
          </TextField>
        </div>
        <div className="mb-4">
          <FormControl component="fieldset">
            <FormLabel component="legend">Currency</FormLabel>
            <RadioGroup row>
              <FormControlLabel value="USD" control={<Radio />} label="USD" />
              <FormControlLabel value="EUR" control={<Radio />} label="EUR" />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="mb-4">
          <FormLabel component="legend">Name</FormLabel>
          <div className="flex mt-2 space-x-2">
            <TextField label="Title" variant="outlined" className="flex-1" />
            <TextField label="First" variant="outlined" className="flex-1" />
            <TextField label="Initials" variant="outlined" className="flex-1" />
          </div>
          <div className="flex mt-2 space-x-2">
            <TextField label="Middle" variant="outlined" className="flex-1" />
            <TextField label="Last" variant="outlined" className="flex-1" />
          </div>
        </div>
        <div className="mb-4">
          <div className="flex mt-2 space-x-2">
            <TextField
              label="Telephone"
              variant="outlined"
              className="flex-1"
            />
            <TextField label="E-mail" variant="outlined" className="flex-1" />
          </div>
        </div>
        <div className="mb-4">
          <FormLabel component="legend">Mailing Home Address</FormLabel>
          <TextField
            label="Street Address"
            variant="outlined"
            fullWidth
            className="mt-2"
          />
          <div className="flex mt-2 space-x-2">
            <TextField label="City" variant="outlined" className="flex-1" />
            <TextField label="State" variant="outlined" className="flex-1" />
          </div>
          <div className="flex mt-2 space-x-2">
            <TextField
              label="Postal / Zip Code"
              variant="outlined"
              className="flex-1"
            />
            <TextField label="Country" variant="outlined" className="flex-1" />
          </div>
        </div>
        <Button variant="contained" color="primary" fullWidth className="mt-4">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BankAccount;
