import {
  Button,
  Card,
  DatePicker,
  Form,
  InputNumber,
  Radio
} from 'antd'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle
} from 'react'
import moment from 'moment'

interface RefType {
  setFormValue: (data: any) => void
}

interface PropsType {
  onSubmit: (data: any) => void
}

const PublishConfig: ForwardRefRenderFunction<
  RefType,
  PropsType
> = (props, ref) => {
  const [value, setValue] = React.useState('Manual')
  const [form] = Form.useForm()

  function onNext(value: any) {
    props.onSubmit({
      ...value,
      releaseTime: moment(value.releaseTime).format(
        'YYYY-MM-DD'
      )
    })
  }
  useImperativeHandle(ref, () => ({
    setFormValue: data => {
      form.setFieldsValue({
        ...data,
        releaseTime: data.releaseTime
          ? moment(data.releaseTime)
          : undefined
      })
    }
  }))

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo)
  }

  const onChange = (e: any) => {
    setValue(e.target.value)
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: { span: 16 }
  }

  return (
    <Card>
      <Form
        name="publish-config-form"
        onFinish={onNext}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        <Form.Item label="发布设置" name="releaseType">
          <Radio.Group onChange={onChange} value={value}>
            <Radio value={'Manual'}>手动</Radio>
            <Radio value={'Timed'}>定时发布</Radio>
          </Radio.Group>
        </Form.Item>
        {value === 'Timed' && (
          <Form.Item
            label="定时发布时间"
            name="releaseTime"
            rules={[
              {
                required: true,
                message: '请选择发布时间'
              }
            ]}
          >
            <DatePicker />
          </Form.Item>
        )}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default forwardRef<any, any>(PublishConfig)
