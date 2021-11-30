import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { TrainingService } from '~/http/services/learn-service/training.service'
import definePage from '~/shared/common/define-page'
import PageContainer from '~/shared/components/page-container'
import DataForm from '~/shared/components/data-form'
import DataTable from '~/shared/components/data-table'
import { PageService } from '~/bootstrap/http/page.service'
import { Button, Form, Radio, Table } from 'antd'
import { useRouter } from 'next/router'
import moment from 'moment'
import { RequestParams } from '@gopowerteam/http-request'

const trainingService = new TrainingService()
const pageService = new PageService()

const OfflineTrainingListPage: NextPage = () => {
  const [dataSource, setDataSource] = useState<any[]>([])
  const { Column } = Table
  /**
   * Planning, Ordering, Waiting, Teaching, Finished
   */
  const [status, setStatus] = useState('')
  const router = useRouter()
  const options = [
    { label: '全部', value: '' },
    { label: '报名中', value: 'Planning' },
    { label: '已完结', value: 'Finished' }
  ]

  /**
   * 获取列表
   */
  function getTrainData() {
    trainingService
      .getTrainings(
        new RequestParams({
          page: pageService,
          data: {
            status: status
          }
        })
      )
      .subscribe(data => {
        setDataSource(data)
      })
  }

  useEffect(() => {
    getTrainData()
  }, [])

  /**
   * 过滤条件
   * @param e
   */
  const onChange = (e: any) => {
    setStatus(e.target.value)
    getTrainData()
  }

  /**
   * 创建活动
   */
  const onCreate = () => {
    router.push('/offline-training/basic-info/-1')
  }

  /**
   * 编辑
   * @param id
   */
  const onEdit = (id: string) => {
    router.push(`/offline-training/basic-info/${id}`)
  }

  /**
   * 营销配置
   * @param id
   */
  const onConfig = (id: string) => {
    router.push(`/offline-training/marketing-config/${id}`)
  }

  /**
   * 发布配置
   * @param id
   */
  const onPublishConfig = (id: string) => {
    router.push(`/offline-training/publish-config/${id}`)
  }

  /**
   * 详情
   * @param id
   */
  const onDetail = (id: string) => {
    router.push(`/offline-training/detail/${id}`)
  }

  return (
    <PageContainer>
      <DataForm
        name={'offline-training-list'}
        actions={
          <div className={'flex flex-row justify-end'}>
            <Button type={'primary'} onClick={onCreate}>
              新增
            </Button>
          </div>
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
      >
        <Column
          title="名称"
          dataIndex="title"
          key="title"
        />
        <Column
          title="日期"
          dataIndex="date"
          key="date"
          render={data => {
            return (
              <>{moment(data.date).format('YYYY-MM-DD')}</>
            )
          }}
        />
        <Column
          title="地点"
          dataIndex="location"
          key="location"
        />
        <Column
          title="说明"
          dataIndex="description"
          key="description"
        />
        <Column
          title={'操作'}
          key="action"
          width={100}
          render={data => {
            return (
              <>
                {/*<Button*/}
                {/*  type={'link'}*/}
                {/*  size={'small'}*/}
                {/*  onClick={() => onConfig(data.id)}*/}
                {/*>*/}
                {/*  营销配置*/}
                {/*</Button>*/}
                {/*<Button*/}
                {/*  type={'link'}*/}
                {/*  size={'small'}*/}
                {/*  onClick={() => onPublishConfig(data.id)}*/}
                {/*>*/}
                {/*  发布配置*/}
                {/*</Button>*/}
                <Button
                  type={'link'}
                  size={'small'}
                  onClick={() => onDetail(data.id)}
                >
                  详情
                </Button>
              </>
            )
          }}
        />
      </DataTable>
    </PageContainer>
  )
}

export default definePage(OfflineTrainingListPage, {
  title: '线下培训',
  layout: 'workspace',
  auth: true
})
