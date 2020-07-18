import React, { useRef, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import cloudImage from '../../assets/cloud_upload.svg';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
    dropzone: {
        height: '200px',
        width: '200px',
        backgroundColor: '#fff',
        border: '2px dashed rgb(187, 186, 186)',
        borderRadius: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        fontSize: '16px',
    },
    highlight: {
        backgroundColor: 'rgb(188, 185, 236)',
    },
    icon: {
        opacity: '0.3',
        height: '64px',
        width: '64px',
    },
    fileInput: {
        display: 'none',
    },
}));

const DropZone = ({
    disabled,
    onNewFiles,
}: {
    disabled: any;
    onNewFiles: (newFiles: any[]) => void;
}) => {
    const classes = useStyles();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const openFileDialog = () => {
        if (disabled) return;
        if (fileInputRef.current) fileInputRef.current.click();
    };

    const fileListToArray = (list: any) => {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    };

    const onFilesAdded = (event: any) => {
        if (disabled) return;
        const files = event.target.files;
        if (onNewFiles) {
            const array = fileListToArray(files);
            onNewFiles(array);
        }
    };

    const onDragOver = (event: any) => {
        event.preventDefault();

        if (disabled) return;

        setHighlight(true);
    };

    const onDragLeave = () => {
        setHighlight(false);
    };

    const onDrop = (event: any) => {
        event.preventDefault();

        if (disabled) return;

        const files = event.dataTransfer.files;
        if (onNewFiles) {
            const array = fileListToArray(files);
            onNewFiles(array);
        }
        setHighlight(false);
    };

    const [highlight, setHighlight] = useState(false);

    return (
        <Grid
            container
            item
            className={clsx(classes.dropzone, {
                [classes.highlight]: highlight,
            })}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
        >
            <img alt="upload" className={classes.icon} src={cloudImage} />
            <input
                ref={fileInputRef}
                className={classes.fileInput}
                type="file"
                multiple
                onChange={onFilesAdded}
            />
            <span>Upload Files</span>
        </Grid>
    );
};

export default DropZone;
