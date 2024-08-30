import { Document, Image, Page, StyleSheet, View, Text } from '@react-pdf/renderer'
import React from 'react'
import PDFMatiereBulletin from './PDFMatiereBulletin'
import PDFInfoStudentBulletin from './PDFInfoStudentBulletin'
import PDFHeaderMatiereBulletin from './PDFHeaderMatiereBulletin'
import PDFHeaderBulletin from './PDFHeaderBulletin'
import PDFFooterBulletin from './PDFFooterBulletin'

function PDFBulletin({ data, ecole }) {
    function groupData(data) {
        const result = Object.groupBy(data, ({ groupe_matiere }) => groupe_matiere);
        return result
    }
    return (
        <Document>
            {data.notes.map((elt, i) => (
                <Page size='A3' style={styles.page} key={i}>
                    
                    <PDFHeaderBulletin data={data} ecole={ecole} elt={elt}  />

                    <View style={styles.content}>

                        <PDFInfoStudentBulletin elt={elt} data={data} />

                        <PDFHeaderMatiereBulletin data={data} />

                        {elt.notes.map((item, i) => {
                            return <PDFMatiereBulletin item={item} key={i} data={data} />
                        })}

                        <View style={styles.row}>
                            <View style={[styles.cell, {width: '30%'}]}>
                                <View>
                                    <Text style={styles.miniTitle}></Text>
                                </View>
                            </View>
                            <View style={[styles.cell, {width: '30%'}]}>
                                <View style={styles.row}>
                                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                                        <View>
                                            <Text style={styles.miniTitle}></Text>
                                        </View>
                                    </View>
                                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                                        <View>
                                            <Text style={styles.miniTitle}></Text>
                                        </View>
                                    </View>
                                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                                        <View>
                                            <Text style={styles.miniTitle}></Text>
                                        </View>
                                    </View>
                                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                                        <View>
                                            <Text style={styles.miniTitle}></Text>
                                        </View>
                                    </View>
                                    <View style={[styles.noBorderCell, {width: '16.66%', borderRight: 1}]}>
                                        <View>
                                            <Text style={styles.miniTitle}></Text>
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
                                            <Text style={styles.miniTitle}></Text>
                                        </View>
                                    </View>
                                    <View style={[styles.noBorderCell, {width: '60%'}]}>
                                        <View>
                                            <Text style={[styles.miniTitle, {textAlign: 'center'}]}></Text>
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

                        <PDFFooterBulletin data={data} ecole={ecole} elt={elt} />
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
        margin: 0,
        padding: 0
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
        flexDirection: 'row',
        height: 50
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

export default PDFBulletin