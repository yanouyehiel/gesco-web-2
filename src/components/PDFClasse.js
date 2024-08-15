import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { dateParser } from '../utils/functions'

function PDFClasse({ students, ecole, classe }) {
    return (
        <Document>
            {(students, ecole, classe) && <Page style={styles.body}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.text}>{ecole.nom}</Text>
                        <Text style={styles.text}>{ecole.localisation}</Text>
                        <Text style={styles.text}>{ecole.ville}</Text>
                        <Text style={styles.text}>{ecole.telephone}</Text>
                        <Text style={styles.text}>{ecole?.site_web}</Text>
                    </View>
                </View>
                <View style={styles.content}>
                    <Text style={{textAlign: 'center', textDecoration: 'underline'}}>Liste des élèves de {classe.nom}</Text>
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'row', borderBottom: '1px solid black', paddingVertical: 8 }}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Num</Text>
                            </View>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Matricule</Text>
                            </View>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Noms</Text>
                            </View>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Prénoms</Text>
                            </View>
                        </View>
                        {students.length > 0 && students.map((row, index) => (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    borderBottom: index < students.length - 1 ? '1px solid #ccc' : 'none',
                                    paddingVertical: 8
                                }}
                            >
                                <View style={{ width: '25%' }}>
                                    <Text style={styles.tableRowText}>{index+1}</Text>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <Text style={styles.tableRowText}>{row.matricule}</Text>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <Text style={styles.tableRowText}>{row.nom}</Text>
                                </View>
                                <View style={{ width: '25%' }}>
                                    <Text style={styles.tableRowText}>{row.prenom}</Text>
                                </View>
                            </View>
                        ))}
                        <View style={styles.footer}>
                            <Text style={styles.text}>Fait à {ecole.ville},</Text>
                            <Text style={styles.text}>Le {new Date().toLocaleDateString('fr-FR')}</Text>
                            <Text style={{marginTop: 20, fontSize: 12}}>Le Sécrétariat</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.pageNumber}
                render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages} pages`}
                fixed></Text>
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
    content: {
        marginTop: 30
    },
    tableHeader: {
        width: '25%', 
        fontWeight: 'bold'
    },
    tableHeaderText: {
        fontSize: 14,
        textAlign: 'center'
    },
    tableRowText: {
        fontSize: 12,
        textAlign: 'center'
    },
    footer: {
        marginTop: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    text: {
        fontSize: 12
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

export default PDFClasse