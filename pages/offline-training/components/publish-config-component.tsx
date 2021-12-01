import {
  Button,
  Card,
  DatePicker,
  Form,
  Radio,
  TimePicker
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

const PublishConfigComponent: ForwardRefRenderFunction<
  RefType,
  PropsType
> = (props, ref) => {
  const [releaseType, setReleaseType] =
    React.useState<string>('Manual')
  const format = 'HH:mm'
  const [form] = Form.useForm()

  function onNext(value: any) {
    props.onSubmit({
      releaseType: value.releaseType,
      releaseTime:
        moment(value.releaseDate).format('YYYY-MM-DD') +
        ' ' +
        moment(value.releaseTime).format('HH:mm:ss')
    })
  }

  useImperativeHandle(ref, () => ({
    setFormValue: data => {
      setReleaseType(data.releaseType)
      const releaseTime = data.releaseTime
        ? moment(data.releaseTime)
        : undefined
      const releaseDate = data.releaseTime
        ? moment(data.releaseTime)
        : undefined
      form.setFieldsValue({
        releaseType: data.releaseType,
        releaseTime: releaseTime,
        releaseDate: releaseDate
      })
    }
  }))

  function onFinishFailed(errorInfo: any) {
    console.log('Failed:', errorInfo)
  }

  const onChange = (e: any) => {
    setReleaseType(e.target.value)
  }

  function getDateLayouts() {
    if (releaseType === 'Timed') {
      return (
        <>
          <Form.Item
            label="定时发布时间"
            name="releaseDate"
            rules={[
              {
                required: true,
                message: '请选择发布日期'
              }
            ]}
          >
            <DatePicker />
          </Form.Item>
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
            <TimePicker format={format} />
          </Form.Item>
        </>
      )
    }
    return <></>
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
        form={form}
        name="publish-config-form"
        onFinish={onNext}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        <Form.Item label="发布设置" name="releaseType">
          <Radio.Group onChange={onChange}>
            <Radio value={'Manual'}>手动</Radio>
            <Radio value={'Timed'}>定时发布</Radio>
          </Radio.Group>
        </Form.Item>
        {getDateLayouts()}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default forwardRef<any, any>(PublishConfigComponent)
