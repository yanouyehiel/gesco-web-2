import { CCard, CCardBody, CCardHeader, CTable } from '@coreui/react'
import React from 'react'
import { ToastContainer } from 'react-toastify'

function Bulletins() {
    return (
        <CCard className="mb-4">
            <ToastContainer />
            <CCardHeader>La gestion des bulletins</CCardHeader>
            <CCardBody>
                <CTable>
                    
                </CTable>
            </CCardBody>
        </CCard>
    )
}

export default Bulletins