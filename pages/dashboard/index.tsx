import { NextPage } from 'next'
import { Button } from 'antd'
import { appQuery, appAction } from '~/store'
import definePage from '~/shared/common/define-page'
import { useStoreQuery } from '~/shared/common/use-store'
import { useCookies } from 'react-cookie'
import {
  createRef,
  useEffect,
  useRef,
  useState
} from 'react'
import FileUpload from '~/shared/components/file-upload'
import { useFileService } from '~/shared/services/file.service'
import useEditor from '~/shared/common/use-editor'

const DashBoardPage: NextPage = () => {
  const fileService = useFileService(
    service => service.public
  )

  const ready = useStoreQuery(
    appQuery,
    store => store.ready
  )

  const [a, u] = useState('1')

  // const editor = createRef()

  // const router = useRouter()
  function updateName() {
    // userAction.updateUserName(name + 'z')
  }

  const Editor = useEditor()

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

  const [editorContent, updateEditorContent] = useState('')

  useEffect(() => {
    setTimeout(() => {
      updateEditorContent('aksjdkljaskldjaksljdlk')
    }, 5000)
  }, [])

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
        <Editor
          value={editorContent}
          onSubmit={content => console.log(content)}
        ></Editor>
      </>
    )
  }
}

export default definePage(DashBoardPage, {
  layout: 'workspace',
  title: '仪表盘'
})
