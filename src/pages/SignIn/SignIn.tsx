import { Button, Col, Divider, Form, FormProps, Input, Row } from 'antd'
import { useNavigate } from 'react-router-dom';
import { requestCode, signInService } from '../../services/signin.service';

function SignIn() {

  type FieldType = {
    username: string;
    email: string;
    password: string;
    confirm: string;
    code: number;
  };

  const nav = useNavigate()
  const [form] = Form.useForm();
  
  const onFinish: FormProps<FieldType>['onFinish'] = async(values) => {
    const {username, password, code, email} = values
    const data = await signInService(username, password, email,code);
    console.log(data);
    if(data.code === 200) {
      nav('/')
    }
  };

  const onRequestCode = async() => {
    const email = form.getFieldsValue().email;
    await requestCode(email);
  }

  const goToSinUp = () => {
    nav('/login')
  }
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className='login_wrap'>
      <h1>Sign In</h1>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ minWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' },{max: 10}]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' },{max: 10}]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm Password"
          name="confirm"
          rules={[{ required: true, message: 'Please confirm your password!' },{max: 10},
            ({getFieldValue}) => ({
                validator(_, value) {
                    if(!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                    }
                    return Promise.reject(new Error('The new password that you entered do not match!'));
                }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{
            type: 'email',
            message: 'The input is not email'
          },{ required: true, message: 'Please input your email!'}]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Code">
        <Row gutter={2}>
          <Col span={12}>
            <Form.Item
              name="code"
              noStyle
              rules={[{ required: true, message: 'Please input the code you got!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button onClick={onRequestCode}>Request code</Button>
          </Col>
        </Row>
      </Form.Item>


        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
        <Divider></Divider>
      </Form>
      <div>Already has account, go to sign up</div>
      <Button  onClick={goToSinUp}>Sign Up</Button>
    </div>
  )
}

export default SignIn