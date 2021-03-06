import {
  Button,
  Card,
  DatePicker,
  Form,
  Image,
  Input
} from 'antd'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState
} from 'react'
import moment from 'moment'
import FileUpload from '~/shared/components/file-upload'
import { useFileService } from '~/shared/services/file.service'
import styles from './info.module.less'

interface RefType {
  setFormValue: (data: any) => void
}

interface PropsType {
  onSubmit: (data: any) => void
}

const BasicInfoComponent: ForwardRefRenderFunction<
  RefType,
  PropsType
> = (props, ref) => {
  const { TextArea } = Input
  const [form] = Form.useForm()
  const fileService = useFileService(
    service => service.public
  )
  const [bannerImage, setBannerImage] = useState<string>()

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: { span: 16 }
  }

  function onFinishFailed(errorInfo: any) {
    // props.onSubmit(onSubmit)
    console.log('Failed:', errorInfo)
  }

  function onBasicInfoFinish(value: any) {
    props.onSubmit({
      ...value,
      date: value.date.format('YYYY-MM-DD HH:mm:ss')
    })
  }

  function onFileUpload(fileList: FileList) {
    fileService.upload(fileList).subscribe(data => {
      setBannerImage(data.url)
      form.setFieldsValue({
        bannerImg: data.url
      })
    })
  }

  useImperativeHandle(ref, () => ({
    setFormValue: data => {
      setBannerImage(data.bannerImg)
      form.setFieldsValue({
        ...data,
        date: moment(data.date)
      })
    }
  }))

  return (
    <Card>
      <Form
        form={form}
        name="basic-info-form"
        onFinish={onBasicInfoFinish}
        onFinishFailed={onFinishFailed}
        {...formItemLayout}
      >
        <Form.Item
          label="标题"
          name="title"
          rules={[
            { required: true, message: '请输入标题' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Banner图"
          name="bannerImg"
          rules={[
            {
              required: true,
              message: '请上传Banner图片'
            }
          ]}
        >
          <div className={styles['flex-col']}>
            <FileUpload onUpload={onFileUpload}>
              <Button type={'primary'}>上传</Button>
            </FileUpload>
            <Image src={bannerImage} width={'60%'} />
          </div>
        </Form.Item>
        <Form.Item
          label="日期"
          name="date"
          rules={[
            {
              type: 'object' as const,
              required: true,
              message: '请选择日期'
            }
          ]}
          wrapperCol={{ span: 8 }}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          label="地点"
          name="location"
          rules={[
            { required: true, message: '请输入标题' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="说明"
          name="description"
          rules={[
            { required: true, message: '请输入标题' }
          ]}
        >
          <TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default forwardRef<any, any>(BasicInfoComponent)
