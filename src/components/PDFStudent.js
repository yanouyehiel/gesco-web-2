import { cilPeople } from "@coreui/icons";
import { Footnote, PageBottom, Tailwind } from "@fileforge/react-print";
import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import * as React from "react";
import { dateParser } from "../utils/functions";

export const PDFStudent = ({ student, ecole }) => {
    
  return (
    <Document>
        {(ecole && student) && <Page style={styles.body}>
            <View style={styles.header}>
                <View>
                    <Text>{ecole.nom}</Text>
                    <Text>{ecole.localisation}</Text>
                    <Text>{ecole.ville}</Text>
                </View>
                <View>
                    <Text>{ecole.telephone}</Text>
                    <Text>{ecole.site_web}</Text>
                </View>
            </View>
            <View style={styles.content}>
                <View style={styles.title}>
                    <Text>Certificat de scolarité</Text>
                    <Text>2024 - 2025</Text>
                </View>
                <View style={{margin: 20}}>
                    <Text>Je soussigné, M./Mme John DOE, Directeur de {ecole.nom}, certifie que :</Text>
                    <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
                        <Text style={styles.text}>{student.student.nom + ' ' + student.student.prenom}</Text>
                        <Text>né le <Text style={styles.text}>{dateParser(student.student.date_naissance)} à {student.student.lieu_naissance}</Text></Text>
                        <Text>avec pour matricule <Text style={styles.text}>{student.student.matricule}</Text></Text>
                    </View>
                    <Text>est bien inscrit dans notre établissement, en classe de {student.classe.nom}, pour l'année scolaire {student.student.date_scolarisation}</Text>
                    <Text style={{marginTop: 20}}>Pour faire valoir ce que de droit,</Text>
                    <View style={styles.footer}>
                        <Text>Fait à {ecole.ville},</Text>
                        <Text>Le {new Date().toLocaleDateString('fr-FR')}</Text>
                        <Text style={{marginTop: 20}}>Le Directeur</Text>
                    </View>
                </View>
            </View>
            {/* <Text style={styles.pageNumber}
            render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages} pages`}
            fixed></Text> */}
        </Page>}
    </Document>
  );
};

const styles = StyleSheet.create({
    body: {
        paddingBottom: 65,
        paddingTop: 35,
        paddingHorizontal: 35
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        borderColor: 'black' ,
        borderWidth: 1
    },
    content: {
        marginTop: 100
    },
    footer: {
        marginTop: 50,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    text: {
        color: 'black',
        fontWeight: 'bold'
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "gray"
    }
})