const initialState = {
    fileUploaded: false,
    fileData: null,
    file: null,
    processedFileData: null,
};

export default (
    state = initialState,
    action: { type: string; payload: any }
) => {
    switch (action.type) {
        case 'ADD_FILE':
            return {
                ...state,
                fileData: action.payload.fileData,
                file: action.payload.file,
                fileUploaded: true,
            };
        case 'ADD_PROCESSED_FILE_DATA':
            return {
                ...state,
                processedFileData: action.payload,
            };
        default:
            return state;
    }
};
