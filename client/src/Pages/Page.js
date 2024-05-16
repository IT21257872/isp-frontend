import React from "react";
import { Button, Space, Table, Tag } from "antd";
import { Input } from "antd";
const { Search } = Input;

const Page = () => {
  const columns = [
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "User Name",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Date and Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Success" ? "green" : "red"}>
          <p className="font-bold text-center">{status}</p>
        </Tag>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      ip: "192.168.22.25",
      username: "John Doe",
      dateTime: "2021-10-10 10:00:00",
      status: "Success",
    },
    {
      key: "2",

      ip: "192.168.22.26",
      username: "Jane Doe",
      dateTime: "2021-10-10 11:00:00",
      status: "Success",
    },

    {
      key: "3",
      ip: "192.168.22.27",
      username: "Michael Doe",
      dateTime: "2021-10-10 12:00:00",
      status: "Success",
    },

    {
      key: "4",
      ip: "192.168.22.28",
      username: "Emily Doe",
      dateTime: "2021-10-10 13:00:00",
      status: "Success",
    },

    {
      key: "5",
      ip: " 192.168.22.29",
      username: "John Doe",
      dateTime: "2021-10-10 14:00:00",
      status: "Success",
    },
  ];
  return (
    <div>
      <div className="text-3xl font-bold mb-4">Blacklisted IP Addresses</div>
      {/* <div className="py-4">
        <Search
          placeholder="Enter IP Address"
          allowClear
          onSearch={(value) => console.log(value)}
          size="large"
          style={{
            width: "50%",
          }}
        />
      </div> */}{" "}
      <Space size="middle" className="mb-4">
        <Button type="primary" size="large">
          Export CSV
        </Button>
      </Space>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Page;
