import { NextPage } from 'next'
import definePage from '~/shared/common/define-page'
import PageContainer from '~/shared/components/page-container'
import DataForm from '~/shared/components/data-form'
import DataTable from '~/shared/components/data-table'
import React, { useEffect, useState } from 'react'
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
  Modal,
  Radio,
  Row,
  Table,
  Tabs
} from 'antd'

import { TabPane } from 'rc-tabs'

const pageService = new PageService()
const trainingService = new TrainingService()
interface PropsType {
  id: string
}

const StudentCenter: React.FC<PropsType> = props => {
  const [dataSource, setDataSource] = useState([])
  const [status, setStatus] = useState('Normal')
  const [groupStatus, setGroupStatus] = useState('fixGroup')
  const [isModalVisible, setModalVisible] = useState(false)
  const [studentName, setStudentName] = useState<string>()

  const { Column } = Table
  const options = [
    { label: '全部', value: 'Normal' },
    { label: '临时', value: 'Early' },
    { label: '线上购买', value: 'Group' }
  ]

  const groupOptions = [
    { label: '固定组数', value: 'fixGroup' },
    { label: '固定人数', value: 'fixCount' }
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

  function getDataSource() {
    trainingService
      .getTrainingOrders(
        new RequestParams({
          page: pageService
        })
      )
      .subscribe(data => {
        setDataSource(data)
      })
  }

  function addTempStudent() {
    trainingService.addStudent(
      new RequestParams({
        append: {
          id: props.id
        },
        data: {
          id: props.id,
          name: studentName
        }
      })
    )
  }

  const handleOk = () => {
    console.log(studentName)
    // setModalVisible(false)
    addTempStudent()
  }

  const handleCancel = () => {
    setModalVisible(false)
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
      <Tabs defaultActiveKey="1">
        <TabPane tab="列表" key="1">
          <Radio.Group
            options={options}
            onChange={onChange}
            value={status}
            optionType="button"
          />
          <DataTable rowKey={'id'} dataSource={dataSource}>
            <Column title={'姓名'} />
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
                  <InputNumber precision={0} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item>
                  <Button>智能分组</Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>

          <DataTable rowKey={'id'} dataSource={dataSource}>
            <Column title={'姓名'} />
          </DataTable>
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
