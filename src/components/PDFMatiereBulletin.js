import { StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'

function PDFMatiereBulletin({ item }) {
    return (
        <View style={styles.row}>
            <View style={[styles.cell, {width: '30%'}]}>
                <View>
                    <Text style={styles.miniTitle}>{item.matiere.intitule.toUpperCase()}</Text>
                </View>
            </View>
            <View style={[styles.cell, {width: '30%'}]}>
                <View style={styles.row}>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View>
                            <Text style={styles.miniTitle}>{item.note.note}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View>
                            <Text style={styles.miniTitle}></Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View>
                            <Text style={styles.miniTitle}>{item.note.note}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View>
                            <Text style={styles.miniTitle}>{item.coeff?.coefficient}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View>
                            <Text style={styles.miniTitle}>{item.note.note * item.coeff?.coefficient}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%'}]}>
                        <View>
                            <Text style={styles.miniTitle}></Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.cell, {width: '20%'}]}>
                <View style={styles.row}>
                    <View style={[styles.noBorderCell, {width: '40%', borderRight: 1}]}>
                        <View>
                            <Text style={styles.miniTitle}>Assez Bien</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '60%'}]}>
                        <View>
                            <Text style={[styles.miniTitle, {textAlign: 'center'}]}>A+</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.cell, {width: '20%'}]}>
                <View>
                    <Text style={styles.miniTitle}></Text>
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

export default PDFMatiereBulletin