import { StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'

function PDFHeaderMatiereBulletin({ data }) {
    return (
        <View style={styles.row}>
            <View style={[styles.cell, {width: '30%'}]}>
                <View>
                    <Text style={styles.miniTitle}>MATIERE</Text>
                    <Text style={styles.englishText}>SUBJECT</Text>
                </View>
            </View>
            <View style={[styles.cell, {width: '30%'}]}>
                <View style={styles.row}>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View style={styles.row}>
                            <Text style={styles.miniTitle}>EVAL N.1</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View style={styles.row}>
                            <Text style={styles.miniTitle}>EVAL N.2</Text>
                        </View>
                    </View>
                    <View style={{width: '50%', borderRight: 1}}>
                        <View style={styles.row}>
                            <View style={[styles.noBorderCell, {width: '100%', borderBottom: 1}]}>
                                <Text style={styles.text}>{data?.trimestre}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={{width: '33.33%', borderRight: 1}}>
                                <Text style={styles.text}>Note(N)</Text>
                            </View>
                            <View style={[styles.noBorderCell, {width: '33.33%', borderRight: 1}]}>
                                <Text style={styles.text}>Coeff(C)</Text>
                            </View>
                            <View style={[styles.noBorderCell, {width: '33.33%'}]}>
                                <Text style={styles.text}>N x C</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%'}]}>
                        <View>
                            <Text style={styles.miniTitle}>RANG</Text>
                            <Text style={styles.englishText}>POS</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.cell, {width: '20%'}]}>
                <View style={styles.row}>
                    <View style={[styles.noBorderCell, {width: '40%', borderRight: 1}]}>
                        <View>
                            <Text style={styles.miniTitle}>MENTION</Text>
                            <Text style={styles.englishText}>GRADE</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '60%'}]}>
                        <View>
                            <Text style={styles.miniTitle}>APPRECIATION</Text>
                            <Text style={styles.englishText}>APPRECIATION</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.cell, {width: '20%'}]}>
                <View>
                    <Text style={styles.miniTitle}>ENSEIGNANTS</Text>
                    <Text style={styles.englishText}>TEACHERS</Text>
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

export default PDFHeaderMatiereBulletin