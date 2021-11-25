import { Button } from 'antd'
import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { TrainingService } from '~/http/services/learn-service/training.service'
import definePage from '~/shared/common/define-page'
import PageContainer from '~/shared/components/page-container'
import StepContainer from '~/shared/components/step-container'
import StepItem from '~/shared/components/step-item'
import StepItemContent1 from './components/step-item-1'
import StepItemContent2 from './components/step-item-2'

const trainingService = new TrainingService()

const OfflineTrainingPage: NextPage = () => {
  function getTrainData() {
    trainingService.getTrainings().subscribe(data => {
      console.log(data)
    })
  }

  useEffect(() => {
    getTrainData()
  }, [])

  function renderActions() {
    return (
      <>
        <Button type="primary">提交</Button>
        <Button>取消</Button>
      </>
    )
  }

  return (
    <PageContainer
      description="123123"
      actions={renderActions()}
    >
      <StepContainer
        onSubmit={(a: any) => console.log('ok', a)}
      >
        <StepItem
          key="aa"
          title="111"
          component={StepItemContent1}
        ></StepItem>
        <StepItem
          key="b"
          title="222"
          component={StepItemContent2}
        ></StepItem>
      </StepContainer>
    </PageContainer>
  )
}

export default definePage(OfflineTrainingPage, {
  title: '线下培训',
  layout: 'workspace',
  auth: true
})
