import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Form from "./components/Form/Form";
import Edit from "./components/Edit/Edit";
import Viewmore from "./components/Viewmore/Viewmore";
import Auth from "./components/Auth/Auth";
import Forgot from "./components/Forgot/Forgot";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import { w3cwebsocket } from "websocket";

const Redirect = () => {
  const navigate = useNavigate();
  const navigateto = () => {
    navigate("/posts");
  };
  return (
    <>
      <button onClick={navigateto}>Click to see posts</button>
    </>
  );
};

const App = () => {
  const client = new w3cwebsocket("ws://localhost:5000");

  return (
    <BrowserRouter>
      <Container maxidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Redirect />} />
          <Route path="/posts" exact element={<Home />} />
          <Route path="/posts/search" exact element={<Home />} />
          <Route path="/createpost" exact element={<Form />} />
          <Route path="/edit" exact element={<Edit />} />
          <Route path="/viewmore" exact element={<Viewmore />} />
          <Route path="/auth" exact element={<Auth />} />
          <Route path="/forgot" exact element={<Forgot />} />
          <Route path="/reset-password/:id/:token" exact element={<ResetPassword />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
