import clsx from "clsx";
import { useRef, useState } from "react";
import { FaCamera, FaCheck } from "react-icons/fa";
import type { CropArea } from "~/components/features/ImageCropper";
import ImageCropper from "~/components/features/ImageCropper";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import extractError from "~/utils/validation/extractError";

type Props = {
  name: string;
  label?: string;
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validate?: (value: any, isServer: boolean) => Promise<true | string>;
  defaultValue?: string;
  accept?: ("image/*" | "image/jpeg" | "image/png" | "image/webp")[]
  size?: {
    aspectRatio?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    width?: number;
    height?: number;
  },
  required?: boolean;
}

export default function ImageField({
  name,
  label,
  className,
  onChange,
  validate,
  accept,
  size,
  required,
  defaultValue
}: Props) {

  const { t } = useContext(GlobalContext);

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState<Blob | null>(null);
  const [imagePreview, setImagePreview] = useState<string | "">(defaultValue ? `/uploads/${defaultValue}` : "");
  const [showCropper, setShowCropper] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [shouldRemove, setShouldRemove] = useState<Boolean>(false);
  const [cropArea, setCropArea] = useState<CropArea>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // handle file change
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    const validation = (validate) ? await validate(file, false) : true;

    if (validation !== true) {
      setIsError(true);
      setErrorMessage(t(...extractError(validation)));
    } else {

      // if there is no size settings, we do not need to crop
      // so just show image preview
      if (!size) {
        const reader = new FileReader();
        reader.onload = () => {
          setImagePreview(reader.result as string);
        }
        reader.readAsDataURL(file as any);
      } else {
        setImage(file);
        setIsError(false);
        setErrorMessage("");
        if (file) setShowCropper(true);
        setShouldRemove(false);
      }
    }

    if(onChange) onChange(e);

  }

  // handle cropped image
  const handleCrop = ({ path, cropArea }: { path: string, cropArea: CropArea }) => {
    setShowCropper(false);
    setImagePreview(path);
    setCropArea(cropArea);
  }

  return (
    <div className={clsx("max-w-15 my-6", className)}>
      { image && showCropper && (
        <ImageCropper
          inputImage={image}
          onAccept={handleCrop}
          {...size}
        />
      )}
      <label
        className="block mb-2"
        htmlFor={name}
      >
        { label && (
          <span className="text-sm font-semibold block mb-2">
            {t(label)}
            { required && <span className="text-red-500">*</span> }
          </span>
        )}
        <div className="relative">
          <div className={
            clsx(
              "cursor-pointer my-3 w-52 border-2 border-light-border dark:border-medium-darker rounded-lg dark:border-medium-darker bg-light dark:bg-dark outline-none transition-colors overflow-hidden",
              "focus:border-primary",
              isError && "border-red-500",
            )
          }>
            { shouldRemove && (
              <input
                className="hidden"
                type="text"
                name={`${name}_shouldRemove`}
                value="true"
                readOnly
              />
            )}
            <input
              ref={imageInputRef}
              className="hidden"
              type="file"
              name={name}
              id={name}
              onChange={handleChange}
              accept={accept ? accept.join(',') : "image/*"}
            />
            <input
              className="hidden"
              type="number"
              name={`${name}_cropArea_x`}
              value={cropArea.x}
              readOnly
            />
            <input
              className="hidden"
              type="number"
              name={`${name}_cropArea_y`}
              value={cropArea.y}
              readOnly
            />
            <input
              className="hidden"
              type="number"
              name={`${name}_cropArea_width`}
              value={cropArea.width}
              readOnly
            />
            <input
              className="hidden"
              type="number"
              name={`${name}_cropArea_height`}
              value={cropArea.height}
              readOnly
            />
            { !imagePreview && (
              <FaCamera
                className="text-center w-full mx-auto text-4xl my-8"
              />
            )}
            { imagePreview && 
              (
                <>
                  <img src={imagePreview} className="rounded-lg w-full h-full object-cover absolute brightness-50" />
                  <div className="flex font-bold text-light standard-content mx-auto gap-2 justify-center items-center my-8 relative">
                    <FaCheck className="text-green-500 text-2xl" />
                    {t("common.chosen")}
                  </div>
                </>
              )
            }

          </div>
          { /*!required && (
            <Button
              className="mx-auto"
              type="button"
              icon={FaTimes}
              size="sm"
              onClick={handleRemove}
            >
              {t("common.remove")}
            </Button>
          )*/}
        </div>
      </label>

      { isError && (
        <span className="text-red-500 text-sm px-2 block">
          {errorMessage}
        </span>
      )}
    </div>
  );
}

