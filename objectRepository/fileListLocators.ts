export const fileListLocators = {

    // dashboard page search bar
    searchBar: { role: 'searchbox' as const, name: 'Search' },
    searchButton: { role: 'button' as const, name: 'search' },

    //to open example files and my files from quick access
    clickExampleFilesQuickAccess: { testId: 'file-title-Example-files' },
    clickMyFilesQuickAccess: { testId: 'file-title-My-Files' },

    //to get the list of files in the table , we can use before and after searching for file
    fileRow: { role: 'cell' as const },
    fileName: { role: 'cell' as const, name: process.env['File_Name'] },

    //To open file
    openFile: { text: 'open' },

};