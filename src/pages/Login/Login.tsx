import { Button, Checkbox, Divider, Form, FormProps, Input } from 'antd'
import './Login.css'
import { login } from '../../services/login.service';
import { useNavigate } from 'react-router-dom';

function Login() {

  type FieldType = {
    username: string;
    password: string;
    remember: boolean;
  };

  const nav = useNavigate()
  
  const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
    console.log('Success:', values);
    const {username, password, remember} = values
    const data = await login(username, password, remember);
    if(data.code === 200) {
      nav('/')
    }
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const goSinIn = () => {
    nav('/sign-in')
  }

  const resetPWD = () => {
    nav('/reset-password')
  }

  return (
    <div className='login_wrap'>
      <h1>Login</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ minWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox> 
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

          <Button type="text" onClick={resetPWD}>Forgot Password?</Button>
        
        <Divider></Divider>
      </Form>
      
      <Button type="text" onClick={goSinIn}>Sign In</Button>
    </div>
  )
}

export default Login