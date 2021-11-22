import React from 'react'
import { Table, Pagination } from 'antd'
import { TableRowSelection } from 'antd/lib/table/interface'
import { PageService } from '~/bootstrap/http/page.service'

interface DataTableProp {
  rowKey: string
  dataSource: any[]
  pageService?: PageService
  rowSelection?: TableRowSelection<Record<string, any>>
  height?: string
  actions?: React.ReactNode
  actionPosition?: 'top' | 'bottom'
}

// 设置默认值
const defaultValue = {
  height: 100,
  actionPosition: 'bottom'
} as const

const DataTable: React.FC<DataTableProp> = props => {
  const actionPosition =
    props.actionPosition || defaultValue.actionPosition

  function renderActionContainer() {
    return <div className="py-5">{props.actions}</div>
  }

  function renderTableContainer() {
    const { dataSource, rowSelection, height, rowKey } =
      props

    return (
      <div>
        <Table
          rowKey={rowKey}
          scroll={{
            x: true
          }}
          rowSelection={rowSelection}
          dataSource={dataSource}
          pagination={false}
          size="small"
          bordered
        >
          {props.children}
        </Table>
      </div>
    )
  }

  function renderPaginationContainer() {
    const { dataSource } = props
    return (
      <div className="py-10">
        <Pagination
          showSizeChanger
          onShowSizeChange={size => onShowSizeChange(size)}
          defaultCurrent={1}
          total={dataSource.length}
        />
      </div>
    )
  }

  function onShowSizeChange(size: number) {
    console.log(size)
  }

  return (
    <section>
      {actionPosition === 'top' && renderActionContainer()}
      {renderTableContainer()}
      {renderPaginationContainer()}
      {actionPosition === 'bottom' &&
        renderActionContainer()}
    </section>
  )
}

export default DataTable
