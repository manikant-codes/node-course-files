import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const AddressForm = ({ address, setAddress }) => {
  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Address Form
      </Typography>
      <div>
        <TextField
          label="Street"
          name="street"
          value={address.street}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="City"
          name="city"
          value={address.city}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="State"
            name="state"
            value={address.state}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
          <TextField
            label="Postal Code"
            name="postalCode"
            value={address.postalCode}
            onChange={handleChange}
            required
            fullWidth
            margin="normal"
          />
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
