import { TrainingService } from '~/http/services/learn-service/training.service'
import { NextPage } from 'next'
import PageContainer from '~/shared/components/page-container'
import definePage from '~/shared/common/define-page'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { RequestParams } from '@gopowerteam/http-request'
import MarketingConfig from '~/pages/offline-training/components/marketing-config-component'
import moment from 'moment'
import { message } from 'antd'

const trainingService = new TrainingService()

const MarketingConfigPage: NextPage = () => {
  const router = useRouter()
  const id = router.query.id
  const r = useRef<any>()
  useEffect(() => {
    if (id) {
      getConfigDetail()
    }
  }, [])

  /**
   * 完成
   * @param value
   */
  const onSubmit = (value: any) => {
    const requestData = {
      ...value,
      earlyDeadTime: value.earlyDeadTime
        ? moment(value.earlyDeadTime).format('YYYY-MM-DD')
        : undefined,
      saleDeadTime: value.saleDeadTime
        ? moment(value.saleDeadTime).format('YYYY-MM-DD')
        : undefined,
      earlyPrice: value.earlyPrice
        ? value.earlyPrice * 100
        : undefined,
      groupPrice: value.groupPrice
        ? value.groupPrice * 100
        : undefined,
      price: value.price ? value.price * 100 : undefined
    }
    updateConfig(requestData)
  }

  function updateConfig(value: any) {
    trainingService
      .updateTrainingSaleConfig(
        new RequestParams({
          append: {
            id: id as string
          },
          data: value
        })
      )
      .subscribe(data => {
        message.success('配置更新成功')
        router.back()
      })
  }

  function getConfigDetail() {
    trainingService
      .getTrainingSaleConfig(
        new RequestParams({
          append: {
            id: id as string
          }
        })
      )
      .subscribe(data => {
        r.current?.setFormValue(data)
      })
  }

  return (
    <PageContainer>
      <MarketingConfig
        ref={r}
        onSubmit={onSubmit}
      ></MarketingConfig>
    </PageContainer>
  )
}

export default definePage(MarketingConfigPage, {
  title: '营销配置',
  layout: 'workspace',
  auth: true
})
