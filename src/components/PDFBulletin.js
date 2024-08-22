import { Document, Image, Page, StyleSheet, View, Text } from '@react-pdf/renderer'
import React from 'react'
import logo from "../assets/images/logo_bleu_sans_bg.png"
import JSZip from 'jszip';

function PDFBulletin({ data, student, ecole, notes }) {

    return (
        <Document>
            <Page size='A3' style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{ecole.nom}</Text>
                        <Text style={styles.title}>{ecole.ville}</Text>
                        <Text style={styles.title}>{ecole.telephone}</Text>
                        <Text style={styles.title}>{ecole.site_web}</Text>
                    </View>
                    <View style={{width: 150, height: 150, marginTop: -40}}>
                        <Image src={logo} style={{width: 150, height: 150}} />
                    </View>
                    <View>
                        <Text style={styles.title}>REPUBLIQUE DU {ecole.pays.toUpperCase()}</Text>
                        <Text style={styles.title}>PAIX-TRAVAIL-PATRIE</Text>
                    </View>
                </View>

                <View style={styles.headerSub}>
                    <Text style={{textAlign: 'center'}}>BULLETIN DE NOTES {data?.trimestre.intitule} / {data?.annee_scolaire}</Text>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <View style={[styles.cell, {width: '30%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}>ANNEE SCOLAIRE</Text>
                                    <Text style={styles.englishText}>ACADEMIC YEAR</Text>
                                </View>
                                <Text style={styles.textValue}>{data?.annee_scolaire}</Text>
                            </View>
                            <View style={[styles.cell, {width: '20%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}>Classe</Text>
                                    <Text style={styles.englishText}>Class</Text>
                                </View>
                                <Text style={styles.textValue}>{data?.classe.nom}</Text>
                            </View>
                            <View style={[styles.cell, {width: '25%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}>Matricule</Text>
                                    <Text style={styles.englishText}>ADM No</Text>
                                </View>
                                <Text style={styles.textValue}>{student?.matricule}</Text>
                            </View>
                            <View style={[styles.cell, {width: '25%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}>Sexe</Text>
                                    <Text style={styles.englishText}>Sex</Text>
                                </View>
                                <Text style={styles.textValue}>{student?.sexe}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={[styles.cell, {width: '30%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}>Bulletin</Text>
                                    <Text style={styles.englishText}>Report card</Text>
                                </View>
                                <Text style={styles.textValue}>{data?.sequence.intitule}</Text>
                            </View>
                            <View style={[styles.cell, {width: '20%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}>Effectif</Text>
                                    <Text style={styles.englishText}>No ON ROLL</Text>
                                </View>
                                <Text style={styles.textValue}>{data?.total_students_classe}</Text>
                            </View>
                            <View style={[styles.cell, {width: '25%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}>Situation</Text>
                                    <Text style={styles.englishText}>Situation</Text>
                                </View>
                                <Text style={styles.textValue}>Régulier</Text>
                            </View>
                            <View style={[styles.cell, {width: '25%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}>Redoublant</Text>
                                    <Text style={styles.englishText}>Repeat</Text>
                                </View>
                                <Text style={styles.textValue}>Non</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* <View>
                    {notes.map((item, i) => (
                        <View key={i}>
                            <Text>{item.note}</Text>
                            <Text>{item.nom_matiere}</Text>
                        </View>
                    ))}
                </View> */}

                {/* <Text style={styles.pageNumber}
                render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages} pages`}
                fixed></Text> */}
            </Page>
        </Document> 
    )
}

const styles = StyleSheet.create({
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "gray"
    },
    page: {
        margin: 40
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 14,
        textTransform: 'capitalize'
    },
    miniTitle: {
        fontSize: 12,
        textTransform: 'capitalize'
    },
    englishText: {
        fontSize: 12,
        textTransform: 'capitalize',
        color: 'blue'
    },
    textValue: {
        fontSize: 12,
        textTransform: 'capitalize',
        fontWeight: 'bold'
    },
    text: {
        fontSize: 11
    },
    headerSub: {
        
    },
    table: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 600,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        margin: '0 auto'
    },
    row: {
        display: 'flex',
        flexDirection: 'row'
    },
    cell: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
})

export default PDFBulletin