import { Document, Image, Page, StyleSheet, View, Text } from '@react-pdf/renderer'
import React from 'react'

function PDFBulletin({ data, student }) {
    return (
        <Document>
            <Page size='A3'>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>{ecole.nom}</Text>
                        <Text style={styles.title}>{ecole.ville}</Text>
                        <Text style={styles.title}>{ecole.telephone}</Text>
                        <Text style={styles.title}>{ecole.site_web}</Text>
                    </View>
                    <View>
                        <Image source={{uri: 'https://fr.freepik.com/photos-gratuite/chien-visage-brun-visage-blanc-se-tient-dans-champ_40648523.htm#query=chien&position=0&from_view=keyword&track=ais_hybrid&uuid=e1981c71-c067-461b-b8d4-d994dada3728'}} style={{width: 200, height: 200}} />
                    </View>
                    <View>
                        <Text style={styles.title}>REPUBLIQUE DU CAMEROUN</Text>
                        <Text style={styles.title}>PAIX-TRAVAIL-PATRIE</Text>
                    </View>
                </View>

                <View style={styles.headerSub}>
                    <Text>BULLETIN DE NOTES {data.trimestre.intitule} / {data.annee_scolaire}</Text>
                    <View style={styles.table}>
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.miniTitle}>Année scolaire</Text>
                                <Text>{data.annee_scolaire}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.miniTitle}>Classe</Text>
                                <Text>{data.classe.nom}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.miniTitle}>Matricule</Text>
                                <Text>{student.matricule}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.miniTitle}>Sexe</Text>
                                <Text>{student.sexe}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.cell}>
                                <Text style={styles.miniTitle}>Bulletin</Text>
                                <Text>{data.sequence.intitule}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.miniTitle}>Effectif</Text>
                                <Text>{data.total_students_classe}</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.miniTitle}>Situation</Text>
                                <Text>Régulier</Text>
                            </View>
                            <View style={styles.cell}>
                                <Text style={styles.miniTitle}>Redoublant</Text>
                                <Text>Non</Text>
                            </View>
                        </View>
                    </View>
                </View>

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
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 14,
        textTransform: 'capitalize'
    },
    miniTitle: {
        fontSize: 12,
        textTransform: 'capitalize'
    },
    text: {
        fontSize: 11
    },
    headerSub: {

    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10
    },
    row: {
        display: 'table-row',
    },
    cell: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        padding: 5,
        textAlign: 'center',
        width: '25%',
    },
})

export default PDFBulletin