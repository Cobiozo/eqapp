import clsx from "clsx";
import { useContext, useRef, useState } from "react";
import ReactQuill from "~/utils/reactQuill.client";
import { ClientOnly } from "remix-utils";
import dataURLtoBlob from "~/utils/dataURLtoBlob";
import adjustImageSize from "~/utils/adjustImageSize";
import config from "~/config";
import { GlobalContext } from "~/root";

type Props = {
  name: string;
  validate?: (value: string) => Promise<string | true>;
  label?: string;
  required?: boolean;
  className?: string;
  defaultValue?: string;
  minLength?: number;
  maxLength?: number;
  modules: any;
  formats: any;
  editorClassName?: string;
}

const defaultModules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
}
const defaultFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
]

export default function WysiwygField({
  name,
  label,
  validate,
  className,
  defaultValue,
  modules = defaultModules,
  formats = defaultFormats,
  required,
  editorClassName
}: Props) {

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [content, setContent] = useState(defaultValue || "");
  const fileInput = useRef<HTMLInputElement>(null);
  const { t } = useContext(GlobalContext);

  const handleChange = async (value: string) => {
    const validation = (validate) ? await validate(value) : true;

    if (validation !== true) {
      setIsError(true);
      setErrorMessage(validation);
    } else {
      setIsError(false);
      setErrorMessage("");
    }

    // content state is used as the field value in the form in order to be later send to the server
    // we want to keep the html content, but we have to deal with images first
    // Quill saves images as data-urls and simply puts them in the content, we need to deal it somehow, we want to store them in the uploads folder as standalone files.
    // What can we do?

    // the idea is simple:
    // 1. we search for all the data-urls in the content.
    // 2. we convert them to blobs and save them to file field (we want them to be send to the server as well)
    // 3. we replace the data-urls with the mocked urls, that can be later used by the server to replace it with server-generated urls.

    // Thanks to that, we send to the server content without big data-urls, but still the images (as blobs) are send to the server as well. Then, of course, server has to handle the rest. It should store these images and update post content with their urls before saving a post to the database.

    const images = value.match(/data:image\/[^;]+;base64,([^"]+)/g);
    if (images) {

      // prepare content variable
      // we start with current content, but we will eventually replace the data-urls with mocked urls
      let parsedValue = value;

      // create blobs array from found data-urls
      // also -> replace the data-urls with the mocked urls that can be later used by the server to determine where to put each real image url
      const blobs = [];
      for(const image of images) {
        const { maxWidth, maxHeight } = config.wysiwyg;
        const adjustedImage = await adjustImageSize(image, maxWidth, maxHeight);
        const blob = await dataURLtoBlob(adjustedImage);
        blobs.push(blob);
        parsedValue = parsedValue.replace(image, `mocked`);
      }

      // loop through these blobs and save them to a file field
      const dT = new DataTransfer();
      let index = 0;
      for(const blob of blobs) {
        dT.items.add(new File([blob], `${index}.jpg`));
        index++;
      }

      /* @ts-ignore: fileInput points to element created by us. It simply has to exist and have a current property */
      fileInput.current.files = dT.files;

      return setContent(parsedValue);
    }

    setContent(value);
  }

  return (
    <div className={clsx("my-6 max-w-sm w-full", className)}>
      <span className="text-sm font-semibold block mb-2">
        { label && t(label)}
        { label && required && <span className="text-red-500">*</span> }
      </span>
      <input type="hidden" name={name} value={content} />
      <input className="hidden" multiple ref={fileInput} type="file" name={name + "_files"} />
      <div className="relative w-full max-w-3xl">
        <ClientOnly>
          {() => (
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              onChange={handleChange}
              defaultValue={defaultValue || ""}
              className={clsx("w-full min-w-64 bg-white dark:bg-dark", editorClassName)}
            />
          )}
        </ClientOnly>
        { isError && (
          <span className="text-red-500 text-sm px-2 pt-2 block">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}

