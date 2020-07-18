import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Dropzone from '../Dropzone';
import Progress from '../Progress';

const useStyles = makeStyles(() => ({
    files: {
        flex: 1,
        overflowY: 'auto',
    },
    row: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '50px',
        padding: '8px',
        overflow: 'hidden',
        boxSizing: 'border-box',
    },
    filename: {
        marginBottom: '8px',
        fontSize: '16px',
        color: '#555',
        textAlign: 'center',
    },
    actions: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        alignSelf: 'center',
        marginBottom: '10px',
    },
    checkIcon: {
        opacity: '0.5',
        marginLeft: '32px',
    },
}));

const FileUploader = () => {
    const classes = useStyles();
    const [files, setFiles]: [any, any] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress]: [any, any] = useState({});
    const [success, setSuccess] = useState(false);

    const onNewFiles = (newFiles: any[]) => {
        setFiles(files.concat(newFiles));
    };
    const processFiles = async () => {
        setUploadProgress({});
        setUploading(true);
        const promises: Promise<void>[] = [];
        files.forEach((file: any) => {
            promises.push(sendRequest(file));
        });
        try {
            await Promise.all(promises);

            setSuccess(true);
            setUploading(false);
        } catch (e) {
            console.error(e);
            setSuccess(true);
            setUploading(false);
        }
    };
    const sendRequest = async (file: any) => {
        const reader = new FileReader();

        reader.onload = (evt: any) => {
            if (evt.target) console.log(evt.target.result);
        };
        reader.readAsText(file);
    };
    const renderActions = () => {
        if (success) {
            return (
                <Button
                    onClick={() => {
                        setFiles([]);
                        setSuccess(false);
                    }}
                >
                    Clear
                </Button>
            );
        } else {
            return (
                <Button
                    disabled={files.length < 0 || uploading}
                    onClick={processFiles}
                    variant="contained"
                >
                    Upload
                </Button>
            );
        }
    };

    const renderProgress = (file: any) => {
        const progress: any = uploadProgress[file.name];
        if (uploading || success) {
            return (
                <div className="ProgressWrapper">
                    <Progress progress={progress ? progress.percentage : 0} />
                    <img
                        className={classes.checkIcon}
                        alt="done"
                        src="baseline-check_circle_outline-24px.svg"
                        style={{
                            opacity:
                                progress && progress.state === 'done' ? 0.5 : 0,
                        }}
                    />
                </div>
            );
        }
    };

    return (
        <Grid container alignItems="center" justify="center" direction="column">
            <Grid item xs={4}>
                <Dropzone
                    onNewFiles={onNewFiles}
                    disabled={uploading || success}
                />
            </Grid>
            <Grid
                container
                item
                xs={8}
                direction="column"
                style={{ marginTop: '32px' }}
            >
                <Grid
                    item
                    container
                    xs={12}
                    className={classes.files}
                    direction="column"
                >
                    {files.map((file: { name: string }) => {
                        return (
                            <Grid
                                item
                                container
                                key={file.name}
                                className={classes.row}
                            >
                                <span className={classes.filename}>
                                    {file.name}
                                </span>
                                {renderProgress(file)}
                            </Grid>
                        );
                    })}
                </Grid>
                <Grid item container xs={4} className={classes.actions}>
                    {renderActions()}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default FileUploader;
