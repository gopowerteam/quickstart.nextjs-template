import { NextPage } from 'next'
import Image from 'next/image'
import { Form, Input, Button, Checkbox } from 'antd'

import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons'

import definePage from '~/shared/common/define-page'
import LoginImage from '~/assets/images/login-bg.png'
import styles from './login.module.less'
import { useRouter } from 'next/router'
import { LoginService } from '~/http/services/assistant-service/login.service'
import { userAction } from '~/store'
import { CurrentUserService } from '~/http/services/user-service/current-user.service'

const loginService = new LoginService()
const currentUserService = new CurrentUserService()
interface LoginModel {
  username: string
  password: string
}

const LoginForm = () => {
  const [form] = Form.useForm<LoginModel>()
  const router = useRouter()

  function onSubmit(data: LoginModel) {
    // router.push('/')
    console.log(data)
    loginService
      .loginWithUserName({
        username: 'admin',
        password: 'admin'
      })
      .subscribe(data => {
        userAction.updateToken(data)
        console.log(data)
      })
  }

  function getUser() {
    currentUserService.currentUser().subscribe(data => {
      console.log(data)
    })
  }

  return (
    <div className={styles['login-form']}>
      <div>
        <div className="text-3xl font-bold">
          {'Welcome Back :)'}
        </div>
        <div className="py-10">
          <Form
            form={form}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!'
                }
              ]}
            >
              <Input
                prefix={
                  <UserOutlined className="site-form-item-icon" />
                }
                placeholder="用户名"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入密码!'
                }
              ]}
            >
              <Input
                prefix={
                  <LockOutlined className="site-form-item-icon" />
                }
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                noStyle
              >
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <a href="">忘记密码</a>
              <Button onClick={() => getUser()}>
                user
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles['login-button']}
              >
                登录
              </Button>
              Or <a href="">立刻注册!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

const LoginPage: NextPage = () => {
  function renderLoginBackground() {
    return (
      <div className="flex-auto flex justify-center items-center">
        <Image src={LoginImage} alt=""></Image>
      </div>
    )
  }

  return (
    <div className="flex flex-row absolute inset-0">
      {renderLoginBackground()}
      <LoginForm></LoginForm>
    </div>
  )
}

export default definePage(LoginPage, {
  title: '登录',
  layout: 'blank'
})
