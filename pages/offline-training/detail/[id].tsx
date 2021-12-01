import { NextPage } from 'next'
import PageContainer from '~/shared/components/page-container'
import definePage from '~/shared/common/define-page'
import {
  Card,
  Col,
  Descriptions,
  Image,
  message,
  Row,
  Tabs
} from 'antd'
import styles from './detail.module.less'
import BasicInfo from '~/pages/offline-training/components/basic-info-component'
import { useEffect, useRef, useState } from 'react'
import { RequestParams } from '@gopowerteam/http-request'
import { TrainingService } from '~/http/services/learn-service/training.service'
import { useRouter } from 'next/router'
import MarketingConfig from '~/pages/offline-training/components/marketing-config-component'
import moment from 'moment'
import PublishConfig from '~/pages/offline-training/components/publish-config-component'
import OrderCenterList from '~/pages/offline-training/order-center'
import StudentCenter from '~/pages/offline-training/student-center'
import axios from 'axios'
import QuestionsComponent from '~/pages/offline-training/components/question-component'

const trainingService = new TrainingService()

const { TabPane } = Tabs

interface ActivityType {
  id: string
  title: string
  date: string
  number: {
    current: number
    max: number
  }
  status: string
  bannerImg: string
  description: string
  location: string
}

const OfflineTrainingDetail: NextPage = () => {
  const router = useRouter()
  const basicInfoRef = useRef<any>()
  const marketingConfigRef = useRef<any>()
  const publishConfigRef = useRef<any>()
  const unmount = useRef(false)
  const [activityModel, setActivityModel] =
    useState<ActivityType>()

  useEffect(() => {
    getBasicInfoDetail()
  }, [])

  //清除副作用
  useEffect(() => {
    return () => {
      unmount.current = true
    }
  })

  /**
   * 获取基本信息详情
   */
  function getBasicInfoDetail() {
    trainingService
      .getTrainingDetail(
        new RequestParams({
          append: {
            id: router.query.id as string
          }
        })
      )
      .subscribe(data => {
        !unmount.current &&
          setActivityModel({
            ...data,
            date: moment(data.date).format('YYYY-MM-DD')
          })
        !unmount.current &&
          basicInfoRef.current?.setFormValue(data)
      })
  }

  /**
   * 完成
   * @param value
   */
  const onSubmitBasicInfo = (value: any) => {
    editBasicInfo(value)
  }

  const editBasicInfo = (value: any) => {
    trainingService
      .updateTrainingDetail(
        new RequestParams({
          data: value,
          append: {
            id: router.query.id as string
          }
        })
      )
      .subscribe(data => {
        message.success('信息更新成功')
        getBasicInfoDetail()
      })
  }

  /**
   * 编辑营销配置
   * @param value
   */
  const onSubmitMarketingConfig = (value: any) => {
    const requestData = {
      ...value,
      earlyDeadTime: value.earlyDeadTime
        ? moment(value.earlyDeadTime).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        : undefined,
      saleDeadTime: value.saleDeadTime
        ? moment(value.saleDeadTime).format(
            'YYYY-MM-DD HH:mm:ss'
          )
        : undefined,
      earlyPrice: value.earlyPrice
        ? value.earlyPrice * 100
        : undefined,
      groupPrice: value.groupPrice
        ? value.groupPrice * 100
        : undefined,
      price: value.price ? value.price * 100 : undefined
    }
    updateMarketingConfig(requestData)
  }

  function updateMarketingConfig(value: any) {
    trainingService
      .updateTrainingSaleConfig(
        new RequestParams({
          append: {
            id: router.query.id as string
          },
          data: value
        })
      )
      .subscribe(data => {
        message.success('营销配置更新成功')
        getBasicInfoDetail()
      })
  }

  /**
   * 完成
   * @param value
   */
  const onSubmitPublishConfig = (value: any) => {
    const requestData = {
      ...value
    }
    updatePublishConfig(requestData)
  }

  function updatePublishConfig(value: any) {
    trainingService
      .updateTrainingRelease(
        new RequestParams({
          append: {
            id: router.query.id as string
          },
          data: value
        })
      )
      .subscribe(data => {
        message.success('发布配置更新成功')
      })
  }

  function getMarketingConfigDetail() {
    trainingService
      .getTrainingSaleConfig(
        new RequestParams({
          append: {
            id: router.query.id as string
          }
        })
      )
      .subscribe(data => {
        !unmount.current &&
          marketingConfigRef.current?.setFormValue(data)
      })
  }

  function getPublishConfigDetail() {
    trainingService
      .getTrainingRelease(
        new RequestParams({
          append: {
            id: router.query.id as string
          }
        })
      )
      .subscribe(data => {
        !unmount.current &&
          publishConfigRef.current?.setFormValue(data)
      })
  }

  const onTabChange = (value: any) => {
    switch (value) {
      case '1':
        getBasicInfoDetail()
        break
      case '2':
        getMarketingConfigDetail()
        break
      case '3':
        getPublishConfigDetail()
        break
    }
  }

  return (
    <PageContainer>
      <Card>
        <Descriptions column={3}>
          <Descriptions.Item span={1}>
            <Image
              width={'80%'}
              height={'100px'}
              src={activityModel?.bannerImg}
            />
          </Descriptions.Item>
          <Descriptions.Item>
            <div className={styles['flex-col']}>
              <Row>
                <Col>{activityModel?.title}</Col>
              </Row>
              <Row style={{ marginTop: '60px' }}>
                <Col>时间 : {activityModel?.date}</Col>
              </Row>
            </div>
          </Descriptions.Item>
          <Descriptions.Item label={'学员人数'}>
            <div>
              {activityModel?.number?.current +
                '/' +
                activityModel?.number?.max}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card>
        <Tabs
          tabPosition={'left'}
          type={'card'}
          onChange={onTabChange}
        >
          <TabPane tab="基本信息" key="1">
            <BasicInfo
              ref={basicInfoRef}
              onSubmit={onSubmitBasicInfo}
            />
          </TabPane>
          <TabPane tab="营销配置" key="2">
            <MarketingConfig
              ref={marketingConfigRef}
              onSubmit={onSubmitMarketingConfig}
            />
          </TabPane>
          <TabPane tab="发布配置" key="3">
            <PublishConfig
              ref={publishConfigRef}
              onSubmit={onSubmitPublishConfig}
            />
          </TabPane>
          <TabPane tab="订购情况" key="4">
            <OrderCenterList />
          </TabPane>
          <TabPane tab="学员管理" key="5">
            <StudentCenter id={router.query.id as string} />
          </TabPane>
          <TabPane tab="问题停车场" key="6">
            <QuestionsComponent
              id={router.query.id as string}
            />
          </TabPane>
        </Tabs>
      </Card>
    </PageContainer>
  )
}

export default definePage(OfflineTrainingDetail, {
  title: '培训详情',
  layout: 'workspace',
  auth: true
})
