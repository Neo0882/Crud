// import React from "react";
// import {
//   LaptopOutlined,
//   NotificationOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Navigate, Outlet } from "react-router-dom";
const { Header, Content, Sider } = Layout;
const items1 = ["1", "2", "3"].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const data = [
  {
    id: 1,
    route: "investors",
  },
  {
    id: 2,
    route: "transaction-resource",
  },
  {
    id: 3,
    route: "selling-process-resource",
  },
  {
    id: 4,
    route: "seller-resource",
  },
  {
    id: 5,
    route: "product-resource",
  },
  {
    id: 6,
    route: "payment-graph-resource",
  },
  {
    id: 7,
    route: "comment-resource",
  },
  {
    id: 8,
    route: "client-resource",
  },
  {
    id: 9,
    route: "client-file-resource",
  },
  {
    id: 10,
    route: "file-management-resource",
  },
  {
    id: 11,
    route: "user-info-resource",
  },
];

const keys = [
  { id: 1, key: "GET" },
  { id: 2, key: "POST" },
  { id: 3, key: "DELETE" },
  { id: 4, key: "PUT" },
];

const newData = data.map((el) => {
  return {
    key: `${el.id}`,
    label: `${el.route}`,
    children: keys.map((key) => {
      return {
        key: key.id,
        label: `${key.key}`,
      };
    }),
  };
});
const LayoutApp = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  if (!localStorage.getItem("authToken")) {
    return <Navigate to={"/login"} />;
  }
  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              minHeight: "90vh",
              borderRight: 0,
            }}
            items={newData}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
            minHeight: "100%",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>Investors</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default LayoutApp;
