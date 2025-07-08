import { useEffect, useState } from 'react'

import { Box, Grid, Modal } from '@mui/material'

import { Button } from '../Button'

import { Container, DataTable, OrderSelection, Title } from './styles'

import { useTheme } from 'styled-components'

import { ActionButton } from './components/ActionButton'

import { DeleteData } from '../DeleteData'

export function Datagrid({
  tableName,
  fieldsArray,
  data,
  addNewData,
  editData,
  onRefresh,
}) {
  const [openAdd, setOpenAdd] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)

  const [selectedItem, setSelectedItem] = useState(null)

  const [sortField, setSortField] = useState('createdAt')
  const [sortDirection, setSortDirection] = useState('asc')
  const [sortedData, setSortedData] = useState([])

  const handleOpenAdd = () => setOpenAdd(true)
  const handleCloseAdd = () => setOpenAdd(false)

  const handleOpenDelete = (item) => {
    setSelectedItem(item)
    setOpenDelete(true)
  }
  const handleCloseDelete = () => {
    setSelectedItem(null)
    setOpenDelete(false)
  }

  const handleOpenEdit = (item) => {
    setSelectedItem(item)
    setOpenEdit(true)
  }
  const handleCloseEdit = () => {
    setSelectedItem(null)
    setOpenEdit(false)
  }

  const theme = useTheme()

  useEffect(() => {
    if (!sortField || !data?.length) return

    const sorted = [...data].sort((a, b) => {
      let valueA = a[sortField]
      let valueB = b[sortField]

      const aNum = parseFloat(valueA)
      const bNum = parseFloat(valueB)

      const aIsNum = !isNaN(aNum) && isFinite(aNum)
      const bIsNum = !isNaN(bNum) && isFinite(bNum)

      if (aIsNum && bIsNum) {
        return aNum - bNum
      }

      return String(valueA).localeCompare(String(valueB), 'pt-BR', {
        sensitivity: 'base',
      })
    })

    if (sortDirection === 'desc') {
      sorted.reverse()
    }

    setSortedData(sorted)
  }, [sortField, sortDirection, data])

  return (
    <>
      <Container>
        <Grid container rowSpacing={1} sx={{ marginInline: 2 }}>
          <Grid size={12}>
            <Title>{tableName}</Title>
          </Grid>

          <Grid
            size={12}
            sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}
          >
            <Box>
              <Button onClick={handleOpenAdd} />
            </Box>

            <Box>
              <OrderSelection
                value={`${sortField}-${sortDirection}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split('-')
                  setSortField(field)
                  setSortDirection(direction)
                }}
              >
                <option value="createdAt-asc">
                  Data de adição (crescente)
                </option>
                <option value="createdAt-desc">
                  Data de adição (decrescente)
                </option>

                {fieldsArray.map((field) => (
                  <>
                    <option key={`${field.id}-asc`} value={`${field.id}-asc`}>
                      {field.name} {''}
                      (crescente)
                    </option>
                    <option key={`${field.id}-desc`} value={`${field.id}-desc`}>
                      {field.name === 'CPFCNPJ' ? 'CPF/CNPJ' : field.name} {''}
                      (decrescente)
                    </option>
                  </>
                ))}
              </OrderSelection>
            </Box>
          </Grid>
        </Grid>

        <DataTable>
          <table>
            <thead>
              <tr>
                <th></th>
                {fieldsArray.map((field) => (
                  <th key={field.name}>{field.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <ActionButton
                        Icon={'Trash'}
                        onClick={() => handleOpenDelete(item)}
                      />
                      <ActionButton
                        Icon={'PencilSimple'}
                        onClick={() => handleOpenEdit(item)}
                      />
                    </div>
                  </td>

                  {fieldsArray.map((field) => (
                    <td key={field.id}>
                      {field.id === 'price' || field.id === 'value'
                        ? `R$ ${item[field.id]}`
                        : item[field.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </Container>

      <Modal
        open={openAdd}
        onClose={handleCloseAdd}
        style={{
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgb(0, 0, 0, 0.65)',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '8px',
            padding: '28px 28px 16px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            maxWidth: '838px',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme.white,
          }}
        >
          {addNewData(handleCloseAdd)}
        </Box>
      </Modal>

      <Modal
        open={openEdit}
        onClose={handleCloseEdit}
        style={{
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgb(0, 0, 0, 0.65)',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '8px',
            padding: '28px 28px 16px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            maxWidth: '838px',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme.white,
          }}
        >
          {editData(handleCloseEdit, selectedItem)}
        </Box>
      </Modal>

      <Modal
        open={openDelete}
        onClose={handleCloseDelete}
        style={{
          backdropFilter: 'blur(2px)',
          backgroundColor: 'rgb(0, 0, 0, 0.65)',
        }}
      >
        <Box
          sx={{
            fontFamily: 'Poppins, sans-serif',
            borderRadius: '8px',
            padding: '28px 28px 16px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            maxWidth: '708px',
            width: '100%',
            transform: 'translate(-50%, -50%)',
            bgcolor: theme.white,
          }}
        >
          <DeleteData
            item={selectedItem}
            table={tableName}
            onClose={() => {
              handleCloseDelete(), onRefresh()
            }}
            firstField={fieldsArray[0]?.id}
          />
        </Box>
      </Modal>
    </>
  )
}
