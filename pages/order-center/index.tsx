import { NextPage } from 'next'
import definePage from '~/shared/common/define-page'
import PageContainer from '~/shared/components/page-container'
import DataForm from '~/shared/components/data-form'
import DataTable from '~/shared/components/data-table'
import { useEffect, useState } from 'react'
import { PageService } from '~/bootstrap/http/page.service'
import { TrainingService } from '~/http/services/learn-service/training.service'
import { RequestParams } from '@gopowerteam/http-request'
import {
  Button,
  Form,
  Input,
  InputNumber,
  Radio,
  Table
} from 'antd'
const pageService = new PageService()
const trainingService = new TrainingService()
const Index: NextPage = () => {
  const [dataSource, setDataSource] = useState([])
  const [status, setStatus] = useState('Normal')
  const { Column } = Table
  const options = [
    { label: '全部', value: 'Normal' },
    { label: '早鸟票', value: 'Early' },
    { label: '三人行', value: 'Group' }
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
  return (
    <PageContainer>
      <DataForm
        name={'order-list-form'}
        actions={
          <>
            <Radio.Group
              options={options}
              onChange={onChange}
              value={status}
              optionType="button"
            />
          </>
        }
      >
        <Form.Item label={'手机号'} name={'phone'}>
          <InputNumber
            precision={0}
            style={{ width: '180px' }}
          ></InputNumber>
        </Form.Item>
        <Form.Item label={'姓名'} name={'name'}>
          <Input style={{ width: '180px' }}></Input>
        </Form.Item>
        <Form.Item label={'支付号码'} name={'name'}>
          <InputNumber
            style={{ width: '180px' }}
          ></InputNumber>
        </Form.Item>
        <Form.Item />
        <Form.Item />
        <Form.Item>
          <div>
            <Button type={'primary'}>查询</Button>
          </div>
        </Form.Item>
      </DataForm>
      <DataTable rowKey={'id'} dataSource={dataSource}>
        <Column title={'姓名'} />
      </DataTable>
    </PageContainer>
  )
}

export default definePage(Index, {
  title: '线下培训',
  layout: 'workspace',
  auth: true
})
