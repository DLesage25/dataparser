import React from 'react';
import Grid from '@material-ui/core/Grid';
import ReactJson from 'react-json-view';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../Store/index';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({}));

const FileProcessor = () => {
    const { fileData } = useSelector((state: RootState) => state.fileReducer);
    const dispatch = useDispatch();
    return (
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item style={{ alignSelf: 'flex-start' }}>
                <p>
                    You can add and remove data as needed. Separate data arrays
                    will be converted to their own CSV file.
                </p>
            </Grid>
            <Grid item>
                {fileData && (
                    <ReactJson
                        style={{ fontSize: '10px' }}
                        src={fileData}
                        enableClipboard={false}
                        onDelete={({ updated_src }) =>
                            dispatch({
                                type: 'ADD_PROCESSED_FILE_DATA',
                                payload: updated_src,
                            })
                        }
                        displayDataTypes={false}
                    />
                )}
            </Grid>
        </Grid>
    );
};

export default FileProcessor;
