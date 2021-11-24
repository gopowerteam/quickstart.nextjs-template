import {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useState
} from 'react'

const StepItemContent1: ForwardRefRenderFunction<{}> = (
  props,
  ref
) => {
  const [value, updateValue] = useState(0)

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      return value > 3 && { value }
    }
  }))

  return (
    <section onClick={() => updateValue(value + 1)}>
      content: {value}
    </section>
  )
}

export default forwardRef<any>(StepItemContent1)
