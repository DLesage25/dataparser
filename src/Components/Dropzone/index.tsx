import React, { useRef, useState } from 'react';
import './dropzone.css';
import cloudImage from '../../assets/cloud_upload.svg';

const DropZone = ({
    disabled,
    onNewFiles,
}: {
    disabled: any;
    onNewFiles: (newFiles: any[]) => void;
}) => {
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
        <div
            className={`Dropzone ${highlight ? 'Highlight' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={openFileDialog}
            style={{ cursor: disabled ? 'default' : 'pointer' }}
        >
            <img alt="upload" className="Icon" src={cloudImage} />
            <input
                ref={fileInputRef}
                className="FileInput"
                type="file"
                multiple
                onChange={onFilesAdded}
            />
            <span>Upload Files</span>
        </div>
    );
};

export default DropZone;
