# tesseract.js/docs/image-format.md at master · naptha/tesseract.js · GitHub

> Source: https://github.com/naptha/tesseract.js/blob/master/docs/image-format.md
> Cached: 2026-04-07T21:08:29.404Z

---

# Image Format

[](#image-format)
The main Tesseract.js functions (ex. recognize, detect) take an `image` parameter.  The image formats and data types supported are listed below.

Support Image Formats: **bmp, jpg, png, pbm, webp, gif [non-animated]**.

For browser and Node, supported data types are:

- string with base64 encoded image (fits `data:image\/([a-zA-Z]*);base64,([^"]*)` regexp)

- buffer

For browser only, supported data types are:

- `File` or `Blob` object

- `img` or `canvas` element

For Node only, supported data types are:

- string containing a path to local image

Note: images must be a supported image format **and** a supported data type.  For example, a buffer containing a png image is supported.  A buffer containing raw pixel data is not supported.