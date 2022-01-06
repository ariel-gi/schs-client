import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@material-ui/core";
import { changePassword } from "../../actions/verify";

const ResetPassword = () => {
  const { id, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword({ password: password, confirmPassword: confirmPassword, id: id, token: token });
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <Typography>Reset Password</Typography>
      <TextField variant="outlined" label="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <TextField variant="outlined" label="Confirm New Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default ResetPassword;
