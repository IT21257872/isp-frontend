import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values) => {
    console.log("Received values:", values);
    const { email, password } = values;
    axios
      .post("user/login", { email, password })
      .then((response) => {
        console.log(response);
        const { data } = response;
        if (data.success === true) {
          localStorage.setItem("sshUsername", data.username);
          localStorage.setItem("sshUserId", data.userId);
          message.success("Login successful");
          navigate("/");
        }

        if (data.error) {
          // messageApi.open({
          //   type: "error",
          //   content: data.message,
          // });

          message.error("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="mb-5 text-4xl font-bold">Login</div>
      <Form
        name="login_form"
        style={{
          width: 350,
          alignContent: "center",
          margin: "auto",
        }}
        initialValues={{
          remember: true,
        }}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email Address"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please input a valid email!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
