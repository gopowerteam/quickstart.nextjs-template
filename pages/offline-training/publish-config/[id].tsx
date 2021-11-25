import { TrainingService } from '~/http/services/learn-service/training.service'
import { NextPage } from 'next'
import PageContainer from '~/shared/components/page-container'
import definePage from '~/shared/common/define-page'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { RequestParams } from '@gopowerteam/http-request'
import { message } from 'antd'
import PublishConfig from '~/pages/offline-training/components/publish-config'

const trainingService = new TrainingService()

const PublishConfigPage: NextPage = () => {
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
      ...value
    }
    updateConfig(requestData)
  }

  function updateConfig(value: any) {
    trainingService
      .updateTrainingRelease(
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
      .getTrainingRelease(
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
      <PublishConfig
        ref={r}
        onSubmit={onSubmit}
      ></PublishConfig>
    </PageContainer>
  )
}

export default definePage(PublishConfigPage, {
  title: '发布配置',
  layout: 'workspace',
  auth: true
})
