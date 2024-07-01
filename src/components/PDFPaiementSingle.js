import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import { dateParser } from '../utils/functions'

function PDFPaiementSingle({ fees, ecole, tarifs, total, paye, reste }) {
    
    return (
        <Document>
            <Page style={styles.body}>
                <View style={styles.header}>
                    <View>
                        <Text>{ecole.nom}</Text>
                        <Text>{ecole.localisation}</Text>
                        <Text>{ecole.ville}</Text>
                        <Text>{ecole.telephone}</Text>
                        <Text>{ecole.site_web}</Text>
                    </View>
                    <View>
                        <View style={styles.title}>
                            <Text style={{textAlign: 'center'}}>Paiement frais de scolarité</Text>
                            <Text style={{textAlign: 'center'}}>2024 - 2025</Text>
                        </View>
                        <Text>{fees?.nom_student +' '+ fees?.prenom_student}</Text>
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
                    <View
                        style={{
                            flexDirection: 'row',
                            borderBottom: '1px solid #ccc',
                            paddingVertical: 8
                        }}
                    >
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableRowText}>{fees?.code}</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableRowText}>{fees?.intitule}</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableRowText}>{fees?.montant}</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <Text style={styles.tableRowText}>{dateParser(fees?.created_at)}</Text>
                        </View>
                    </View>
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
                            <View style={{ width: '33.33%' }}><Text style={styles.tableRowText}>{total}</Text></View>
                            <View style={{ width: '33.33%' }}><Text style={styles.tableRowText}>{paye}</Text></View>
                            <View style={{ width: '33.33%' }}><Text style={styles.tableRowText}>{reste}</Text></View>
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
                            <View style={{ width: '25%' }}><Text style={styles.tableRowText}>{tarifs?.inscription}</Text></View>
                            <View style={{ width: '25%' }}><Text style={styles.tableRowText}>{tarifs?.premiere_tranche}</Text></View>
                            <View style={{ width: '25%' }}><Text style={styles.tableRowText}>{tarifs?.deuxieme_tranche}</Text></View>
                            <View style={{ width: '25%' }}><Text style={styles.tableRowText}>{tarifs?.troisieme_tranche}</Text></View>
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <Text>Fait à {ecole.ville},</Text>
                        <Text>Le {new Date().toLocaleDateString('fr-FR')}</Text>
                        <Text style={{marginTop: 20}}>Le Sécrétariat</Text>
                    </View>
                </View>
            </Page>
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
    }
})

export default PDFPaiementSingle