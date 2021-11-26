import { ChangeEventHandler } from 'react'

interface FileUploadProps {
  multiple?: false
  accept?: '*'
  onUpload: (files: FileList) => void
}

const FileUpload: React.FC<FileUploadProps> = props => {
  const onFileChange: ChangeEventHandler<HTMLInputElement> =
    event => {
      // 获取上传组件
      const target = event.target as HTMLInputElement
      // 获取上传文件对象
      const files = target.files as FileList
      // 发送上传事件
      props.onUpload(files)
      // 重置上传组件
      target.value = ''
    }

  return (
    <div className="inline-block relative cursor-pointer">
      <div className="absolute inset-0 z-10 ">
        <input
          type="file"
          className="h-full w-full opacity-0"
          accept={props.accept}
          multiple={props.multiple}
          onChange={onFileChange}
        ></input>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default FileUpload
