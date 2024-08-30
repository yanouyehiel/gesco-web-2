import { StyleSheet, Text, View } from '@react-pdf/renderer'
import React from 'react'
import { dateParserTime, isTrimestre, arrondirMoyenne } from '../utils/functions'

function PDFFooterBulletin({ data, elt, ecole }) {
    function calculerDureeTotale(absences) {
        let totalHeures = 0;
        let totalMinutes = 0;
    
        for (const absence of absences) {
            const { periode } = absence; // Récupérer la période
            const { heures, minutes } = calculerDuree(periode);
            totalHeures += heures;
            totalMinutes += minutes;
        }
    
        // Normaliser les minutes en heures et minutes
        totalHeures += Math.floor(totalMinutes / 60);
        totalMinutes = totalMinutes % 60;
    
        return { totalHeures, totalMinutes };
    }
    
    function calculerDuree(periode) {
        const [debut, fin] = periode.split(' - ');
        const dateDebut = new Date(`1970-01-01T${debut}:00`);
        const dateFin = new Date(`1970-01-01T${fin}:00`);
        const difference = dateFin - dateDebut
        const heures = Math.floor(difference / 3600000);
        const minutes = Math.round((difference % 3600000) / 60000);
        return { heures, minutes };
    }
    
    return (
        <View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View>
                        <Text style={styles.miniTitle}>RAPPEL DES EVALUATIONS</Text>
                        <Text style={styles.englishText}>SUMMARY EVAL RESULTS</Text>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%', padding: 5}]}>
                    <View>
                        <Text style={styles.miniTitle}>TRAVAIL</Text>
                        <Text style={styles.englishText}>WORK</Text>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%', padding: 5}]}>
                    <View>
                        <Text style={styles.miniTitle}>CONDUITE</Text>
                        <Text style={styles.englishText}>CONDUCT</Text>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%', padding: 5}]}>
                    <View>
                        <Text style={styles.miniTitle}>CONSEIL DE CLASSE</Text>
                        <Text style={styles.englishText}>CLASS CONCIL</Text>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.englishText}>MOY/AVG EVAL 1.</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}>{data.sequence.intitule=="Séquence 1" && arrondirMoyenne(elt.total_notes_student / data.total_coefficients_classe)}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>TOTAL POINTS</Text>
                                <Text style={styles.englishText}>TOTAL MARKS</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}>{elt.total_notes_student}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '60%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>ABS.</Text>
                                <Text style={styles.englishText}>ABS.</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '40%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}>{calculerDureeTotale(elt.absences).totalHeures}H {calculerDureeTotale(elt.absences).totalMinutes}Min</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '70%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>TABLEAU D'HONNEUR</Text>
                                <Text style={styles.englishText}>HONNOR ROLL</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '30%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.englishText}>MOY/AVG EVAL 2.</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.englishText}>TOTAL COEF</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}>{data.total_coefficients_classe}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '60%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>ABSENCES.</Text>
                                <Text style={styles.englishText}>TOTAL N. OF ABS.</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '40%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}>{calculerDureeTotale(elt.absences).totalHeures}H {calculerDureeTotale(elt.absences).totalMinutes}Min</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '70%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>ENCOURAGEMENTS</Text>
                                <Text style={styles.englishText}>ENCOURAGEMENTS</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '30%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.englishText}>MOY/AVG EVAL 3.</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 5}}>
                                <View>
                                    <Text style={styles.miniTitle}>MOY.</Text>
                                    <Text style={styles.englishText}>AVG.</Text>
                                </View>
                                <Text style={styles.textValue}>{isTrimestre(data.sequence.intitule) ? data.trimestre : data.sequence.intitule}</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}>{arrondirMoyenne(elt.total_notes_student / data.total_coefficients_classe)}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '60%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>EXCLUSIONS.</Text>
                                <Text style={styles.englishText}>SUSPENSION (days)</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '40%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '70%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>FELICITATIONS</Text>
                                <Text style={styles.englishText}>CONGRATULATIONS</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '30%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.englishText}>MOY/AVG EVAL 4.</Text>
                                <Text style={styles.englishText}></Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>RANG TRIM.</Text>
                                <Text style={styles.englishText}>POS.</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%', justifyContent: 'center', alignItems: 'center'}]}>
                            <Text style={styles.textValue}>{elt.rang}</Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '60%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>AVERT. CONDUITE</Text>
                                <Text style={styles.englishText}>WARNING COND.</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '40%'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '70%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>AVERT TRAVAIL</Text>
                                <Text style={styles.englishText}>WARNING WORK</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '30%'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.englishText}>MOY/AVG EVAL 5.</Text>
                                <Text style={styles.englishText}></Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>RANG ANNUEL.</Text>
                                <Text style={styles.englishText}>ANN. POSITION</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '60%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>BLAME CONDUITE</Text>
                                <Text style={styles.englishText}>SERIOUS WARNING</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '40%'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '70%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>BLAME TRAVAIL</Text>
                                <Text style={styles.englishText}>SERIOUS WARN. WORK</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '30%'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.row}>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={{padding: 5}}>
                        <Text style={styles.miniTitle}>RAPPEL MOYENNES</Text>
                        <Text style={styles.englishText}>SUMMARY TERMS RESULTS</Text>
                    </View>
                </View>
                <View style={[styles.cell, {width: '25%'}]}>
                    <View style={styles.row}>
                        <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                            <View style={{padding: 5}}>
                                <Text style={styles.miniTitle}>MOYENNE CLASSE</Text>
                                <Text style={styles.englishText}>AVG. CLASSE</Text>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '25%'}]}>
                            <Text style={styles.textValue}></Text>
                        </View>
                    </View>
                </View>
                <View style={[styles.cell, {width: '15%'}]}>
                    <View style={{padding: 5}}>
                        <Text style={styles.miniTitle}>OBS. CONSEIL</Text>
                        <Text style={styles.englishText}>COUNCIL OBS.</Text>
                    </View>
                </View>
                <View style={[styles.cell, {width: '35%'}]}>
                    <View style={{padding: 5}}>
                        <Text style={styles.miniTitle}>VISA DU CHEF D'ETABLISSEMENT</Text>
                        <Text style={styles.englishText}>PRINCIPAL'S SIGNATURE</Text>
                    </View>
                </View>
            </View>

            <View style={styles.row}>
                <View style={[styles.cell, {width: '65%'}]}>
                    <View style={[styles.row, {borderBottom: 0.8}]}>
                        <View style={[styles.noBorderCell, {width: '38.5%', borderRight: 0.8}]}>
                            <View style={[styles.row, {borderBottom: 0.8}]}>
                                <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                                    <View style={{padding: 2}}>
                                        <Text style={styles.miniTitle}>TRIM. 1</Text>
                                        <Text style={styles.englishText}>TERM. 1</Text>
                                    </View>
                                </View>
                                <View style={[styles.noBorderCell, {width: '25%'}]}>
                                    <Text style={styles.textValue}></Text>
                                </View>
                            </View>
                            <View style={styles.row}>
                                <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                                    <View style={{padding: 2}}>
                                        <Text style={styles.miniTitle}>TRIM. 2</Text>
                                        <Text style={styles.englishText}>TERM. 2</Text>
                                    </View>
                                </View>
                                <View style={[styles.noBorderCell, {width: '25%'}]}>
                                    <Text style={styles.textValue}></Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '56.5%'}]}>
                            <Text style={styles.textValue}>Assez Bien / Fairly Good</Text>
                        </View>
                    </View>
                    <View style={[styles.row, {borderBottom: 0.8}]}>
                        <View style={[styles.noBorderCell, {width: '38.5%', borderRight: 0.8}]}>
                            <View style={styles.row}>
                                <View style={[styles.noBorderCell, {width: '75%', borderRight: 0.8}]}>
                                    <View style={{padding: 2}}>
                                        <Text style={styles.miniTitle}>TRIM. 3</Text>
                                        <Text style={styles.englishText}>TERM. 3</Text>
                                    </View>
                                </View>
                                <View style={[styles.noBorderCell, {width: '25%'}]}>
                                    <Text style={styles.textValue}></Text>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.noBorderCell, {width: '61.5%'}]}>
                            <View style={styles.row}>
                                <View style={[styles.noBorderCell, {width: '40%', borderRight: 0.8}]}>
                                    <View style={{padding: 2}}>
                                        <Text style={styles.miniTitle}>Visa du parent</Text>
                                        <Text style={styles.englishText}>Parent's Signature</Text>
                                    </View>
                                </View>
                                <View style={[styles.noBorderCell, {width: '60%'}]}>
                                    <Text style={styles.textValue}></Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Text style={{fontSize: 12, textAlign: 'left', color: 'red', padding: 5}}>Les élèves ont deux semaines à partir de la date de remise des bulletins pour procéder à des revendications.
                            Ce délai passé, elles ne seront plus recevables.
                        </Text>
                    </View>
                </View>
                <View style={[styles.cell, {width: '35%'}]}>
                    <Text style={{textAlign: 'center', fontSize: 12, margin: 5}}>{ecole.ville} le / {ecole.ville} the {dateParserTime(new Date())}</Text>
                    <Text style={{textAlign: 'center', fontSize: 12, margin: 5}}>Le Proviseur / Le Principal</Text>
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
        textTransform: 'capitalize',
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
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center'
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
        //padding: 5,
    },
    noBorderCell: {
        textAlign: 'left',
        fontSize: 10,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})

export default PDFFooterBulletin