import { Card, Button, Form, Input, message,  } from "antd";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/user";
const Login = () => {
  const navigate = useNavigate();
  const onFinish = async (values:{email:string,password:string}) => {
    console.log("Success:", values);
    //调用登录接口
    const token= await loginApi(values).catch(err=>{
    
      if(err.status==401){
        message.error("密码错误");
        return;
    }
    message.error("用户名错误");}
  )
  //本地化存储token,跳转主页
  console.log(token);
    if(token){
      localStorage.setItem("token",token.data.access_token);
      navigate("/layout");
    }
  };
  const onFinishFailed = (errorInfo:any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    
    <Card title="登录" className="login-container">
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
          label="邮箱"
          name="email"
          rules={[
            {
              required: true,
              message: "请输入你的邮箱！",
            }
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
              message: "请输入你的密码",
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <p/>
          <a className="login-form-forgot" onClick={()=>navigate("/register")}><i>注册新账号</i></a>
        </Form.Item>
      </Form>
    </Card>
    
  );
};

export default Login;
