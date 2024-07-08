import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { getTeachers } from '../../services/EnseignementController'
import { Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'

const columns = [
  {
    name: 'Num',
    selector: row => row.id,
    sortable: true
  },
  {
    name: 'Matricule',
    selector: row => row.matricule,
    sortable: true
  },
  {
    name: "Nom",
    selector: row => row.nom,
    sortable: true
  },
  {
    name: "Prénom",
    selector: row => row.prenom,
    sortable: true
  },
  {
    name: 'Téléphone',
    selector: row => row.telephone,
    sortable: true
  },
  {
    name: 'Email',
    selector: row => row.email,
    sortable: true
  }
]

function Enseignants() {
  const [loading, setLoading] = useState(true)
  const [teachers, setTeachers] = useState([])
  const [data, setData] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()

  useEffect(() => {
    getAllTeachers().then(() => setLoading(false))
  }, [])

  async function getAllTeachers() {
    await getTeachers(ecole_id, headers).then((res) => {
      setTeachers(res)
      setData(res)
    }, (error) => {
      toast.error(error.response.data.message)
    })
  }

  function handleFilter(event) {
    const newData = teachers.filter(row => {
      return row.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.prenom.toLowerCase().includes(event.target.value.toLowerCase())
      //row.matricule.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setData(newData)
  }


  return (
    <CCard className='mb-4'>
        <CCardHeader>Enseignants</CCardHeader>
        <CCardBody>
          <CTable>
            <Row>
              <Col xs={6}>
                <CInputGroup className="mb-3">
                  <CFormInput
                    placeholder="Rechercher"
                    aria-label="Rechercher"
                    aria-describedby="basic-addon1"
                    onChange={handleFilter}
                  />
                </CInputGroup>
              </Col>
            </Row>
            {loading ? <CSpinner color='primary' /> :
              <DataTable
                columns={columns}
                data={data}
                fixedHeader
                pagination
                selectableRowsHighlight
                highlightOnHover
              >
              </DataTable>
            }
          </CTable>
        </CCardBody>
    </CCard>
  )
}

export default Enseignants