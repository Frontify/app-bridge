/* (c) Copyright Frontify Ltd., all rights reserved. */

import { Asset } from '../types';
import { useEffect, useRef, useState } from 'react';
import Worker from '../workers/upload.worker.js?worker&inline';
import { createAssetByFileId } from '../repositories/AssetRepository';

export type UseAssetUploadParameters = {
    onUploadProgress?: (event: MessageEvent) => void;
    onUploadProgressAll?: (event: MessageEvent) => void;
    onUploadDone?: (event: MessageEvent<FrontifyFile>) => void;
    onUploadDoneAll?: (event: Asset[]) => void;
    onUploadFail?: () => void;
    onUploadAssetFail?: (event: MessageEvent) => void;
};

type FrontifyFile = {
    file_id: string;
    file_name: string;
    generic_url: string;
};

enum WorkerEvent {
    OnProgress = 'onProgress',
    OnProgressAll = 'onProgressAll',
    OnDone = 'onDone',
    OnDoneAll = 'onDoneAll',
    OnFail = 'onFail',
    OnAssetFail = 'onAssetFail',
}

export type UseAssetUploadReturnTypes = [(files: FileList | File) => void, { results: Asset[]; doneAll: boolean }];

export const useAssetUpload = (props?: UseAssetUploadParameters): UseAssetUploadReturnTypes => {
    const results = useRef<Asset[]>([]);
    const promises = useRef<Promise<unknown>[]>([]);
    const [doneAll, setDoneAll] = useState(false);

    const { onUploadProgress, onUploadProgressAll, onUploadDone, onUploadDoneAll, onUploadFail, onUploadAssetFail } =
        props ?? {};

    const projectId = window.application?.sandbox?.config?.context?.project?.id;

    const workerRef = useRef<Worker>();

    useEffect(() => {
        const worker = new Worker();
        workerRef.current = worker;

        worker.addEventListener('message', async (workerEvent) => {
            switch (workerEvent.data.event) {
                case WorkerEvent.OnProgress:
                    onProgress(workerEvent);
                    break;
                case WorkerEvent.OnProgressAll:
                    onProgressAll(workerEvent);
                    break;
                case WorkerEvent.OnDone:
                    await onDone(workerEvent);
                    break;
                case WorkerEvent.OnDoneAll:
                    await onDoneAll();
                    break;
                case WorkerEvent.OnFail:
                    onFail();
                    break;
                case WorkerEvent.OnAssetFail:
                    onAssetFail(workerEvent);
                    break;
                default:
                    throw new Error(`${workerEvent.data.event} is not handled`);
            }
        });

        return () => {
            worker.terminate();
        };
    }, []);

    const onProgress = (workerEvent: MessageEvent<FrontifyFile>) => {
        onUploadProgress?.(workerEvent);
    };

    const onProgressAll = (workerEvent: MessageEvent<FrontifyFile>) => {
        onUploadProgressAll?.(workerEvent);
    };

    const onDone = async (workerEvent: MessageEvent<FrontifyFile>) => {
        const assetPromise = createAssetFromFileIds(workerEvent.data.file_id);
        promises.current.push(assetPromise);

        onUploadDone?.(workerEvent);

        results.current = [...results.current, await assetPromise];
    };

    const onDoneAll = async () => {
        await Promise.all(promises.current);

        onUploadDoneAll?.(results.current);

        setDoneAll(true);
    };

    const onFail = () => {
        onUploadFail?.();
        throw new Error('Asset upload failed');
    };

    const onAssetFail = (workerEvent: MessageEvent<FrontifyFile>) => {
        onUploadAssetFail?.(workerEvent);
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

        const message = {
            files: fileArray,
            formData: projectId ? [{ project_id: projectId }] : null,
        };

        if (workerRef?.current) {
            workerRef.current.postMessage(message);
        }
    };

    const createAssetFromFileIds = async (fileId: string) => {
        return await createAssetByFileId(fileId, projectId);
    };

    return [uploadFiles, { results: results.current, doneAll }];
};
