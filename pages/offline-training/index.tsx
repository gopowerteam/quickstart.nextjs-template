import { NextPage } from 'next'
import { useEffect } from 'react'
import { TrainingService } from '~/http/services/learn-service/training.service'
import definePage from '~/shared/common/define-page'
import PageContainer from '~/shared/components/page-container'

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

  return <PageContainer></PageContainer>
}

export default definePage(OfflineTrainingPage, {
  title: '线下培训',
  layout: 'workspace',
  auth: true
})
