import React, { useState } from 'react'
import { Card, Input, Tag } from 'antd'
import styles from '../student.module.less'

interface PropsType {
  data: any
}

const EditableRow: React.FC<PropsType> = (props: any) => {
  const item = props.data
  const [inputVisible, setInputVisible] = useState(false)
  const [inputValue, setInputValue] = useState()
  const handleInputConfirm = () => {
    // if (inputValue && tags.indexOf(inputValue) === -1) {
    //   tags = [...tags, inputValue]
    // }
    // console.log(tags)
    // this.setState({
    //   tags,
    //   inputVisible: false,
    //   inputValue: ''
    // })
    //TODO:请求增加学员
    console.log(inputVisible, inputValue)
  }
  const handleClose = (removedTag: any) => {
    // const tags = dataSource.filter(
    //   tag => tag !== removedTag
    // )
    console.log(removedTag)
    //请求删除
  }

  return (
    <Card
      style={{ width: '100%' }}
      title={item.groupName}
      key={item.groupName}
      extra={<span>共{item.students.length}人</span>}
    >
      {item.students?.map((x: any) => {
        return (
          <Tag
            key={x.id}
            closable
            onClose={e => {
              e.preventDefault()
              handleClose(x.id)
            }}
          >
            {x.name}
          </Tag>
        )
      })}
      {inputVisible && (
        <Input
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={(e: any) =>
            setInputValue(e.target.value)
          }
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
      {!inputVisible && (
        <Tag
          onClick={() => {
            setInputVisible(true)
          }}
          className="site-tag-plus"
        >
          添加
        </Tag>
      )}
    </Card>
  )
}

export default EditableRow
