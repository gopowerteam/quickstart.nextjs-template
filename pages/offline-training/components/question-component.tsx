import { Button, Card, Checkbox, List } from 'antd'
import { TrainingService } from '~/http/services/learn-service/training.service'
import { RequestParams } from '@gopowerteam/http-request'
import { useEffect, useState } from 'react'
import {
  ExpandAltOutlined,
  FullscreenOutlined,
  LikeOutlined,
  RedoOutlined,
  ShrinkOutlined
} from '@ant-design/icons'
import {
  FullScreen,
  useFullScreenHandle
} from 'react-full-screen'
import StackGrid from 'react-stack-grid'
import styles from './info.module.less'
import sizeMe from 'react-sizeme'
import { QuestionService } from '~/http/services/learn-service/question.service'

interface PropsType {
  id: string
}

const trainingService = new TrainingService()
const questionService = new QuestionService()

const QuestionsComponent: React.FC<PropsType> = props => {
  const handle = useFullScreenHandle()

  const [dataSource, setDataSource] = useState<any[]>([])
  const [full, setFull] = useState(false)

  useEffect(() => {
    getDataSource()
  }, [])

  function getDataSource() {
    trainingService
      .getAllQuestions(
        new RequestParams({
          append: {
            id: props.id
          }
        })
      )
      .subscribe(data => {
        setDataSource(data)
      })
  }

  function onCheckChange(id: string) {
    questionService
      .done(
        new RequestParams({
          append: {
            id: id
          }
        })
      )
      .subscribe(data => {
        getDataSource()
      })
  }

  return (
    <FullScreen handle={handle} onChange={setFull}>
      <Card
        title={'问题停车场'}
        extra={
          <div className={'flex flex-row'}>
            <Button
              type={'text'}
              onClick={() => getDataSource()}
            >
              <RedoOutlined />
            </Button>
            {full && (
              <Button
                type={'text'}
                onClick={() => {
                  setFull(false)
                  handle.exit()
                }}
              >
                <ShrinkOutlined />
              </Button>
            )}
            {!full && (
              <Button
                type={'text'}
                onClick={() => {
                  setFull(true)
                  handle.enter()
                }}
              >
                <ExpandAltOutlined />
              </Button>
            )}
          </div>
        }
      >
        <StackGrid columnWidth={'50%'} duration={0}>
          {dataSource.map(item => {
            return (
              <Card key={item.id}>
                <div
                  className={'flex flex-row items-center'}
                >
                  <Checkbox
                    onChange={e => {
                      if (e.target.checked) {
                        onCheckChange(item.id)
                      }
                    }}
                    className={'flex-none'}
                    disabled={item.status !== 'TODO'}
                  />
                  <div
                    className={styles['word-break-style']}
                  >
                    {item.description}
                  </div>
                  <div
                    className={
                      'flex flex-col flex-none items-center'
                    }
                  >
                    <div className={'text-2xl mb-3'}>
                      {item.stars}
                    </div>
                    <LikeOutlined
                      style={{
                        fontSize: '20px',
                        color: '#cc6600'
                      }}
                    />
                  </div>
                </div>
              </Card>
            )
          })}
        </StackGrid>
      </Card>
    </FullScreen>
  )
}

export default sizeMe()(QuestionsComponent)
