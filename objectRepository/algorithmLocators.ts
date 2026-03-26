export const algorithmLocators = {

    algorithmPanelExpand: { role: 'button' as const, name: 'expanded Algorithms close' },
    algorithmPanelCollapse: { role: 'button' as const, name: 'collapsed Algorithms close' },
    researchOnlyBanner: { text: 'Research only - not for' },
    algorithmName: { text: '#1 Gleason Score' },
    algorithmReady: { text: 'Ready' },

    //Algorithm selection locators
    runAlgorithmButton: { role: 'button' as const, name: 'Run algorithm' },
    selectAlgorithmDropDown: { role: 'combobox' as const, name: '* Select algorithm' },
    algorithmOptions: { text: 'Gleason Score' },
    scanSelectionDropDown: { role: 'combobox' as const, index: 1 },
    selectWholeScan: { text: 'whole scan' },
    nextButton: { role: 'button' as const, name: 'Next' },
};