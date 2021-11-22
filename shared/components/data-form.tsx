import React, { useState } from 'react'
import { Button, Form, Row, Col } from 'antd'
import DataFormItem from './data-form-item'
import { ColProps } from 'antd/lib/col'
import { FormLabelAlign } from 'antd/lib/form/interface'

// const components = {
//   Wrapper: styled.section``,
//   FormContainer: styled.div`
//     label {
//       word-break: break-word;
//       white-space: pre-wrap;
//       height: 35px;
//     }
//     .ant-picker,
//     .ant-input-number {
//       width: 100%;
//     }
//   `,
//   ActionContainer: styled.div`
//     & > * {
//       margin-right: 10px;
//       min-width: 120px;
//     }
//   `
// }

interface DataFormProp {
  name: string
  column?: number
  gutter?: number
  labelCol?: ColProps
  wrapperCol?: ColProps
  labelAlign?: FormLabelAlign
  colon?: boolean
  actions?: React.ReactNode
  formWidth?: number
  initialValues?: any
  onFieldsChange?: any
  onValuesChange?: any
}

// public static Item = DataFormItem
// public formInstance!: FormInstance

const defaultValue = {
  column: 3,
  gutter: 24,
  colon: false,
  collapseStyle: {
    display: 'none'
  },
  formWidth: '100%'
} as const

const DataForm: React.FC<DataFormProp> = props => {
  const [collapse, updateCollapse] = useState(false)

  return (
    <>
      {renderFormContainer()}
      {renderActionContainer()}
    </>
  )

  function renderActionContainer() {
    const collapseMode = hasCollapseItem()

    return (
      //   <components.ActionContainer>
      <>
        {props.actions}
        {collapseMode && collapse && (
          <Button onClick={() => updateCollapse(!collapse)}>
            More Option
          </Button>
        )}
      </>
      //   </components.ActionContainer>
    )
  }

  function renderFormContainer() {
    const { labelCol, wrapperCol, labelAlign } = props
    const gutter = props.gutter || defaultValue.gutter
    const colon = props.colon || defaultValue.colon
    const formWidth =
      props.formWidth || defaultValue.formWidth

    return (
      //       <components.FormContainer>
      <Form
        onFieldsChange={props.onFieldsChange}
        onValuesChange={props.onValuesChange}
        initialValues={props.initialValues}
        style={{ width: formWidth }}
        colon={colon}
        name={props.name}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        labelAlign={labelAlign}
      >
        <Row justify="start" gutter={gutter}>
          {getFormItems()}
        </Row>
      </Form>
    )
  }

  function getFormItems() {
    const column = props.column || defaultValue.column

    return React.Children.map(
      props.children,
      (child, index) => {
        if (React.isValidElement(child)) {
          const style =
            collapse && child.props.collapse
              ? defaultValue.collapseStyle
              : {}
          const props = { ...child.props }
          delete props.collapse
          return (
            <Col
              span={24 / column}
              key={index}
              style={style}
            >
              <Form.Item {...props}>
                {child.props.children}
              </Form.Item>
            </Col>
          )
        }
        return child
      }
    )
  }

  function hasCollapseItem() {
    let collapse = false
    React.Children.forEach(
      props.children,
      (child: any) =>
        (collapse = child.props.collapse || collapse)
    )

    return collapse
  }
}

export default DataForm
