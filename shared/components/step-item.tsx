interface StepItemProps {
  title?: string
  component: React.FC<any>
}

const StepItem: React.FC<StepItemProps> = props => {
  return <section>{props.children}</section>
}

export default StepItem
