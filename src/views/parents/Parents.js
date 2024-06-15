import { CCard, CCardBody, CCardHeader, CFormInput, CInputGroup, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { getAllParentsSchool } from '../../services/MainControllerApi'
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
  },
  {
    name: 'Nom enfant',
    selector: row => row.nom_student,
    sortable: true
  },
  {
    name: 'Prénom enfant',
    selector: row => row.prenom_student,
    sortable: true
  },
  {
    name: 'Nom de la classe',
    selector: row => row.nom_classe,
    sortable: true
  }
]

function Parents() {
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false)
  const [parents, setParents] = useState([])
  //const [students, setStudents] = useState([])
  const ecole_id = getEcoleStored()
  const headers = getHeaders()
  const [parent, setParent] = useState({})

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
      getParents().then(() => setLoading(false))
  }, [])

  const handleChange = ({currentTarget}) => {
      const {name, value} = currentTarget;
      setParent({...parent, [name]: value})
  }

  async function getParents() {
    await getAllParentsSchool(ecole_id, headers).then((res) => {
        setParents(res)
    })
  }

  function handleFilter(event) {
    const newData = parents.filter(row => {
      return row.nom.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.prenom.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.nom_student.toLowerCase().includes(event.target.value.toLowerCase()) ||
      row.prenom_student.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setParents(newData)
  }

  return (
    <CCard className='mb-4'>
        <CCardHeader>Parents</CCardHeader>
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
                data={parents}
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

export default Parents