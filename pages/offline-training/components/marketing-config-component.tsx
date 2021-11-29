import {
  Card,
  Form,
  InputNumber,
  DatePicker,
  Button,
  Divider,
  Row,
  Col,
  Checkbox
} from 'antd'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState
} from 'react'
import { CheckboxValueType } from 'antd/lib/checkbox/Group'
import moment from 'moment'

interface RefType {
  setFormValue: (data: any) => void
}

interface PropsType {
  onSubmit: (data: any) => void
}

const MarketingConfigComponent: ForwardRefRenderFunction<
  RefType,
  PropsType
> = (props, ref) => {
  const [form] = Form.useForm()
  const [isShowBirdType, setIsShowBirdType] =
    useState(false) //早鸟
  const [isShowPersonType, setIsShowPersonType] =
    useState(false) //三人行
  function onNext(value: any) {
    props.onSubmit(value)
  }

  const formItemLayout = {
    labelCol: {
      span: 4
    },
    wrapperCol: { span: 20 }
  }

  useImperativeHandle(ref, () => ({
    setFormValue: data => {
      form.setFieldsValue({
        ...data,
        earlyDeadTime: moment(data.earlyDeadTime),
        saleDeadTime: moment(data.saleDeadTime),
        groupPrice: data.groupPrice
          ? data.groupPrice / 100
          : data.groupPrice,
        earlyPrice: data.earlyPrice
          ? data.earlyPrice / 100
          : data.earlyPrice,
        price: data.price ? data.price / 100 : data.price
      })
      setTypeVis(data.saleType)
    }
  }))

  const onMarketingGroupChange = (
    value: CheckboxValueType[]
  ) => {
    form.setFieldsValue({
      saleType: value
    })
    setTypeVis(value)
  }

  function setTypeVis(value: any) {
    setIsShowBirdType(value.includes('Early'))
    setIsShowPersonType(value.includes('Group'))
  }

  function getCheckboxBirdChild() {
    if (isShowBirdType) {
      return (
        <>
          <Form.Item
            label="早鸟价格"
            name="earlyPrice"
            wrapperCol={{ span: 8 }}
          >
            <InputNumber
              step={'0.01'}
              style={{ width: '100%' }}
            ></InputNumber>
          </Form.Item>
          <Form.Item
            label="早鸟订购截止日期"
            name="earlyDeadTime"
            wrapperCol={{ span: 8 }}
          >
            <DatePicker
              style={{ width: '100%' }}
            ></DatePicker>
          </Form.Item>
        </>
      )
    }
  }

  function getCheckboxPersonChild() {
    if (isShowPersonType) {
      return (
        <>
          <Form.Item
            label="三人行价格"
            name="groupPrice"
            wrapperCol={{ span: 8 }}
          >
            <InputNumber
              style={{ width: '100%' }}
              step="0.01"
            ></InputNumber>
          </Form.Item>
        </>
      )
    }
  }
  return (
    <Card>
      <Form
        form={form}
        name="marketing-config-form"
        onFinish={onNext}
        {...formItemLayout}
      >
        <Form.Item
          label="订购人数人限"
          name="max"
          wrapperCol={{ span: 8 }}
        >
          <InputNumber
            precision={0}
            style={{ width: '100%' }}
          ></InputNumber>
        </Form.Item>
        <Form.Item
          label="价格"
          name="price"
          wrapperCol={{ span: 8 }}
        >
          <InputNumber
            step={'0.01'}
            style={{ width: '100%' }}
          ></InputNumber>
        </Form.Item>
        <Form.Item
          label="订购截止日期"
          name="saleDeadTime"
          wrapperCol={{ span: 8 }}
        >
          <DatePicker
            style={{ width: '100%' }}
          ></DatePicker>
        </Form.Item>
        <Divider />
        <Form.Item
          label="营销类型"
          name="saleType"
          wrapperCol={{ span: 24 }}
        >
          <Checkbox.Group
            style={{ width: '100%' }}
            onChange={checkedValue =>
              onMarketingGroupChange(checkedValue)
            }
          >
            <Row>
              <Col span={4}>
                <Checkbox
                  value="Early"
                  style={{ lineHeight: '32px' }}
                >
                  早鸟价格
                </Checkbox>
              </Col>
              <Col span={4}>
                <Checkbox
                  value="Group"
                  style={{ lineHeight: '32px' }}
                >
                  三人行
                </Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        </Form.Item>
        {getCheckboxBirdChild()}
        {getCheckboxPersonChild()}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default forwardRef<any, any>(
  MarketingConfigComponent
)
