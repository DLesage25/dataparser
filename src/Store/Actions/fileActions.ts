export const uploadFile = async (file: any) => {
    const reader = new FileReader();

    return async (dispatch: any) => {
        reader.onload = (evt: any) => {
            if (evt.target) {
                dispatch({
                    type: 'ADD_FILE',
                    payload: {
                        fileData: JSON.parse(evt.target.result),
                        file,
                    },
                });
            }
        };

        reader.readAsText(file);
    };
};
