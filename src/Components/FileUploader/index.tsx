import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import './fileUploader.css';

import Dropzone from '../Dropzone';
import Progress from '../Progress';

const useStyles = makeStyles(() => ({
    wrapper: {
        flexDirection: 'column',
        flex: 1,
        alignItems: 'flex-start',
        textAlign: 'left',
        overflow: 'hidden',
    },
    title: {
        color: '#555',
    },
    content: {
        paddingTop: '16px',
        boxSizing: 'border-box',
        width: '100%',
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
        console.log({ file });
    };
    const renderActions = () => {
        if (success) {
            return (
                <button
                    onClick={() => {
                        setFiles([]);
                        setSuccess(false);
                    }}
                >
                    Clear
                </button>
            );
        } else {
            return (
                <button
                    disabled={files.length < 0 || uploading}
                    onClick={processFiles}
                >
                    Upload
                </button>
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
                        className="CheckIcon"
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
        <Grid className={classes.wrapper}>
            <span className={classes.title}>Upload Files</span>
            <Grid className={classes.content}>
                <div>
                    <Dropzone
                        onNewFiles={onNewFiles}
                        disabled={uploading || success}
                    />
                </div>
                <div className="Files">
                    {files.map((file: { name: string }) => {
                        return (
                            <div key={file.name} className="Row">
                                <span className="Filename">{file.name}</span>
                                {renderProgress(file)}
                            </div>
                        );
                    })}
                </div>
            </Grid>

            <div className="Actions">{renderActions()}</div>
        </Grid>
    );
};

export default FileUploader;
