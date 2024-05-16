import React, { useEffect } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Page from "./Pages/Page";
import Login from "./Pages/Login";
import axios from "axios";
const { Header, Content, Footer } = Layout;

// axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.baseURL = "http://146.190.115.176:5000/";

// const items = new Array(3).fill(null).map((_, index) => ({
//   key: String(index + 1),
//   label: `nav ${index + 1}`,
// }));

const items = [
  {
    key: "1",
    label: "Home",
    href: "/",
  },
  {
    key: "2",
    label: "Logs",
    href: "/page",
  },
  {
    key: "3",
    label: "Login",
    href: "/login",
  },
];

const App = () => {
  useEffect(() => {
    const startMonitor = () => {
      axios
        .post("iplist/banip")
        .then((response) => {
          console.log(response);
          // fetchData();
          // const { data } = response;
          // if (data.success === true) {
          //   console.log("success");
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    startMonitor();
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Router>
      <Layout>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="demo-logo" />

          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              flex: 1,
              minWidth: 0,
            }}
          >
            <div className="flex items-center justify-center mr-10 text-3xl font-bold text-cyan-50">
              SSHield
            </div>
            {items.map((item) => (
              <Menu.Item key={item.key}>
                <Link to={item.href}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Header>
        <Content
          style={{
            padding: "0 48px",
          }}
        >
          {/* <Breadcrumb
        style={{
          margin: "16px 0",
        }}
      >
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
        <Breadcrumb.Item>App</Breadcrumb.Item>
      </Breadcrumb> */}
          <div
            style={{
              marginTop: 16,
              padding: 24,
              minHeight: "80vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/page" element={<Page />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
          className="text-gray-400"
        >
          All rights reserved by SSHield. ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Router>
  );
};
export default App;
