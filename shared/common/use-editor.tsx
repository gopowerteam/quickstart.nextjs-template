import type {
  BraftEditorProps,
  EditorState
} from 'braft-editor'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

interface EditorProps {
  value?: string
  onSubmit?: (content: string) => void
  onChange?: (content: string) => void
}

const importEditor = () => import('braft-editor')
const BraftEditor = dynamic(importEditor, {
  ssr: false
})

const useEditor = () => {
  const Editor: React.FC<EditorProps> = props => {
    const [editorContent, updateEditorContent] =
      useState<EditorState>()

    useEffect(() => {
      importEditor().then(module =>
        updateEditorContent(
          module.default.createEditorState(props.value)
        )
      )
    }, [props.value])

    return (
      <BraftEditor
        value={editorContent}
        onChange={editorState => {
          updateEditorContent(editorState)
          props.onChange &&
            props.onChange(editorState.toHTML() || '')
        }}
        onSave={() =>
          props.onSubmit &&
          props?.onSubmit(editorContent?.toHTML() || '')
        }
      ></BraftEditor>
    )
  }

  return Editor
}

export default useEditor
