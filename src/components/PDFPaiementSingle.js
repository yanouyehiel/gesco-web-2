import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React, { useEffect, useState } from 'react'
import { dateParser } from '../utils/functions'

function PDFPaiementSingle({ fees, ecole, tarifs, total, paye, reste }) {
    
    return (
        <Document>
            <Page size={'A4'} style={styles.body}>
                <View style={{marginBottom: 25}}>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.text}>{ecole.nom}</Text>
                            <Text style={styles.text}>{ecole.localisation}</Text>
                            <Text style={styles.text}>{ecole.ville}</Text>
                            <Text style={styles.text}>{ecole.telephone}</Text>
                            <Text style={styles.text}>{ecole.site_web}</Text>
                        </View>
                        <View>
                            <View style={styles.title}>
                                <Text style={[{textAlign: 'center'}, styles.text]}>Paiement frais de scolarité</Text>
                                <Text style={[{textAlign: 'center'}, styles.text]}>2024 - 2025</Text>
                            </View>
                            <Text style={styles.text}>{fees?.nom_student +' '+ fees?.prenom_student}</Text>
                            <Text style={styles.text}>FRAIS CONCERNES : Tous</Text>
                            <Text style={styles.text}>{ecole.ville}, le {new Date().toLocaleDateString('fr-FR')}</Text>
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
                        <View style={{marginTop: 20}}>
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
                        <View style={{marginTop: 20}}>
                            <Text style={{textAlign: 'center', fontSize: 13, textDecoration: 'underline', marginBottom: 15}}>Frais de pension</Text>
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
                            <Text style={[styles.text]}>Le Sécrétariat</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.header}>
                        <View>
                            <Text style={styles.text}>{ecole.nom}</Text>
                            <Text style={styles.text}>{ecole.localisation}</Text>
                            <Text style={styles.text}>{ecole.ville}</Text>
                            <Text style={styles.text}>{ecole.telephone}</Text>
                            <Text style={styles.text}>{ecole.site_web}</Text>
                        </View>
                        <View>
                            <View style={styles.title}>
                                <Text style={[{textAlign: 'center'}, styles.text]}>Paiement frais de scolarité</Text>
                                <Text style={[{textAlign: 'center'}, styles.text]}>2024 - 2025</Text>
                            </View>
                            <Text style={styles.text}>{fees?.nom_student +' '+ fees?.prenom_student}</Text>
                            <Text style={styles.text}>FRAIS CONCERNES : Tous</Text>
                            <Text style={styles.text}>{ecole.ville}, le {new Date().toLocaleDateString('fr-FR')}</Text>
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
                        <View style={{marginTop: 20}}>
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
                        <View style={{marginTop: 20}}>
                            <Text style={{textAlign: 'center', fontSize: 13, textDecoration: 'underline', marginBottom: 15}}>Frais de pension</Text>
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
                            <Text style={[styles.text]}>Le Sécrétariat</Text>
                        </View>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

const styles = StyleSheet.create({
    body: {
        paddingBottom: 25,
        paddingTop: 15,
        paddingHorizontal: 35
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    text: {
        fontSize: 12
    },
    title: {
        fontSize: 15,
        borderColor: 'black' ,
        borderWidth: 1,
        padding: 10,
        marginBottom: 10
    },
    content: {
        marginTop: 10
    },
    tableHeader: {
        width: '25%', 
        fontWeight: 'bold'
    },
    tableHeaderText: {
        fontSize: 11,
        textAlign: 'center'
    },
    tableRowText: {
        fontSize: 11,
        textAlign: 'center'
    },
    footer: {
        marginTop: 20,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    }
})

export default PDFPaiementSingle