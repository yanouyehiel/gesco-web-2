import { StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { isTrimestre } from '../utils/functions';

function PDFMatiereBulletin({ item, data }) {
  
    function classifierNote(value) {
        const note = value * 5;
        if (note >= 90 && note <= 100) {
            return 'A+';
        } else if (note >= 85) {
            return 'A';
        } else if (note >= 80) {
            return 'A-';
        } else if (note >= 75) {
            return 'B+';
        } else if (note >= 70) {
            return 'B';
        } else if (note >= 65) {
            return 'B-';
        } else if (note >= 60) {
            return 'C+';
        } else if (note >= 55) {
            return 'C';
        } else if (note >= 50) {
            return 'C-';
        } else if (note >= 40) {
            return 'D';
        } else {
            return 'F';
        }
    }
    function appreciationNote(note) {
        if (note >= 18 && note <= 20) {
            return 'Excellent';
        } else if (note >= 16) {
            return 'Très Bien';
        } else if (note >= 14) {
            return 'Bien';
        } else if (note >= 12) {
            return 'Assez Bien';
        } else if (note >= 10) {
            return 'Passable';
        } else if (note >= 8) {
            return 'Insuffisant';
        } else if (note >= 6) {
            return 'Médiocre';
        } else {
            return 'Nul';
        }
    }

    return (
        <View style={styles.row}>
            <View style={[styles.cell, {width: '30%'}]}>
                <View style={{padding: 5}}>
                    <Text style={styles.miniTitle}>{item.matiere.intitule.toUpperCase()}</Text>
                </View>
            </View>
            <View style={[styles.cell, {width: '30%'}]}>
                <View style={styles.row}>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View style={{padding: 5}}>
                            <Text style={styles.miniTitle}>{item.note.note}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View style={{padding: 5}}>
                            <Text style={styles.miniTitle}></Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View style={{padding: 5}}>
                            <Text style={styles.miniTitle}>{isTrimestre(data.sequence) ? 0 : item.note.note}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View style={{padding: 5}}>
                            <Text style={styles.miniTitle}>{item.coeff?.coefficient}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                        <View style={{padding: 5}}>
                            <Text style={styles.miniTitle}>{item.note.note * item.coeff?.coefficient}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '16.66%'}]}>
                        <View style={{padding: 5}}>
                            <Text style={styles.miniTitle}></Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.cell, {width: '20%'}]}>
                <View style={styles.row}>
                    <View style={[styles.noBorderCell, {width: '40%', borderRight: 1}]}>
                        <View style={{padding: 5}}>
                            <Text style={styles.miniTitle}>{!item.note.appreciation ? appreciationNote(item.note.note) : item.note.appreciation}</Text>
                        </View>
                    </View>
                    <View style={[styles.noBorderCell, {width: '60%'}]}>
                        <View style={{justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: 5}}>
                            <Text style={[styles.miniTitle, {textAlign: 'center'}]}>{classifierNote(item.note.note)}</Text>
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