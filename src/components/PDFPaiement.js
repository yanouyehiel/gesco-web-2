import { Document, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { dateParser } from '../utils/functions';

function PDFPaiement({ fees, student, ecole }) {
  return (
    <Document>
        {(ecole && fees && student) && <Page style={styles.body}>
            <View style={styles.header}>
                <View>
                    <Text>{ecole.nom}</Text>
                    <Text>{ecole.localisation}</Text>
                    <Text>{ecole.ville}</Text>
                    <Text>{ecole.telephone}</Text>
                    <Text>{ecole.site_web}</Text>
                </View>
                <View style={{marginTop: -30}}>
                    <Image 
                        src={ecole.logo}
                        style={{width: 100, height: 100}} 
                    />
                </View>
                <View>
                    <View style={styles.title}>
                        <Text style={{textAlign: 'center'}}>Paiement frais de scolarité</Text>
                        <Text style={{textAlign: 'center'}}>2024 - 2025</Text>
                    </View>
                    <Text>{student.nom +' '+ student.prenom}</Text>
                    <Text style={{marginTop: 10}}>FRAIS CONCERNES : Tous</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', borderBottom: '1px solid black', paddingVertical: 8 }}>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Code</Text>
                    </View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Intitulé</Text>
                    </View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Montant payé</Text>
                    </View>
                    <View style={styles.tableHeader}>
                        <Text style={styles.tableHeaderText}>Date du paiement</Text>
                    </View>
                </View>
                {fees.paiements.length > 0 && fees.paiements.map((row, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: 'row',
                            borderBottom: index < fees.paiements.length - 1 ? '1px solid #ccc' : 'none',
                            paddingVertical: 8
                        }}
                    >
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableRowText}>{row.code}</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableRowText}>{row.intitule}</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableRowText}>{row.montant}</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableRowText}>{dateParser(row.created_at)}</Text>
                        </View>
                    </View>
                ))}
                <View style={{marginTop: 30}}>
                    <View style={{ flexDirection: 'row', borderBottom: '1px solid black', paddingVertical: 8 }}>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.tableHeaderText}>Total pension</Text>
                        </View>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.tableHeaderText}>Somme payée</Text>
                        </View>
                        <View style={{ width: '33.33%' }}>
                            <Text style={styles.tableHeaderText}>Reste à payer</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottom: '1px solid #ccc',
                            paddingVertical: 8
                        }}
                    >
                        <View style={{ width: '33.33%' }}><Text style={styles.tableRowText}>{fees.total}</Text></View>
                        <View style={{ width: '33.33%' }}><Text style={styles.tableRowText}>{fees.paye}</Text></View>
                        <View style={{ width: '33.33%' }}><Text style={styles.tableRowText}>{fees.reste}</Text></View>
                    </View>
                </View>
                <View style={{marginTop: 50}}>
                    <Text style={{textAlign: 'center', fontSize: 18, textDecoration: 'underline', marginBottom: 15}}>Frais de pension</Text>
                    <View style={{ flexDirection: 'row', borderBottom: '1px solid black', paddingVertical: 8 }}>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableHeaderText}>Inscription</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableHeaderText}>Première tranche</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableHeaderText}>Deuxième tranche</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableHeaderText}>Troisième tranche</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottom: '1px solid #ccc',
                            paddingVertical: 8
                        }}
                    >
                        <View style={{ width: '25%' }}><Text style={styles.tableRowText}>{fees.tarifs.inscription}</Text></View>
                        <View style={{ width: '25%' }}><Text style={styles.tableRowText}>{fees.tarifs.premiere_tranche}</Text></View>
                        <View style={{ width: '25%' }}><Text style={styles.tableRowText}>{fees.tarifs.deuxieme_tranche}</Text></View>
                        <View style={{ width: '25%' }}><Text style={styles.tableRowText}>{fees.tarifs.troisieme_tranche}</Text></View>
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text>Fait à {ecole.ville},</Text>
                    <Text>Le {new Date().toLocaleDateString('fr-FR')}</Text>
                    <Text style={{marginTop: 20}}>Le Sécrétariat</Text>
                </View>
            </View>
            {/* <Text style={styles.pageNumber}
            render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages} pages`}
            fixed></Text> */}
        </Page>}
    </Document>
  )
}

const styles = StyleSheet.create({
    body: {
        paddingBottom: 65,
        paddingTop: 35,
        paddingHorizontal: 35
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 20,
        borderColor: 'black' ,
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    content: {
        marginTop: 30
    },
    tableHeader: {
        width: '25%', 
        fontWeight: 'bold'
    },
    tableHeaderText: {
        fontSize: 17,
        textAlign: 'center'
    },
    tableRowText: {
        fontSize: 15,
        textAlign: 'center'
    },
    footer: {
        marginTop: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "gray"
    }
})

export default PDFPaiement