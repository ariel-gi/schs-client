import React, { useState } from "react";
import { Container, TextField, Typography } from "@material-ui/core";
import { sendEmail } from "../../actions/verify";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      sendEmail(email);
      setEmail("");
      setEmailSent(true);
    }
  };

  return (
    <Container>
      {!emailSent ? (
        <form>
          <Typography variant="h3">Password Reset</Typography>
          <TextField name="email" variant="outlined" label="email" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={handleEnter} />
        </form>
      ) : (
        <Typography>Email is sending, check your email.</Typography>
      )}
    </Container>
  );
};

export default Forgot;
