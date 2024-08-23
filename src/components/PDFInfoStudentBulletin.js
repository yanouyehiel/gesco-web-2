import { StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'

function PDFInfoStudentBulletin({ elt, data }) {
    return (
        <View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '30%'}]}>
                    <View>
                        <Text style={styles.miniTitle}>NOMS ET PRENOMS</Text>
                        <Text style={styles.englishText}>NAME AND SURNAME</Text>
                    </View>
                </View>
                <View style={[styles.cell, {width: '70%'}]}>
                    <Text style={styles.textValue}>{elt.student.nom+' '+elt.student.prenom}</Text>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '30%'}]}>
                    <View>
                        <Text style={styles.miniTitle}>DATE DE NAISSANCE</Text>
                        <Text style={styles.englishText}>DATE OF BIRTH</Text>
                    </View>
                    <Text style={styles.textValue}>{elt.student.date_naissance}</Text>
                </View>
                <View style={[styles.cell, {width: '30%'}]}>
                    <View>
                        <Text style={styles.miniTitle}>LIEU DE NAISSANCE</Text>
                        <Text style={styles.englishText}>PLACE OF BIRTH</Text>
                    </View>
                    <Text style={styles.textValue}>{elt.student.lieu_naissance}</Text>
                </View>
                <View style={[styles.cell, {width: '20%'}]}>
                    <View>
                        <Text style={styles.miniTitle}>PROF. PRINCIPAL</Text>
                        <Text style={styles.englishText}>CLASS MASTER</Text>
                    </View>
                </View>
                <View style={[styles.cell, {width: '20%'}]}>
                    <Text style={styles.textValue}>{data.class_mater}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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

export default PDFInfoStudentBulletin