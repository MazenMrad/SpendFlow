# tesseract.js/docs/api.md at master · naptha/tesseract.js · GitHub

> Source: https://github.com/naptha/tesseract.js/blob/master/docs/api.md
> Cached: 2026-04-07T21:08:19.351Z

---

# API

[](#api)

[createWorker()](#create-worker)

- [Worker.recognize](#worker-recognize)

- [Worker.setParameters](#worker-set-parameters)

- [Worker.reinitialize](#worker-reinitialize)

- [Worker.detect](#worker-detect)

- [Worker.terminate](#worker-terminate)

- [Worker.writeText](#worker-writeText)

- [Worker.readText](#worker-readText)

- [Worker.removeFile](#worker-removeFile)

- [Worker.FS](#worker-FS)

[createScheduler()](#create-scheduler)

- [Scheduler.addWorker](#scheduler-add-worker)

- [Scheduler.addJob](#scheduler-add-job)

- [Scheduler.getQueueLen](#scheduler-get-queue-len)

- [Scheduler.getNumWorkers](#scheduler-get-num-workers)

- [setLogging()](#set-logging)

- [recognize()](#recognize)

- [detect()](#detect)

- [PSM](#psm)

- [OEM](#oem)

## createWorker(options): Worker

[](#createworkeroptions-worker)
`createWorker` is a function that creates a Tesseract.js worker.  A Tesseract.js worker is an object that creates and manages an instance of Tesseract running in a web worker (browser) or worker thread (Node.js).  Once created, OCR jobs are sent through the worker.

**Arguments:**

- `langs` a string to indicate the languages traineddata to download, multiple languages are specified using an array (['eng', 'chi_sim'])

- `oem` a enum to indicate the OCR Engine Mode you use

`options` an object of customized options

`corePath` path to a directory containing **all of** the following files from [Tesseract.js-core](https://www.npmjs.com/package/tesseract.js-core) package:

- `tesseract-core.wasm.js`

- `tesseract-core-simd.wasm.js`

- `tesseract-core-lstm.wasm.js`

- `tesseract-core-simd-lstm.wasm.js`

- Some code snippets found online set `corePath` to a specific `.js` file. This is **strongly discouraged.**  To provide the best performance and lowest network usage, Tesseract.js needs to be able to pick between builds.

- `langPath` path for downloading traineddata, do not include `/` at the end of the path

- `workerPath` path for downloading worker script

- `dataPath` path for saving traineddata in WebAssembly file system, not common to modify

- `cachePath` path for the cached traineddata, more useful for Node, for browser it only changes the key in IndexDB

`cacheMethod` a string to indicate the method of cache management, should be one of the following options

- write: read cache and write back (default method)

- readOnly: read cache and not to write back

- refresh: not to read cache and write back

- none: not to read cache and not to write back

- `legacyCore` set to `true` to ensure any code downloaded supports the Legacy model (in addition to LSTM model)

- `legacyLang` set to `true` to ensure any language data downloaded supports the Legacy model (in addition to LSTM model)

- `workerBlobURL` a boolean to define whether to use Blob URL for worker script, default: true

- `gzip` a boolean to define whether the traineddata from the remote is gzipped, default: true

- `logger` a function to log the progress, a quick example is `m => console.log(m)`

- `errorHandler` a function to handle worker errors, a quick example is `err => console.error(err)`

`config` an object of customized options which are set prior to initialization

This argument allows for setting "init only" Tesseract parameters

- Most Tesseract parameters can be set after a worker is initialized, using either `worker.setParameters` or the `options` argument of `worker.recognize`.

A handful of Tesseract parameters, referred to as "init only" parameters in Tesseract documentation, cannot be modified after Tesseract is initialized--these can only be set using this argument

- Examples include `load_system_dawg`, `load_number_dawg`, and `load_punc_dawg`

**Examples:**

const { createWorker } = Tesseract;
const worker = await createWorker('eng', 1, {
  langPath: '...',
  logger: m => console.log(m),
});

### worker.recognize(image, options, output, jobId): Promise

[](#workerrecognizeimage-options-output-jobid-promise)
`worker.recognize` provides core function of Tesseract.js as it executes OCR

Figures out what words are in `image`, where the words are in `image`, etc.

Tip

Note: `image` should be sufficiently high resolution.
Often, the same image will get much better results if you upscale it before calling `recognize`.

**Arguments:**

- `image` see [Image Format](/naptha/tesseract.js/blob/master/docs/image-format.md) for more details.

`options` an object of customized options

- `rectangle` an object to specify the regions you want to recognized in the image, should contain top, left, width and height, see example below.

`output` an object specifying which output formats to return (by default only `text` is returned)

- Other options include `blocks` (json), `hocr`, and `tsv`

- `jobId` Please see details above

**Output:**
`worker.recognize` returns a promise to an object containing `jobId` and `data` properties.  The `data` property contains output in all of the formats specified using the `output` argument.
Note

`worker.recognize` still returns an output object even if no text is detected (the outputs will simply contain no words). No exception is thrown as determining the page is empty is considered a valid result.

**Examples:**

const { createWorker } = Tesseract;
(async () => {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(image);
  console.log(text);
})();
With rectangle

const { createWorker } = Tesseract;
(async () => {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(image, {
    rectangle: { top: 0, left: 0, width: 100, height: 100 },
  });
  console.log(text);
})();

### worker.setParameters(params, jobId): Promise

[](#workersetparametersparams-jobid-promise)
`worker.setParameters()` set parameters for Tesseract API (using SetVariable()), it changes the behavior of Tesseract and some parameters like tessedit_char_whitelist is very useful.

**Arguments:**

- `params` an object with key and value of the parameters

- `jobId` Please see details above

Note:  `worker.setParameters` cannot be used to change the `oem`, as this value is set at initialization.  `oem` is initially set using an argument of `createWorker`.  After a worker already exists, changing `oem` requires running `worker.reinitialize`.

**Useful Parameters:**

name
type
default value
description

tessedit_pageseg_mode
enum
PSM.SINGLE_BLOCK
Check [HERE](https://github.com/tesseract-ocr/tesseract/blob/4.0.0/src/ccstruct/publictypes.h#L163) for definition of each mode

tessedit_char_whitelist
string
''
setting white list characters makes the result only contains these characters, useful if content in image is limited

preserve_interword_spaces
string
'0'
'0' or '1', keeps the space between words

user_defined_dpi
string
''
Define custom dpi, use to fix **Warning: Invalid resolution 0 dpi. Using 70 instead.**

This list is incomplete.  As Tesseract.js passes parameters to the Tesseract engine, all parameters supported by the underlying version of Tesseract should also be supported by Tesseract.js.  (Note that parameters marked as “init only” in Tesseract documentation cannot be set by `setParameters` or `recognize`.)

**Examples:**

(async () => {
  await worker.setParameters({
    tessedit_char_whitelist: '0123456789',
  });
})

### worker.reinitialize(langs, oem, jobId): Promise

[](#workerreinitializelangs-oem-jobid-promise)
`worker.reinitialize()` re-initializes an existing Tesseract.js worker with different `langs` and `oem` arguments.

**Arguments:**

- `langs` a string to indicate the languages traineddata to download, multiple languages are specified using an array (['eng', 'chi_sim'])

- `oem` a enum to indicate the OCR Engine Mode you use

- `config` an object of customized options which are set prior to initialization (see details above)

- `jobId` Please see details above

Note: to switch from Tesseract LSTM (`oem` value `1`) to Tesseract Legacy (`oem` value `0`) using `worker.reinitialize()`, the worker must already contain the code required to run the Tesseract Legacy model.  Setting `legacyCore: true` and `legacyLang: true` in `createWorker` options ensures this is the case.

**Examples:**

await worker.reinitialize('eng', 1);

### worker.detect(image, jobId): Promise

[](#workerdetectimage-jobid-promise)
`worker.detect` does OSD (Orientation and Script Detection) to the image instead of OCR.

Note

Running `worker.detect` requires a worker with code and language data that supports Tesseract Legacy (this is not enabled by default).  If you want to run `worker.detect`, set `legacyCore` and `legacyLang` to `true` in the `createWorker` options.

**Arguments:**

- `image` see [Image Format](/naptha/tesseract.js/blob/master/docs/image-format.md) for more details.

- `jobId` Please see details above

**Examples:**

const { createWorker } = Tesseract;
(async () => {
  const worker = await createWorker('eng', 1, {legacyCore: true, legacyLang: true});
  const { data } = await worker.detect(image);
  console.log(data);
})();

### worker.terminate(jobId): Promise

[](#workerterminatejobid-promise)
`worker.terminate` terminates the worker and cleans up

(async () => {
  await worker.terminate();
})();

### Worker.writeText(path, text, jobId): Promise

[](#workerwritetextpath-text-jobid-promise)
`worker.writeText` writes a text file to the path specified in MEMFS, it is useful when you want to use some features that requires tesseract.js
to read file from file system.
**Arguments:**

- `path` text file path

- `text` content of the text file

- `jobId` Please see details above

**Examples:**

(async () => {
  await worker.writeText('tmp.txt', 'Hi\nTesseract.js\n');
})();

### worker.readText(path, jobId): Promise

[](#workerreadtextpath-jobid-promise)
`worker.readText` reads a text file to the path specified in MEMFS, it is useful when you want to check the content.

**Arguments:**

- `path` text file path

- `jobId` Please see details above

**Examples:**

(async () => {
  const { data } = await worker.readText('tmp.txt');
  console.log(data);
})();

### worker.removeFile(path, jobId): Promise

[](#workerremovefilepath-jobid-promise)
`worker.removeFile` removes a file in MEMFS, it is useful when you want to free the memory.

**Arguments:**

- `path` file path

- `jobId` Please see details above

**Examples:**

(async () => {
  await worker.removeFile('tmp.txt');
})();

### worker.FS(method, args, jobId): Promise

[](#workerfsmethod-args-jobid-promise)
`worker.FS` is a generic FS function to do anything you want, you can check [HERE](https://emscripten.org/docs/api_reference/Filesystem-API.html) for all functions.

**Arguments:**

- `method` method name

- `args` array of arguments to pass

- `jobId` Please see details above

**Examples:**

(async () => {
  await worker.FS('writeFile', ['tmp.txt', 'Hi\nTesseract.js\n']);
  // equal to:
  // await worker.writeText('tmp.txt', 'Hi\nTesseract.js\n');
})();

## createScheduler(): Scheduler

[](#createscheduler-scheduler)
`createScheduler` is a factory function to create a scheduler, a scheduler manages a job queue and workers to enable multiple workers to work together, it is useful when you want to speed up your performance.

**Examples:**

const { createScheduler } = Tesseract;
const scheduler = createScheduler();
### Scheduler

[](#scheduler)

### scheduler.addWorker(worker): string

[](#scheduleraddworkerworker-string)
`scheduler.addWorker` adds a worker into the worker pool inside scheduler, it is suggested to add one worker to only one scheduler.

**Arguments:**

- `worker` see Worker above

**Examples:**

const { createWorker, createScheduler } = Tesseract;
const scheduler = createScheduler();
const worker = await createWorker();
scheduler.addWorker(worker);

### scheduler.addJob(action, ...payload): Promise

[](#scheduleraddjobaction-payload-promise)
`scheduler.addJob` adds a job to the job queue and scheduler waits and finds an idle worker to take the job.

**Arguments:**

- `action` a string to indicate the action you want to do, right now only **recognize** and **detect** are supported

- `payload` a arbitrary number of args depending on the action you called.

**Examples:**

(async () => {
 const { data: { text } } = await scheduler.addJob('recognize', image, options);
 const { data } = await scheduler.addJob('detect', image);
})();

### scheduler.getQueueLen(): number

[](#schedulergetqueuelen-number)
`scheduler.getQueueLen()` returns the length of job queue.

### Scheduler.getNumWorkers(): number

[](#schedulergetnumworkers-number)
`Scheduler.getNumWorkers()` returns number of workers added into the scheduler

### scheduler.terminate(): Promise

[](#schedulerterminate-promise)
`scheduler.terminate()` terminates all workers added, useful to do quick clean up.

**Examples:**

(async () => {
  await scheduler.terminate();
})();

## setLogging(logging: boolean)

[](#setlogginglogging-boolean)
`setLogging` sets the logging flag, you can `setLogging(true)` to see detailed information, useful for debugging.

**Arguments:**

- `logging` boolean to define whether to see detailed logs, default: false

**Examples:**

const { setLogging } = Tesseract;
setLogging(true);

## recognize(image, langs, options): Promise

[](#recognizeimage-langs-options-promise)
Warning

This function is depreciated and should be replaced with `worker.recognize` (see above).

`recognize` works the same as `worker.recognize`, except that a new worker is created, loaded, and destroyed every time the function is called.

See [Tesseract.js](/naptha/tesseract.js/blob/master/src/Tesseract.js)

## detect(image, options): Promise

[](#detectimage-options-promise)
Warning

This function is depreciated and should be replaced with `worker.detect` (see above).

`detect` works the same as `worker.detect`, except that a new worker is created, loaded, and destroyed every time the function is called.

See [Tesseract.js](/naptha/tesseract.js/blob/master/src/Tesseract.js)

## PSM

[](#psm)
See [PSM.js](/naptha/tesseract.js/blob/master/src/constants/PSM.js)

## OEM

[](#oem)
See [OEM.js](/naptha/tesseract.js/blob/master/src/constants/OEM.js)