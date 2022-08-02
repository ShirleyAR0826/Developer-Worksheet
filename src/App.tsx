import React, { FC, Suspense } from "react"
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import { ApiProvider } from "./Context";

const App: FC = () => (
  <div className="App">
    <ApiProvider key="apiProvider">
      <Suspense fallback={<></>}>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
      </Suspense>
    </ApiProvider>
  </div>
);

export default App;
