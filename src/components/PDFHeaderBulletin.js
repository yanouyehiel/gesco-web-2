import { Image, StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import logo from "../assets/images/logo_bleu_sans_bg.png"

function PDFHeaderBulletin({ data, ecole, elt }) {
    return (
        <View>
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>{ecole.nom}</Text>
                    <Text style={styles.title}>{ecole.ville}</Text>
                    <Text style={styles.title}>{ecole.telephone}</Text>
                    <Text style={styles.title}>{ecole.site_web}</Text>
                </View>
                <View>
                    <Image src={logo} style={{width: 150, height: 150}} />
                </View>
                <View>
                    <Text style={styles.title}>REPUBLIQUE DU {ecole.pays.toUpperCase()}</Text>
                    <Text style={styles.title}>PAIX-TRAVAIL-PATRIE</Text>
                </View>
            </View>

            <View style={styles.headerSub}>
                <Text style={{textAlign: 'center'}}>BULLETIN DE NOTES {data?.trimestre} / {data?.annee_scolaire}</Text>
                <View style={{borderWidth: 1, borderColor: 'black', padding: 5, width: '50%', marginTop: 10}}>
                    <Text style={{textAlign: 'center'}}>BULLETIN DE NOTES / REPORT CARD</Text>
                </View>
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
                            <Text style={styles.textValue}>{elt.student?.matricule}</Text>
                        </View>
                        <View style={[styles.cell, {width: '25%'}]}>
                            <View>
                                <Text style={styles.miniTitle}>Sexe</Text>
                                <Text style={styles.englishText}>Sex</Text>
                            </View>
                            <Text style={styles.textValue}>{elt.student?.sexe}</Text>
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
        </View>
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
        fontWeight: 'bold',
        justifyContent: 'center'
    },
    text: {
        fontSize: 11,
        textAlign: 'center'
    },
    headerSub: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    table: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 600,
        borderStyle: 'solid',
        borderWidth: 0.5,
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
        borderWidth: 0.5,
        borderColor: 'black',
        padding: 5,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    noBorderCell: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 10,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})

export default PDFHeaderBulletin