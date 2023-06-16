import LinearProgress from '@material-ui/core/LinearProgress'
import { ImportExport, VerticalAlignBottom, VerticalAlignTop } from '@material-ui/icons'
import Pagination from '@material-ui/lab/Pagination'
import PropTypes from 'prop-types'
import { useMemo, useState } from 'react'
import { usePagination, useSortBy, useTable } from 'react-table'
import { CardTitle } from 'reactstrap'
import { Search } from './search.component'

export const Table = ({ title, columns, data, sorted, search, isLoading, pagination, getData, backupText, borderless }) => {
  const tableColumns = useMemo(() => columns, [columns])
  const tableData = useMemo(() => data, [data])
  const [page, setPage] = useState(pagination ? 1 : 0)

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    gotoPage,
    rows,
    page: currentPage,
    prepareRow
  } = useTable(
    pagination
      ? { columns: tableColumns, data: tableData, initialState: { pageSize: pagination.pageSize } }
      : { columns: tableColumns, data: tableData },
    useSortBy,
    usePagination
  )

  const onPageChange = (_, value) => {
    setPage(value)
    pagination.async ? getData(null, value) : gotoPage(value - 1)
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <CardTitle className='mb-4'>{title}</CardTitle>
        {search && <Search onSearch={getData} isLoading={isLoading} />}
      </div>
      {isLoading && <LinearProgress />}
      <table className={`table ${borderless ? '' : 'table-bordered'} table-centered mb-0`} {...getTableProps()}>
        <thead className={`thead-light ${borderless && 'text-center'}`}>
          {headerGroups.map((group) => (
            <tr {...group.getHeaderGroupProps()}>
              {group.headers.map((column) => (
                <th className='text-white' {...column.getHeaderProps(sorted ? column.getSortByToggleProps() : undefined)}>
                  {column.render('Header')}
                  {sorted && (
                    <span>
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <VerticalAlignBottom fontSize='small' />
                        ) : (
                          <VerticalAlignTop fontSize='small' />
                        )
                      ) : (
                        <ImportExport fontSize='small' />
                      )}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length < 1 ? (
            <tr>
              <td colSpan='100%' className={`text-center ${borderless ? 'border-bottom border-secondary' : ''}`}>
                {backupText}
              </td>
            </tr>
          ) : pagination ? (
            currentPage.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className='pt-2'>
                  {row.cells.map((cell) => (
                    <td className={borderless ? 'border-bottom border-secondary' : ''} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              )
            })
          ) : (
            rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} className='pt-2'>
                  {row.cells.map((cell) => (
                    <td className={borderless ? 'border-bottom border-secondary' : ''} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              )
            })
          )}
        </tbody>
      </table>
      {isLoading && <LinearProgress />}
      {pagination && (
        <div className='text-white flex justify-end items-center my-2'>
          <Pagination
            count={data.length < pagination.pageSize ? 1 : pagination.async ? 10 : Math.ceil(+data.length / +pagination.pageSize)}
            page={page}
            color='primary'
            onChange={onPageChange}
          />
        </div>
      )}
    </>
  )
}

Table.propTypes = {
  title: PropTypes.string.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  sorted: PropTypes.bool,
  search: PropTypes.bool,
  pagination: PropTypes.object,
  getData: PropTypes.func
}
