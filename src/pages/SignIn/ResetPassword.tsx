import { Steps, Button, Form, Input } from 'antd';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestCodeService, resetConfirmService, resetPasswordService } from '../../services/reset.service';

const { Step } = Steps;

function ResetPassword(){
    const nav = useNavigate()
    const [emailForm] = Form.useForm();
    const [passwordForm] = Form.useForm();

    type FieldType = {
        email: string;
        code: number;
    };

    type NewPWDFieldType = {
        password: string;
        repeat: string;
    };

    const [current, setCurrent] = useState(0);
    const [email, setEmail] = useState('')
    const emailRef = useRef(email);
    const [code, setCode] = useState('')
    const codeRef = useRef(code);

    const next = async() => {
        const emailVal = emailForm.getFieldsValue().email;
        const codeVal = emailForm.getFieldsValue().code;
        setCode(() => {
            codeRef.current = codeVal;
            return codeRef.current
        });
        const data = await resetConfirmService(emailRef.current, codeRef.current);
        if(data.code === 200) {
            setCurrent(current + 1);
        }
    }

    const prev = () => setCurrent(current - 1);

    const sendCode = async() => {
        const emailVal = emailForm.getFieldsValue().email;
        setEmail(() => {
            emailRef.current = emailVal;
            return emailRef.current
        });
        if(emailRef.current){
            await requestCodeService(emailRef.current)
        }
        
    }

    const goToLogin = () => {
        nav('/login')
    }

    const handleReset = async() => {
        const value = emailForm.getFieldsValue().password;
        const data = await resetPasswordService(emailRef.current, codeRef.current, value);
        if(data.code === 200) {
            setCurrent(current + 1);
        }
    }
    return (
        <div className="reset">
            <Steps current={current}>
                <Step title="Verify Your Email" />
                <Step title="Reset Your Password" />
                <Step title="Success" />
            </Steps>
            <div className="steps-content">
            {
                        (()=>{
                            if(current === 0){
                                return (<div>
                                    <h2>Reset your password</h2>
                                    <h4>Please input the email</h4>
                                    <Form
                                    form={emailForm}
                                    name='emailForm'
                                    >
                                        <Form.Item<FieldType> 
                                        label="Email" 
                                        name="email"
                                        rules={[{
                                            type: 'email',
                                            message: 'The input is not email'
                                            },{ required: true, message: 'Please input your email!'}]}>
                                        <Input />
                                        </Form.Item>
                                        <Form.Item 
                                            label="Code"
                                            name="code"
                                            rules={[{ required: true, message: 'Please type the code!'}]}>
                                        <Input />
                                        </Form.Item>
                                    </Form>
                                    <Button onClick={sendCode}>Send the code to your email</Button>
                                </div>)
                            }else if(current === 1){
                                return (<div>
                                    <h2>Input your new password</h2>
                                    <h4>Please input the new password.</h4>
                                    <Form 
                                    form={passwordForm}
                                    name='passwordForm'>
                                        <Form.Item<NewPWDFieldType> 
                                            label="New Password" 
                                            name="password">
                                            <Input.Password />
                                        </Form.Item>
                                        <Form.Item 
                                            label="Repeat Password"
                                            name="repeat"
                                            rules={[{ required: true, message: 'Please input password!'}]}>
                                        <Input />
                                        </Form.Item>
                                    </Form>
                                </div>)
                            }else if(current === 2){
                                return (<div>
                                    Reset Password Success!
                                </div>)
                            }
                        })()
                    }
            </div>
            
            <div className="steps-action">
                {current ==0 && (
                <Button type="primary" onClick={next}>
                    Next
                </Button>)
                }
                {current ===1 && (
                <Button type="primary" onClick={handleReset}>
                    Reset Now!
                </Button>)
                }
            {current === 2 && (
                <Button type="primary" onClick={goToLogin}>
                Go to Login
                </Button>
            )}
            {current === 1 && (
                <Button style={{ marginLeft: 8 }} onClick={prev}>
                Previous
                </Button>
            )}
            </div>
        </div>
    )
}

export default ResetPassword;