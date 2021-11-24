import { createContext, useRef, useState } from 'react'
import { Steps, Button } from 'antd'
import React from 'react'

interface StepContainerProps {
  title?: string
  onSubmit?: Function
}

const Context = createContext({})

const StepContainer: React.FC<StepContainerProps> & {
  Context: typeof Context
} = props => {
  const content = useRef()
  const [dataSource, updateDataSource] = useState({})
  const [currentStep, updateCurrentStep] = useState(0)

  function renderStepContainer() {
    return (
      <section>
        <Steps
          type="navigation"
          className="site-navigation-steps"
          current={currentStep}
        >
          {getStepItems()}
        </Steps>
      </section>
    )
  }

  function renderContentContainer() {
    // 内容节点
    const Content = getCurrentStepContent()

    const component = React.createElement(Content, {
      ref: content
    })

    return <section>{component}</section>
  }

  function renderActionContainer() {
    const isFirstStep = currentStep === 0
    const isLastStep =
      currentStep ===
      React.Children.count(props.children) - 1

    return (
      <section className="flex justify-end space-x-5">
        {!isFirstStep && (
          <Button
            type="primary"
            onClick={() => onPreStep()}
          >
            上一步
          </Button>
        )}
        {!isLastStep && (
          <Button
            type="primary"
            onClick={() => onNextStep()}
          >
            下一步
          </Button>
        )}
        {isLastStep && (
          <Button
            type="primary"
            onClick={() => onNextStep(true)}
          >
            提交
          </Button>
        )}
      </section>
    )
  }

  async function onPreStep() {
    updateCurrentStep(currentStep - 1)
  }

  async function onNextStep(finish?: boolean) {
    if (!content.current) {
      return
    }

    const { onSubmit } = content.current as any
    const result = await onSubmit()

    if (!result) {
      return
    }

    let dataSourceValue = dataSource

    if (result && typeof result !== 'boolean') {
      dataSourceValue = {
        ...dataSource,
        [(props.children as any)[currentStep].key ||
        currentStep]: result
      }

      updateDataSource(dataSourceValue)
    }

    if (finish) {
      const { onSubmit } = props
      onSubmit && onSubmit(dataSourceValue)
    } else {
      updateCurrentStep(currentStep + 1)
    }
  }

  function getStepItems() {
    return React.Children.map(
      props.children,
      (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <Steps.Step
              title={child.props.title}
              key={index}
            ></Steps.Step>
          )
        }
        return child
      }
    )
  }

  function getCurrentStepContent() {
    // 内容节点
    let content: any

    React.Children.forEach(
      props.children,
      (child, index) => {
        if (
          React.isValidElement(child) &&
          index === currentStep &&
          !content
        ) {
          content = child.props.component
        }
      }
    )
    return content
  }

  return (
    <section>
      {renderStepContainer()}
      <Context.Provider value={dataSource}>
        {renderContentContainer()}
      </Context.Provider>
      {renderActionContainer()}
    </section>
  )
}

StepContainer.Context = Context

export default StepContainer
