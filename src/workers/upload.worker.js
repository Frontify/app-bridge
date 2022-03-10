// From Clarify

let files = [];
let files_metadata = [];
let files_metadata_add = [];
let progress = [];
let progressAll = {
    loaded: 0,
    total: 0,
};
const upload_chunk_queue = [];
let is_uploading = false;

// @TODO implement parallel uploads (e.g. 4 workers)
// @see https://github.com/cinely/mule-uploader/blob/master/src/mule-uploader.js

function consumeNextUploadFromQueue() {
    // Abort early if there is nothing left to do
    if (upload_chunk_queue.length <= 0) {
        return;
    }

    // Start the next pending upload
    upload_chunk_queue.shift().start();
}

function upload(data, chunk) {
    const xhr = new XMLHttpRequest();

    try {
        xhr.upload.onprogress = function (e) {
            progressAll.loaded += e.loaded - progress[data.index][data.chunk].loaded;
            progress[data.index][data.chunk].loaded = e.loaded;

            // Calculate loaded bytes of single file considering chunks
            let loaded = 0;
            progress[data.index].forEach((chunkProgress) => {
                loaded += chunkProgress.loaded;
            });

            self.postMessage({
                event: "onProgress",
                loaded: loaded,
                total: data.total,
                lengthComputable: e.lengthComputable,
                index: data.index,
            });

            self.postMessage({
                event: "onProgressAll",
                loaded: progressAll.loaded,
                total: progressAll.total,
            });
        };
    } catch (error) {
        // IE11 xhr.upload.onprogress seems to be not supported within web-workers
        // Omit file progress and just send overall progress
        xhr.onprogress = function (e) {
            self.postMessage({
                event: "onProgressAll",
                loaded: e.loaded,
                total: e.total,
            });
        };
    }

    xhr.open("PUT", data.url, true);
    xhr.onload = function (e) {
        progress[data.index][data.chunk].finished = true;
        let finished = true;
        for (let p = 1; p < progress[data.index].length; p++) {
            if (!progress[data.index][p].finished) {
                finished = false;
            }
        }

        if (finished) {
            files[data.index].finished = true;
            const xhr2 = new XMLHttpRequest();
            xhr2.open("POST", `${self.location.origin}/api/file/progress`, true);
            xhr2.onload = function (e) {
                let response;

                try {
                    response = JSON.parse(xhr2.responseText);
                } catch (e) {
                    response = {};
                }

                response.event = "onDone";
                response.index = data.index;

                self.postMessage(response);

                // Process next file
                process();
            };
            xhr2.send(JSON.stringify(data));
        }

        // Start the next chunk upload
        consumeNextUploadFromQueue();
    };

    return {
        start: function () {
            xhr.send(chunk);
        },
    };
}

function init(data) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${self.location.origin}/api/file/init`, true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.onload = function (e) {
        let response;

        try {
            response = JSON.parse(xhr.responseText);
        } catch (e) {
            response = { success: false };
        }

        if (!response.success || !(response.files && response.files.length)) {
            self.postMessage({ event: "onFail" });
            return;
        }

        files_metadata = files_metadata.concat(response.files);

        // Only start processing if there are no ongoing uploads
        if (!is_uploading) {
            is_uploading = true;
            process();
        }
    };
    xhr.send(
        JSON.stringify({
            files: files_metadata_add,
            project: data.project,
            object_type: data.fileType,
        }),
    );
}

function process() {
    // Sequential upload
    let found = false;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!found && !file.finished) {
            found = true;
            processFile(i, files[i], files_metadata[i]);
        }
    }

    if (!found) {
        // Reset everything after the last upload
        reset();
    }
}

function processFile(index, file, file_metadata) {
    if (typeof file_metadata !== "object") {
        error(index, file, {});
        return;
    }

    if (!file_metadata.success) {
        error(index, file, file_metadata);
        return;
    }

    progress[index] = [];
    const blob = file;
    const BYTES_PER_CHUNK = 15 * 1024 * 1024;
    const SIZE = blob.size;
    let start = 0;
    let end = BYTES_PER_CHUNK;
    let chunkNr = 1;

    while (start < SIZE) {
        const chunk = blob.slice(start, end);
        progress[index][chunkNr] = { finished: false, loaded: 0 };
        upload_chunk_queue.push(
            upload(
                {
                    index,
                    start,
                    upload: file_metadata.upload,
                    object: file_metadata.object,
                    url: file_metadata.upload.urls[chunkNr],
                    more: end < SIZE,
                    end: Math.min(end, SIZE - 1),
                    total: SIZE,
                    chunk: chunkNr,
                },
                chunk,
            ),
        );
        start = end;
        end = start + BYTES_PER_CHUNK;
        chunkNr++;
    }

    // Upload at most 4 chunks in parallel
    for (let i = 0; i < 4; i++) {
        consumeNextUploadFromQueue();
    }
}

function error(index, file, file_metadata) {
    const error = file_metadata && file_metadata.error ? file_metadata.error : "Unable to process file.";

    self.postMessage({
        event: "onAssetFail",
        index,
        file,
        file_metadata,
        error,
    });

    is_uploading = false;
    file.finished = true;

    // Process next file
    process();
}

function reset() {
    files = [];
    files_metadata = [];
    files_metadata_add = [];
    progress = [];
    progressAll = {
        loaded: 0,
        total: 0,
    };
    is_uploading = false;

    self.postMessage({
        event: "onDoneAll",
    });
}

self.onmessage = function (e) {
    // Allows to add files during ongoing uploads
    files_metadata_add = [];

    for (let index = 0; index < e.data.files.length; index++) {
        const file = e.data.files[index];
        let metadata = {
            name: file.name,
            size: file.size,
            type: file.type,
        };

        if (typeof String.prototype.normalize === "function") {
            metadata.name = metadata.name.normalize("NFC");
        }

        if (file.async) {
            // Force async processing
            metadata["async"] = file.async;
        }

        progressAll.total += file.size;

        if (e.data.formData) {
            metadata = { ...metadata, ...e.data.formData[index] };
        }

        if (Array.isArray(e.data.formData) && e.data.fileType === "ASSET_PREVIEW") {
            metadata["screen_id"] = e.data.formData[index].screen_id;
        }

        files.push(file);
        files_metadata_add.push(metadata);
    }

    init({ project: e.data.formData.project, fileType: e.data.fileType });
};
