import { Document, Page, StyleSheet, View } from '@react-pdf/renderer'
import React from 'react'

function PDFBulletin({ ecole }) {
    return (
        <Document>
            <Page size='A3'>
                <View style={styles.header}>
                    <View>
                        <Text>{ecole.nom}</Text>
                        <Text>{ecole.ville}</Text>
                        <Text>{ecole.telephone}</Text>
                        <Text>{ecole.site_web}</Text>
                    </View>
                </View>

                <Text style={styles.pageNumber}
                render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages} pages`}
                fixed></Text>
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
})

export default PDFBulletin