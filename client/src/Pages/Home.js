import React, { useEffect, useState } from "react";
import { Button, message, Space, Table, Tag } from "antd";
import { Input } from "antd";
import axios from "axios";
const { Search } = Input;

const Home = () => {
  const [ipData, setiPData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("iplist");
        setiPData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("iplist");
      setiPData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

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

  const Unblock = (ip) => {
    axios
      .post("iplist/unblockip", { ipAddress: ip })
      .then((response) => {
        console.log(response);
        fetchData();
        // const { data } = response;
        // if (data.success === true) {
        //   console.log("success");
        // }
      })
      .catch((error) => {
        console.log(error);
        fetchData();
      })
      .finally(() => {
        message.success("IP Unblocked Successfully");
        fetchData();
        window.location.reload();
      });
  };

  const columns = [
    {
      title: "IP",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Attempted Times",
      dataIndex: "attempts",
      key: "attempts",
      render: (text, record) => (
        <p>
          {record.status === "Banned" || record.status === "Unblocked"
            ? "6"
            : text}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Tag
          color={
            record.status === "Banned"
              ? "red"
              : record.status === "Failed"
              ? "yellow"
              : "green"
          }
        >
          <p className="font-bold text-center">{record.status}</p>
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          {record.status === "Banned" && (
            <Button
              type="primary"
              onClick={() => {
                Unblock(record.ip);
              }}
            >
              Unblock
            </Button>
          )}
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <div className="text-3xl font-bold">Blacklisted IP Addresses</div>
        <Button type="primary" onClick={startMonitor}>
          Refresh
        </Button>
      </div>
      <div className="py-4">
        <Search
          placeholder="Enter IP Address"
          allowClear
          onSearch={(value) => console.log(value)}
          size="large"
          style={{
            width: "50%",
          }}
        />
      </div>
      <Table columns={columns} dataSource={ipData} />
    </div>
  );
};

export default Home;
