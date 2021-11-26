import { NextPage } from 'next'
import { Button } from 'antd'
import { appQuery, appAction } from '~/store'
import definePage from '~/shared/common/define-page'
import { useStoreQuery } from '~/shared/common/use-store'
import { useCookies } from 'react-cookie'
import { useState } from 'react'
import FileUpload from '~/shared/components/file-upload'
import { useFileService } from '~/shared/services/file.service'

const DashBoardPage: NextPage = () => {
  const fileService = useFileService(
    service => service.public
  )

  const ready = useStoreQuery(
    appQuery,
    store => store.ready
  )

  const [a, u] = useState('1')

  // const router = useRouter()
  function updateName() {
    // userAction.updateUserName(name + 'z')
  }

  function updateReady() {
    appAction.updateReady()
  }

  function toAbout(files: FileList) {
    console.log(files.item(0))
    // router.push('about')
  }

  function onUploadFile(files: FileList) {
    fileService.upload(files).subscribe(data => {
      console.log(data)
    })
    console.log(files.item(0))
  }

  if (!ready) {
    return (
      <>
        <div className="text-red-500">1231</div>

        <Button
          className="m-20"
          onClick={() => updateName()}
        >
          not Ready
        </Button>

        <div>xxx</div>
      </>
    )
  } else {
    return (
      <>
        <FileUpload onUpload={onUploadFile}>
          <Button onClick={() => u(a + '1')}>
            Dashboard {a}
          </Button>
        </FileUpload>
      </>
    )
  }
}

export default definePage(DashBoardPage, {
  layout: 'workspace',
  title: '仪表盘'
})
