import { NextPage } from 'next'
import { useEffect, useRef, useState } from 'react'
import { TrainingService } from '~/http/services/learn-service/training.service'
import definePage from '~/shared/common/define-page'
import PageContainer from '~/shared/components/page-container'
import BasicInfo from '~/pages/offline-training/components/basic-info'
import { RequestParams } from '@gopowerteam/http-request'
import { useRouter } from 'next/router'
import { Button, message, Modal } from 'antd'
const trainingService = new TrainingService()

const OfflineTrainingPage: NextPage = () => {
  const router = useRouter()
  const [isModalVisible, setIsModalVisible] =
    useState(false)
  const isEdit = router.query.id !== '-1'
  useEffect(() => {
    if (isEdit) {
      getDetail(router.query.id as string)
    }
  }, [])

  /**
   * 获取详情
   * @param id
   */
  function getDetail(id: string) {
    trainingService
      .getTrainingDetail(
        new RequestParams({
          append: {
            id: id
          }
        })
      )
      .subscribe(data => {
        r.current?.setFormValue(data)
      })
  }

  /**
   * 完成
   * @param value
   */
  const onSubmit = (value: any) => {
    isEdit ? edit(value) : create(value)
  }

  const create = (value: any) => {
    trainingService
      .createTraining(
        new RequestParams({
          data: value
        })
      )
      .subscribe(data => {
        setIsModalVisible(true)
      })
  }

  const edit = (value: any) => {
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
        router.back()
      })
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const r = useRef<any>()

  return (
    <PageContainer>
      <BasicInfo
        ref={r}
        onSubmit={onSubmit}
      ></BasicInfo>
      <Modal
        title="提示"
        visible={isModalVisible}
        okText={<Button type={'link'}>去配置</Button>}
        cancelText={<Button type={'link'}>取消</Button>}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>活动创建成功,是否去配置活动信息?</p>
      </Modal>
    </PageContainer>
  )
}

export default definePage(OfflineTrainingPage, {
  title: '线下培训',
  layout: 'workspace',
  auth: true
})
