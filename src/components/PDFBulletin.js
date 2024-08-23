import { Document, Image, Page, StyleSheet, View, Text } from '@react-pdf/renderer'
import React from 'react'
import PDFMatiereBulletin from './PDFMatiereBulletin'
import PDFInfoStudentBulletin from './PDFInfoStudentBulletin'
import PDFHeaderMatiereBulletin from './PDFHeaderMatiereBulletin'
import PDFHeaderBulletin from './PDFHeaderBulletin'

function PDFBulletin({ data, ecole }) {

    return (
        <Document>
            {data.notes.map((elt, i) => (
                <Page size='A3' style={styles.page} key={i} orientation='portrait'>
                    
                    <PDFHeaderBulletin data={data} ecole={ecole} elt={elt}  />

                    <View style={styles.content}>

                        <PDFInfoStudentBulletin elt={elt} data={data} />

                        <PDFHeaderMatiereBulletin data={data} />

                        {elt.notes.map((item, i) => (
                            <PDFMatiereBulletin item={item} key={i} />
                        ))}
                    </View>

                    {/* <Text style={styles.pageNumber}
                    render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages} pages`}
                    fixed></Text> */}
                </Page>))
            }
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
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})

export default PDFBulletin