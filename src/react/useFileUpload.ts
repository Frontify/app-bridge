/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '../types';
import { useEffect, useRef, useState } from 'react';
import Worker from '../workers/upload.worker.js?worker&inline';

export type UseFileUploadTypes = {
    options?: UseFileUploadOptionsTypes;
    onUploadProgress?: (event: MessageEvent<Asset>) => void;
    onUploadProgressAll?: (event: MessageEvent<Asset>) => void;
    onUploadDone?: (event: MessageEvent<Asset>) => void;
    onUploadDoneAll?: (event: MessageEvent<Asset[]>) => void;
    onUploadFail?: () => void;
    onUploadAssetFail?: (event: MessageEvent<Asset>) => void;
};

export type UseFileUploadOptionsTypes = {
    fileType: UploadFileType;
};

export enum UploadFileType {
    Agnostic = 'AGNOSTIC',
    Asset = 'ASSET',
    AssetPreview = 'ASSET_PREVIEW',
}

enum WorkerEvent {
    OnProgress = 'onProgress',
    OnProgressAll = 'onProgressAll',
    OnDone = 'onDone',
    OnDoneAll = 'onDoneAll',
    OnFail = 'onFail',
    OnAssetFail = 'onAssetFail',
    OnLog = 'onLog',
}

export type UseFileUploadReturnTypes = [(files: FileList | File) => void, { results: Asset[]; doneAll: boolean }];

export const useFileUpload = ({
    options = { fileType: UploadFileType.Asset },
    onUploadProgress,
    onUploadProgressAll,
    onUploadDone,
    onUploadDoneAll,
    onUploadFail,
    onUploadAssetFail,
}: UseFileUploadTypes): UseFileUploadReturnTypes => {
    const results = useRef<Asset[]>([]);
    const [doneAll, setDoneAll] = useState(false);

    const workerRef = useRef<Worker>();

    useEffect(() => {
        const worker = new Worker();
        workerRef.current = worker;

        worker.addEventListener('message', (workerEvent) => {
            switch (workerEvent.data.event) {
                case WorkerEvent.OnProgress:
                    onProgress(workerEvent);
                    break;
                case WorkerEvent.OnProgressAll:
                    onProgressAll(workerEvent);
                    break;
                case WorkerEvent.OnDone:
                    onDone(workerEvent);
                    break;
                case WorkerEvent.OnDoneAll:
                    onDoneAll(workerEvent);
                    break;
                case WorkerEvent.OnFail:
                    onFail();
                    break;
                case WorkerEvent.OnAssetFail:
                    onAssetFail(workerEvent);
                    break;
                case WorkerEvent.OnLog:
                    onLog(workerEvent);
                    break;
                default:
                    throw new Error(`${workerEvent.data.event} is not handled`);
            }
        });

        return () => {
            worker.terminate();
        };
    }, []);

    const onProgress = (workerEvent: MessageEvent<Asset>) => {
        onUploadProgress && onUploadProgress(workerEvent);
    };

    const onProgressAll = (workerEvent: MessageEvent<Asset>) => {
        onUploadProgressAll && onUploadProgressAll(workerEvent);
    };

    const onDone = (workerEvent: MessageEvent<Asset>) => {
        onUploadDone && onUploadDone(workerEvent);
        results.current = [...results.current, workerEvent.data];
    };

    const onDoneAll = (workerEvent: MessageEvent<Asset[]>) => {
        onUploadDoneAll && onUploadDoneAll(workerEvent);
        setDoneAll(true);
    };

    const onFail = () => {
        onUploadFail && onUploadFail();
        throw new Error('Asset upload failed');
    };

    const onAssetFail = (workerEvent: MessageEvent<Asset>) => {
        onUploadAssetFail && onUploadAssetFail(workerEvent);
    };

    const onLog = (workerEvent: MessageEvent) => {
        console.log(workerEvent.data?.message);
    };

    const getFilesAsArray = (files: FileList | File): File[] => {
        const fileArray: File[] = [];

        if (files instanceof File) {
            fileArray.push(files);
        }

        if (files instanceof FileList) {
            fileArray.push(...Array.from(files));
        }

        return fileArray;
    };

    const resetState = () => {
        setDoneAll(false);
        results.current = [];
    };

    const uploadFiles = (files: FileList | File) => {
        resetState();
        const fileArray = getFilesAsArray(files);

        if (fileArray.length === 0) {
            return;
        }

        const projectId = window.application?.sandbox?.config?.context?.project?.id;

        const message = {
            files: fileArray,
            fileType: options.fileType,
            formData: projectId ? [{ project_id: projectId }] : null,
        };

        if (workerRef?.current) {
            workerRef.current.postMessage(message);
        }
    };

    return [uploadFiles, { results: results.current, doneAll }];
};
