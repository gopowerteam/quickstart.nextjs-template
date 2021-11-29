import DataForm from '~/shared/components/data-form'
import DataTable from '~/shared/components/data-table'
import React, { useEffect, useRef, useState } from 'react'
import { PageService } from '~/bootstrap/http/page.service'
import { TrainingService } from '~/http/services/learn-service/training.service'
import { RequestParams } from '@gopowerteam/http-request'
import styles from './student.module.less'
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  List,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Table,
  Tabs
} from 'antd'

import EditableRow from '~/pages/offline-training/student-center/components/editable-row'

const pageService = new PageService()
const trainingService = new TrainingService()
interface PropsType {
  id: string
}

const StudentCenter: React.FC<PropsType> = props => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const [groupDataSource, setGroupDataSource] = useState<
    any[]
  >([])
  const [studentStatus, setStudentStatus] =
    useState<string>('')
  const [groupStatus, setGroupStatus] = useState('Group')
  const [groupNumber, setGroupNumber] = useState(0)
  const [isModalVisible, setModalVisible] = useState(false)
  const [studentName, setStudentName] = useState<string>()
  const { TabPane } = Tabs
  const [currentPage, setCurrentPage] = useState(0)
  const [form] = Form.useForm()
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

  //人员搜索条件变化
  useEffect(() => {
    getDataSource()
  }, [studentStatus])

  //分组分页变化监听
  useEffect(() => {
    getGroupStudent(currentPage)
  }, [currentPage])

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
        setCurrentPage(0)
        break
    }
  }

  function getGroupStudent(page: number) {
    trainingService
      .getTrainingGroupStudents(
        new RequestParams({
          data: {
            page: page,
            page_size: 10
          },
          append: {
            id: props.id
          }
        })
      )
      .subscribe(data => {
        setGroupDataSource(data)
      })
  }

  function getDataSource() {
    trainingService
      .getTrainingStudents(
        new RequestParams({
          page: pageService,
          append: {
            id: props.id
          },
          data: {
            status: studentStatus,
            ...form.getFieldsValue()
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
        setStudentName(undefined)
        setModalVisible(false)
        getDataSource()
      })
  }

  const handleOk = () => {
    addTempStudent()
  }

  const handleCancel = () => {
    setStudentName(undefined)
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
        setCurrentPage(0)
      })
  }

  /**
   * 删除分组学员
   * @param sid 学员id
   */
  function deleteGroupStu(sid: string) {
    trainingService
      .removeStudent(
        new RequestParams({
          append: {
            id: props.id,
            sid: sid
          }
        })
      )
      .subscribe(data => {
        getDataSource()
      })
  }

  return (
    <>
      <DataForm
        form={form}
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
            <Button
              type={'primary'}
              onClick={getDataSource}
            >
              查询
            </Button>
          </div>
        </Form.Item>
      </DataForm>
      <Tabs defaultActiveKey="1" onChange={onTabChange}>
        <TabPane tab="列表" key="1">
          <Radio.Group
            options={options}
            onChange={e => {
              setStudentStatus(e.target.value)
            }}
            value={studentStatus}
            optionType="button"
          />
          <DataTable
            key={'id'}
            rowKey={'id'}
            dataSource={dataSource}
          >
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
            <Column
              title={'操作'}
              key="action"
              render={data => {
                return (
                  <>
                    <Popconfirm
                      title="确定要删除该学员吗?"
                      onConfirm={() => {
                        deleteGroupStu(data.id)
                      }}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Button type={'link'}>删除</Button>
                    </Popconfirm>
                  </>
                )
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
            dataSource={groupDataSource}
            rowKey={'groupName'}
            pagination={{
              onChange: page => {
                setCurrentPage(page)
              },
              pageSize: 10
            }}
            renderItem={(item: any, index: number) => {
              return (
                <List.Item>
                  <EditableRow
                    onDelStudent={deleteGroupStu}
                    key={index}
                    data={item}
                  />
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
          value={studentName}
          onChange={e => setStudentName(e.target.value)}
        />
      </Modal>
    </>
  )
}

export default StudentCenter
