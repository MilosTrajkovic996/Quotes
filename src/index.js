import React from "react";
import ReactDOM from "react-dom";
import Layout from "./layout/Layout";
import Main from "./components/main/Main";
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <Layout>
        <Main />
    </Layout>
  </React.StrictMode>,
  document.getElementById('root')
);