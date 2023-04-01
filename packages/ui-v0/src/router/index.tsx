import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Contract, CreateContract } from "containers";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/organization/:address" element={<Contract />} />
        <Route path="/org/:address" element={<Contract />} />
        <Route path="/" element={<CreateContract />} />
        <Route path="/create-organization" element={<CreateContract />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
