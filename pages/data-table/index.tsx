import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { TrainingService } from '~/http/services/learn-service/training.service'
import definePage from '~/shared/common/define-page'
import PageContainer from '~/shared/components/page-container'
import DataForm from '~/shared/components/data-form'
import DataTable from '~/shared/components/data-table'
import { PageService } from '~/bootstrap/http/page.service'
import { Button, Form, Radio } from 'antd'
import { useRouter } from 'next/router'

const trainingService = new TrainingService()
const pageService = new PageService()
const OfflineTrainingListPage: NextPage = () => {
  const [dataSource, setDataSource] = useState([])
  const [status, setStatus] = useState('') //Planning, Ordering, Waiting, Teaching, Finished
  const router = useRouter()
  const options = [
    { label: '全部', value: '' },
    { label: '报名中', value: 'Planning' },
    { label: '已完结', value: 'Finished' }
  ]
  function getTrainData() {
    trainingService.getTrainings().subscribe(data => {
      console.log(data)
      setDataSource(data)
    })
  }

  useEffect(() => {
    getTrainData()
  }, [])

  const onChange = (e: any) => {
    console.log('radio2 checked', e.target.value)
    setStatus(e.target.value)
  }

  const onCreate = () => {
    router.push('/offline-training')
  }

  return (
    <PageContainer>
      <DataForm
        name={'offline-training-list'}
        actions={
          <>
            <Button type={'primary'} onClick={onCreate}>
              新增
            </Button>
          </>
        }
      >
        <Form.Item>
          <Radio.Group
            options={options}
            onChange={onChange}
            value={status}
            optionType="button"
          />
        </Form.Item>
      </DataForm>
      <DataTable
        rowKey={'id'}
        dataSource={dataSource}
        pageService={pageService}
      ></DataTable>
    </PageContainer>
  )
}

export default definePage(OfflineTrainingListPage, {
  title: '线下培训',
  layout: 'workspace',
  auth: true
})
