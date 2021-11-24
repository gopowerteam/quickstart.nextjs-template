import {
  forwardRef,
  ForwardRefRenderFunction,
  useContext,
  useImperativeHandle,
  useState
} from 'react'
import StepContainer from '~/shared/components/step-container'

const StepItemContent1: ForwardRefRenderFunction<{}> = (
  props,
  ref
) => {
  const [value, updateValue] = useState(0)
  const context = useContext(StepContainer.Context)

  useImperativeHandle(ref, () => ({
    onSubmit: () => {
      return value > 3 && { value }
    }
  }))

  return (
    <section onClick={() => updateValue(value + 1)}>
      content: {value}
      <button onClick={() => console.log(context)}>
        12312
      </button>
    </section>
  )
}

export default forwardRef<any>(StepItemContent1)
