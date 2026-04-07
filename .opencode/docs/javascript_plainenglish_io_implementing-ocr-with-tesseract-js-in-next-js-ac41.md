# Implementing OCR with Tesseract.js in Next.js | by Faiz Noeris | JavaScript in Plain English

> Source: https://javascript.plainenglish.io/implementing-ocr-with-tesseract-js-in-next-js-ac4143ff5218
> Cached: 2026-04-07T21:07:48.909Z

---

# Implementing OCR with Tesseract.js in Next.js

[](https://medium.com/@m.faiznoeris?source=post_page---byline--ac4143ff5218---------------------------------------)[Faiz Noeris](https://medium.com/@m.faiznoeris?source=post_page---byline--ac4143ff5218---------------------------------------)4 min read·Nov 18, 2024[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fvote%2Fjavascript-in-plain-english%2Fac4143ff5218&operation=register&redirect=https%3A%2F%2Fjavascript.plainenglish.io%2Fimplementing-ocr-with-tesseract-js-in-next-js-ac4143ff5218&user=Faiz+Noeris&userId=f3df4fcd5346&source=---header_actions--ac4143ff5218---------------------clap_footer------------------)--

[](https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2F_%2Fbookmark%2Fp%2Fac4143ff5218&operation=register&redirect=https%3A%2F%2Fjavascript.plainenglish.io%2Fimplementing-ocr-with-tesseract-js-in-next-js-ac4143ff5218&source=---header_actions--ac4143ff5218---------------------bookmark_footer------------------)Listen

Share

Press enter or click to view image in full sizePhoto by [Nicolas Houdayer](https://unsplash.com/@ascalaphe?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com/?utm_source=medium&utm_medium=referral)*Optical Character Recognition* (OCR) is a powerful technology that allows us to convert images of text into machine-encoded text. In this article, we will explore how to set up a Next.js application and implement *OCR* using *Tesseract.js*, a JavaScript library that performs *OCR* directly in the browser.

## Setting Up Your Next.js Project

### 1. Create a New Next.js Project

First, we need to create a new Next.js application. Run the following command in your terminal:

npx create-next-app@latest next-ocr
cd next-ocr### 2. Install Required Packages

Once the project is created, we need to install `tesseract.js` to support text recognition from images:

yarn add tesseract.js### 3. Configure Next.js

To ensure Tesseract.js works properly, we need to add some configurations in `next.config.js`. Add the following code:

/** @type {import(&#x27;next&#x27;).NextConfig} */

const nextConfig = {
  future: { webpack5: true },
  webpack: config => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;## Implementing OCR with Tesseract.js

### 1. Create the OCR Component

Next, we will create a component to handle the OCR process. Create a new file named `OcrReader.tsx` inside the `app/components/` folder and add the following code:

&#x27;use client&#x27;;

import { useState } from &#x27;react&#x27;;
import { createWorker } from &#x27;tesseract.js&#x27;;

const OcrReader = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [ocrResult, setOcrResult] = useState<string>(&#x27;&#x27;);
  const [ocrStatus, setOcrStatus] = useState<string>(&#x27;&#x27;);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setOcrResult(&#x27;&#x27;); // Reset OCR result
      setOcrStatus(&#x27;&#x27;); // Reset status
    }
  };

  const readImageText = async () => {
    if (!selectedImage) return;

    setOcrStatus(&#x27;Processing...&#x27;);
    const worker = await createWorker(&#x27;eng&#x27;, 1, {
      logger: m => console.log(m), // Add logger here
    });

    try {
      const {
        data: { text },
      } = await worker.recognize(selectedImage);

      setOcrResult(text);
      setOcrStatus(&#x27;Completed&#x27;);
    } catch (error) {
      console.error(error);
      setOcrStatus(&#x27;Error occurred during processing.&#x27;);
    } finally {
      await worker.terminate();
    }
  };

  return (
    <div>
      <input type=&#x27;file&#x27; accept=&#x27;image/*&#x27; onChange={handleImageChange} />

      {selectedImage && (
        <img
          src={URL.createObjectURL(selectedImage)}
          alt=&#x27;Uploaded content&#x27;
          width={350}
          style={{ marginTop: 15 }}
        />
      )}

      <div style={{ marginTop: 15 }}>
        <button
          onClick={readImageText}
          style={{
            background: &#x27;#FFFFFF&#x27;,
            borderRadius: 7,
            color: &#x27;#000000&#x27;,
            padding: 5,
          }}
        >
          Submit
        </button>
      </div>

      <p style={{ marginTop: 20, fontWeight: 700 }}>Status:</p>
      <p>{ocrStatus}</p>
      <h3 style={{ marginTop: 10, fontWeight: 700 }}>Extracted Text:</h3>
      <p
        dangerouslySetInnerHTML={{
          // clear html tags and or unwanted characters
          __html: ocrResult
            .replace(/\n/g, &#x27;<br />&#x27;)
            .replace(/[=,—,-,+]/g, &#x27; &#x27;),
        }}
        style={{
          border: &#x27;1px solid white&#x27;,
          width: &#x27;fit-content&#x27;,
          padding: 10,
          marginTop: 10,
          borderRadius: 10,
        }}
      />
    </div>
  );
};

export default OcrReader;The initial UI for OCR with Tesseract.js in Next.js.### 2. Use the Component on the Home Page

Now we need to use the `OcrReader` component on our application&#x27;s home page. Open the file `app/page.tsx` and add the following code:

import OcrReader from &#x27;./components/OcrReader&#x27;;

const Home = () => {
  return (
    <div style={{ padding: 10}}>
      <h1 style={{ fontWeight: 800, fontSize: 20 }}>
        OCR with Tesseract.js in Next.js
      </h1>
      <br />
      <OcrReader />
    </div>
  );
};

export default Home;## Running Your Application

After completing all the steps, run your Next.js application with the command:

yarn devYour application should now be able to accept images and extract the text using *Tesseract.js*. Simply upload an image, click the “Submit” button, and see the results.

Demo of OCR with Tesseract.js in Next.js.## Conclusion

In this tutorial, we learned how to set up a Next.js project and implement *OCR* using *Tesseract.js*. By following these steps, you can create an application capable of recognizing text from images directly in the browser. This is a great starting point for exploring further capabilities of character recognition in your web applications.

## Get Faiz Noeris’s stories in your inbox

Join Medium for free to get updates from this writer.

SubscribeSubscribeRemember me for faster sign in

For further exploration of this amazing library, you can take a look at the documentation [here](https://github.com/naptha/tesseract.js/blob/master/docs/examples.md).

## In Plain English 🚀

*Thank you for being a part of the *[***In Plain English***](https://plainenglish.io/)* community! Before you go:*

- Be sure to **clap** and **follow** the writer ️👏**️️**
- Follow us: [**X**](https://x.com/inPlainEngHQ) | [**LinkedIn**](https://www.linkedin.com/company/inplainenglish/) | [**YouTube**](https://www.youtube.com/channel/UCtipWUghju290NWcn8jhyAw) | [**Discord**](https://discord.gg/in-plain-english-709094664682340443) | [**Newsletter**](https://newsletter.plainenglish.io/) | [**Podcast**](https://open.spotify.com/show/7qxylRWKhvZwMz2WuEoua0)
- [**Create a free AI-powered blog on Differ.**](https://differ.blog/)
- More content at [**PlainEnglish.io**](https://plainenglish.io/)