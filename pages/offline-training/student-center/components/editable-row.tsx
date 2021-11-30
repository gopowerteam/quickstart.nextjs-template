import React, { useEffect, useRef, useState } from 'react'
import { Card, Select, Tag } from 'antd'

interface PropsType {
  data: any
  allGroupData: any[]
  onDelStudent: (data: any) => void
  onAddStudent: (data: any, groupId: string) => void
}

const EditableRow: React.FC<PropsType> = props => {
  const item = props.data
  const [inputVisible, setInputVisible] = useState(false)
  const [allStudents, setAllStudents] = useState(
    props.allGroupData
  )
  const { Option } = Select

  useEffect(() => {
    setAllStudents(props.allGroupData)
  }, [props.allGroupData])

  const handleClose = (sid: any) => {
    //请求删除
    props.onDelStudent(allStudents.find(x => x.id === sid))
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
            style={{
              paddingLeft: '10px',
              paddingRight: '10px',
              marginTop: '5px'
            }}
            closable={item.id !== null}
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
        <Select
          key={item.groupName}
          style={{ width: 200 }}
          showSearch
          optionFilterProp="label"
          onBlur={() => {
            setInputVisible(false)
          }}
          onChange={(e: any) => {
            props.onAddStudent(
              allStudents.find(x => x.id === e),
              item.id
            )
            setInputVisible(false)
          }}
        >
          {allStudents.map(x => (
            <Option
              key={x.id}
              value={x.id}
              title={x.name}
              label={x.name}
            >
              <div
                className={'flex flex-row justify-between'}
              >
                <span>{x.name}</span>
                <span>{x.groupName}</span>
              </div>
            </Option>
          ))}
        </Select>
      )}
      {!inputVisible && item.id !== null && (
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
