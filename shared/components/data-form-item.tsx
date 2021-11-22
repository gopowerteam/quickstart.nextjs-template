import React from 'react'
import { FormItemProps } from 'antd/lib/form'

interface ComponentProp extends FormItemProps {
  collapse?: boolean
}

export default class DataForm extends React.Component<ComponentProp> {
  public render() {
    return <></>
  }
}
