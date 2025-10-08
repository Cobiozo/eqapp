import { useEffect, useMemo, useRef, useState } from "react";
import Cropper from "react-cropper";
import Button from "../ui/Button";
import Fog from "../ui/Fog";
import { ViewMode } from "cropperjs/types/index.d";
import { FaCheck, FaTimes } from "react-icons/fa";
import { GlobalContext } from "~/root";
import { useContext } from "react";
import PageHeader from "../ui/PageHeader";

type Props = {
  inputImage: Blob;
  aspectRatio?: number;
  onCancel?: () => void;
  onAccept?: ({ path, cropArea }: { path: string, cropArea: CropArea }) => void;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
}

export type CropArea = {
  x: number;
  y: number;
  width: number;
  height: number;
}

const defaultConfig = {
  maxWidth: 1000,
  maxHeight: 1000,
}

export default function ImageCropper({
  width,
  height,
  inputImage,
  aspectRatio,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  onCancel,
  onAccept
}: Props): JSX.Element {
  const { t } = useContext(GlobalContext);
  const [image, setImage] = useState<string | ''>('');
  const cropperRef = useRef<HTMLImageElement>(null);
  const [cropperInstance, setCropperInstance] = useState<Cropper | null>(null);

  // determine if fixed size prop are set
  const isFixedSize = useMemo(() => !!(width && height), [width, height]);

  // On startup -> convert image file to dataUrl (cropper doesn't work on files)
  useEffect(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as any);
    };
    reader.readAsDataURL(inputImage);
  }, [inputImage])

  // Prepare final result
  const prepareFinalResult = (cropper: any): Promise<{ path: string, cropArea: CropArea }> => {
    return new Promise((resolve, reject) => {
      try {
        const image = new Image();

        // user can scale the image (which is good), but it scales the crop area as well
        // while zooming, it seems the crop are is stable, but it's not.
        // for instance, if original crop area size is 300x300 and we zoom a little...
        // ...the rectangle will still look the same, but in fact its real size will be bigger.
        // it's bad, because it confuses user (the final result is bigger or smaller than it seemed)...
        // ...but also breaks size restriction of the cropper.
        // therefore we need to scale the canvas result to original size after all crop are done.
        // and by the "original size" we mean size of the cropper that user sees.

        image.onload = () => {

          // get the real size of the image
          const realWidth = image.naturalWidth;
          const realHeight = image.naturalHeight;

          // get the cropped area real size
          const desiredW = cropper.cropBoxData.width;
          const desiredH = cropper.cropBoxData.height;

          // if image is not desired size, adjust it
          if (realWidth !== desiredW || realHeight !== desiredH) {

            // create new version image with new size
            const canvas = document.createElement('canvas');
            canvas.width = desiredW;
            canvas.height = desiredH;

            const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            ctx.drawImage(image, 0, 0, desiredW, desiredH);

            // return image preview and crop area details
            const cropData = cropperInstance?.getData() as Cropper.Data;
            const cropArea: CropArea = {
              x: cropData?.x,
              y: cropData?.y,
              width: cropData?.width,
              height: cropData?.height
            }

            resolve({
              path: canvas.toDataURL(),
              cropArea,
            });
          }
          // if image is desired size, just return it
          else {
            const cropData = cropperInstance?.getData() as Cropper.Data;
            const cropArea: CropArea = {
              x: cropData?.x,
              y: cropData?.y,
              width: cropData?.width,
              height: cropData?.height
            }
            resolve({
              path: cropper.getCroppedCanvas().toDataURL('image/jpeg'),
              cropArea,
            });
          }
        }

        image.src = cropper.getCroppedCanvas().toDataURL('image/jpeg');
      } catch (e) {
        reject(e);
      }
    });
  }

  const handleConfirm = async () => {
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;

    const finalResult = await prepareFinalResult(cropper);
    if (finalResult) {
      if (onAccept) {
        onAccept(finalResult);
      }
    }
  };

  // Function that returns different cropper options
  // they depend if the size is fixed or not
  const variantOptions = useMemo(() => {
    if (isFixedSize)
      return {
        minCropBoxWidth: width,
        minCropBoxHeight: height,
        cropBoxResizable: false,
        viewMode: 3 as ViewMode,
        aspectRatio,
        style: {
          width: width,
          height: height
        }
      }

    return {
      minCropBoxWidth: minWidth || 0,
      minCropBoxHeight: minHeight || 0,
      viewMode: 2 as ViewMode,
      aspectRatio: aspectRatio,
      style: {
        width: maxWidth || defaultConfig.maxWidth,
        height: maxHeight || defaultConfig.maxHeight
      }
    }

  }, [width, height, minHeight, maxHeight, minWidth, maxWidth, aspectRatio])

  return (
    <Fog>
      <PageHeader className="text-center">
        {t("cropper.title")}
      </PageHeader>
      <div className="max-w-4xl">
        { image && (
          <Cropper
            ref={cropperRef}
            className="max-w-5xl"
            src={image}
            autoCrop={true}
            onInitialized={(instance) => setCropperInstance(instance)}
            {...variantOptions}
          />
        )}
        <div className="flex justify-end my-6">
          <Button
            size="sm"
            variant="primary"
            type="button"
            onClick={handleConfirm}
          >
            <FaCheck
              className="mr-2"
            />
            {t('cropper.confirm')}
          </Button>
          { onCancel && (
            <Button
              className="ml-2"
              size="sm"
              type="button"
              variant="primary"
              onClick={onCancel}
            >
              <FaTimes
                name="times"
                className="mr-2"
              />
              {t('cropper.cancel')}
            </Button>
          )}
        </div>
      </div>
    </Fog>
  );
}
