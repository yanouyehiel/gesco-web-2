import { CButton, CCard, CCardBody, CCardHeader, CCol, CFormSelect, CRow, CSpinner, CTable } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { getEcoleStore, getEcoleStored, getHeaders } from '../../services/LocalStorage'
import { generateBulletinClasse, getClasses, getSequences } from '../../services/MainControllerApi'
import { pdf, PDFDownloadLink } from '@react-pdf/renderer'
import PDFBulletin from '../../components/PDFBulletin'
import JSZip from 'jszip'
import { saveAs } from 'file-saver';

function Bulletins() {
    const ecole_id = getEcoleStored()
    const headers = getHeaders()
    const [loading, setLoading] = useState(false)
    const [classes, setClasses] = useState([])
    const [sequences, setSequences] = useState([])
    const [bulletin, setBulletin] = useState({
        classe_id: 0,
        annee_scolaire: "",
        sequence_id: 0
    })
    const [data, setData] = useState(null)
    const ecole = getEcoleStore()
    const [bulletinGenerated, setBulletinGenerated] = useState(false)

    useEffect(() => {
        getClasses(ecole_id, headers).then((res) => setClasses(res))
        getSequences(ecole_id, headers).then((res) => setSequences(res))
    }, [])

    async function generateBulletin() {
        setLoading(true)
        if (bulletin.annee_scolaire == "" || bulletin.classe_id == 0 || bulletin.classe_id == 0) {
            toast.error("Veuillez remplir tous les champs")
        } else {
            await generateBulletinClasse(bulletin, headers).then((res) => {
                /*const zip = new JSZip()
                res.notes.map(async (elt) => {
                    const blob = await pdf(<PDFBulletin data={data} ecole={ecole} student={elt.student} notes={elt.notes} />).toBlob();
                    zip.file(`Bulletin_${elt.student.nom+'_'+elt.student.prenom}.pdf`, blob, { base64: true });
                })*/
                setData(res)
                setBulletinGenerated(true)

                /*zip.generateAsync({ type: 'blob' }).then((content) => {
                    saveAs(content, 'bulletins.zip');
                });*/
            }, (error) => {
                toast.error(error.response.data.message)
            })
        }
        setLoading(false)
    }

    return (
        <CCard className="mb-4">
            <ToastContainer />
            <CCardHeader>La gestion des bulletins</CCardHeader>
            <CCardBody>
                <CRow>
                    <CCol xl={3}>
                        <CFormSelect 
                            onChange={(e) => setBulletin({...bulletin, [e.target.name]: parseInt(e.target.value)})}
                            name='classe_id'
                            value={bulletin.classe_id}
                        >
                            <option>Selectionner la classe</option>
                            {classes.map((classe, i) => (
                                <option key={i} value={classe.id}>{classe.nom}</option>
                            ))}
                        </CFormSelect>
                    </CCol>
                    <CCol xl={3}>
                        <CFormSelect 
                            onChange={(e) => setBulletin({...bulletin, [e.target.name]: parseInt(e.target.value)})}
                            name='sequence_id'
                            value={bulletin.sequence_id}
                        >
                            <option>Selectionner une sequence</option>
                            {sequences.map((seq, i) => (
                                <option key={i} value={seq.id}>{seq.intitule}</option>
                            ))}
                        </CFormSelect>
                    </CCol>
                    <CCol xl={3}>
                        <CFormSelect 
                            onChange={(e) => setBulletin({...bulletin, [e.target.name]: e.target.value})}
                            name='annee_scolaire'
                            value={bulletin.annee_scolaire}
                        >
                            <option>Selectionner l'année scolaire</option>
                            <option value={"2024-2025"}>2024-2025</option>
                        </CFormSelect>
                    </CCol>
                    <CCol xl={3}>
                        {bulletinGenerated ? <PDFDownloadLink
                            fileName='Bulletin'
                            document={<PDFBulletin data={data} ecole={ecole} notes={data.notes} />}
                            //onClick={generateBulletin}
                            disabled={loading}
                        >
                            {
                                ({loading}) => (loading ? <CSpinner color='primary' /> :
                                <CButton className='text-white btn-primary'>Télécharger le bulletin</CButton>)
                            }
                        </PDFDownloadLink> :
                        <CButton className='text-white btn-primary' disabled={loading} onClick={generateBulletin}>
                            <CRow>
                            {loading && <CCol xs={3}><CSpinner color='white' /></CCol>}
                            <CCol xs={loading ? 9 : 12}>Générer le bulletin</CCol>
                            </CRow>
                        </CButton>}
                    </CCol>
                </CRow>
                <CRow>
                    <CTable>
                    
                    </CTable>
                </CRow>
            </CCardBody>
        </CCard>
    )
}

export default Bulletins