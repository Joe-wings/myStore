

import { Card, Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../../api/user";
const Reg = () => {
    const navigate = useNavigate();
    const onFinish = async (values: { username: string,email: string, password: string, confirm_password: string }) => {
        console.log("Success:", values);
        //检查密码是否一致
        if (values.password !== values.confirm_password) {
            message.error("Passwords do not match");
            return;
        }
        try {
            //调用注册接口
            await registerApi(values)
            
        }catch (error:any) {
            if (error.status === 409) {
                message.error("用户名或邮箱已存在");
            }else {
                message.error("注册失败");
            }
            return;
        }
        message.success("注册成功");
        navigate("/");
        return;
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (

        <Card title="LOGIN" className="login-container">
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input placeholder="请输入用户名" />
                </Form.Item>

                <Form.Item
                    label="邮箱"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email!",
                        },
                    ]}
                >
                    <Input placeholder="请输入邮箱" />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input.Password placeholder="请输入密码" />
                </Form.Item>
                <Form.Item
                    label="确认你的密码"
                    name="confirm_password"
                    rules={[
                        {
                            required: true,
                            message: "请再次输入密码！",
                        },
                    ]}
                >
                    <Input.Password placeholder="再次输入密码" />
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        注册
                    </Button>
                    <p />
                </Form.Item>
            </Form>
        </Card>

    );
};

export default Reg;