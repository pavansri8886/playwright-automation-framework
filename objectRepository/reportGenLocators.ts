import testData from '../test-data/t2_generate_iccr_document.json'

export const reportGenLocators = {
    //Locators related to create report button and choosing type
    createBTN: { role: 'menuitem' as const, name: 'plus create' },
    documentBTN: { role: 'menuitem' as const, name: 'audit document' },
    templateSearchBar: { role: 'combobox' as const, name: '* Template' },

    okBTN: { role: 'button' as const, name: 'OK' },

    //Data capture locators
    sections: {
        presentationMode: 'Presentation mode',
        clinicalFindings: 'Current clinical findings',
        presurgicalTherapy: 'Prior presurgical therapy',
        priorHistory: 'Prior history of breast cancer',
        imagingModality: 'Imaging modality',
        radiologicalFindings: 'Radiological findings',
        clipInserted: 'Clip inserted',
    }



}