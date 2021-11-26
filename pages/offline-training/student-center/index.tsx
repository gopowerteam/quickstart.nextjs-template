import DataForm from '~/shared/components/data-form'
import DataTable from '~/shared/components/data-table'
import React, { useEffect, useRef, useState } from 'react'
import { PageService } from '~/bootstrap/http/page.service'
import { TrainingService } from '~/http/services/learn-service/training.service'
import { RequestParams } from '@gopowerteam/http-request'
import styles from './student.module.less'
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Radio,
  Row,
  Table,
  Tabs,
  Tag
} from 'antd'

import { TabPane } from 'rc-tabs'
import { PlusOutlined } from '@ant-design/icons'

const pageService = new PageService()
const trainingService = new TrainingService()
interface PropsType {
  id: string
}

const StudentCenter: React.FC<PropsType> = props => {
  const [dataSource, setDataSource] = useState([])
  const [status, setStatus] = useState('')
  const [groupStatus, setGroupStatus] = useState('Group')
  const [groupNumber, setGroupNumber] = useState(0)
  const [isModalVisible, setModalVisible] = useState(false)
  const [studentName, setStudentName] = useState<string>()
  const [inputValue, setInputValue] = useState()
  const [inputVisible, setInputVisible] = useState(false)
  const saveInputRef = useRef<any>()
  const { Column } = Table
  const options = [
    { label: '全部', value: '' },
    { label: '临时', value: 'Temporary' },
    { label: '线上购买', value: 'Normal' }
  ]

  const groupOptions = [
    { label: '固定组数', value: 'Group' },
    { label: '固定人数', value: 'Student' }
  ]

  useEffect(() => {
    getDataSource()
  }, [])

  /**
   * 过滤条件
   * @param e
   */
  const onChange = (e: any) => {
    setStatus(e.target.value)
    getDataSource()
  }
  /**
   * 过滤条件
   * @param e
   */
  const onGroupTypeChange = (e: any) => {
    setGroupStatus(e.target.value)
  }

  function onTabChange(value: any) {
    switch (value) {
      case '1':
        getDataSource()
        break
      case '2':
        getGroupStudent()
        break
    }
  }

  function getGroupStudent() {
    trainingService
      .getTrainingGroupStudents(
        new RequestParams({
          page: pageService,
          append: {
            id: props.id
          }
        })
      )
      .subscribe(data => {
        setDataSource(data)
      })
  }

  function getDataSource() {
    trainingService
      .getTrainingStudents(
        new RequestParams({
          page: pageService,
          append: {
            id: props.id
          }
        })
      )
      .subscribe(data => {
        setDataSource(data)
      })
  }

  function addTempStudent() {
    trainingService
      .addStudent(
        new RequestParams({
          append: {
            id: props.id
          },
          data: {
            name: studentName
          }
        })
      )
      .subscribe(data => {
        setModalVisible(false)
      })
  }

  const handleOk = () => {
    addTempStudent()
  }

  const handleCancel = () => {
    setModalVisible(false)
  }

  /**
   * 智能分组
   */
  function createGroup() {
    trainingService
      .group(
        new RequestParams({
          append: {
            id: props.id
          },
          data: {
            number: groupNumber,
            type: groupStatus
          }
        })
      )
      .subscribe(data => {
        getGroupStudent()
      })
  }

  const handleClose = (removedTag: any) => {
    const tags = dataSource.filter(
      tag => tag !== removedTag
    )
    console.log(tags)
    //请求删除
  }

  const showInput = () => {
    setInputVisible(true)
  }

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  }

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
  }

  const forMap = (tag: any) => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault()
          handleClose(tag)
        }}
      >
        {tag}
      </Tag>
    )
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    )
  }

  return (
    <>
      <DataForm
        name={'student-list-form'}
        actions={
          <>
            <div className={styles['add-button']}>
              <Button
                type={'primary'}
                onClick={() => setModalVisible(true)}
              >
                添加
              </Button>
              <Button
                type={'primary'}
                style={{ marginLeft: '10px' }}
              >
                导出
              </Button>
            </div>
          </>
        }
      >
        <Form.Item label={'手机号'} name={'phone'}>
          <InputNumber
            precision={0}
            style={{ width: '180px' }}
          />
        </Form.Item>
        <Form.Item label={'姓名'} name={'name'}>
          <Input style={{ width: '180px' }} />
        </Form.Item>
        <Form.Item>
          <div>
            <Button type={'primary'}>查询</Button>
          </div>
        </Form.Item>
      </DataForm>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <TabPane tab="列表" key="1">
          <Radio.Group
            options={options}
            onChange={onChange}
            value={status}
            optionType="button"
          />
          <DataTable rowKey={'id'} dataSource={dataSource}>
            <Column title={'姓名'} dataIndex={'name'} />
            <Column
              title={'分组名称'}
              dataIndex={'groupName'}
            />
            <Column
              title={'联系电话'}
              dataIndex={'phone'}
            />
            <Column
              title={'学员类型'}
              dataIndex={'studentType'}
              render={data => {
                switch (data) {
                  case 'Normal':
                    return <div>付费学员</div>
                  case 'Temporary':
                    return <div>临时学员</div>
                  default:
                    return <div></div>
                }
              }}
            />
          </DataTable>
        </TabPane>
        <TabPane tab="分组" key="2">
          <Form layout={'horizontal'}>
            <Row>
              <Col span={8}>
                <Form.Item label={'分组方式'}>
                  <Radio.Group
                    onChange={onGroupTypeChange}
                    options={groupOptions}
                    value={groupStatus}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label={'数量'}>
                  <InputNumber
                    precision={0}
                    onChange={(e: any) => setGroupNumber(e)}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <Button onClick={createGroup}>
                    智能分组
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <List
            dataSource={dataSource}
            pagination={{
              onChange: page => {
                console.log(page)
              },
              pageSize: 10
            }}
            renderItem={(item: any) => {
              return (
                <List.Item>
                  <Card
                    style={{ width: '100%' }}
                    title={item.groupName}
                    extra={<a href="#">More</a>}
                  >
                    {item.students?.map((x: any) => {
                      return (
                        <>
                          <Tag>{x.name}</Tag>
                        </>
                      )
                    })}
                    {item.inputVisible && (
                      <Input
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={(e: any) =>
                          (item.inputValue = e.target.value)
                        }
                        onBlur={handleInputConfirm}
                        onPressEnter={handleInputConfirm}
                      />
                    )}
                    {!item.inputVisible && (
                      <Tag
                        onClick={() =>
                          (item.inputVisible = true)
                        }
                        className="site-tag-plus"
                      >
                        <PlusOutlined /> New Tag
                      </Tag>
                    )}
                  </Card>
                </List.Item>
              )
            }}
          />
        </TabPane>
      </Tabs>
      <Modal
        title="添加临时学员"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder={'请输入学员姓名'}
          onChange={e => setStudentName(e.target.value)}
        />
      </Modal>
    </>
  )
}

export default StudentCenter
