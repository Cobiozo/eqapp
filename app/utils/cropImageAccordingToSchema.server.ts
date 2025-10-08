import cropImage from "./cropImage.server";
import FormImageItem from "./validation/types/FormImageItem";

export default async function cropImageAccordingToSchema(
  fieldName: string,
  data: Record<string, any>,
  schemaDetails: FormImageItem
) {
  const fileName = data[fieldName].name;
  const cropArea = {
    x: data[`${fieldName}_cropArea_x`],
    y: data[`${fieldName}_cropArea_y`],
    width: data[`${fieldName}_cropArea_width`],
    height: data[`${fieldName}_cropArea_height`],
  }

  const desiredW = schemaDetails.size?.width || 100;
  const desiredH = schemaDetails.size?.height || 100;
  return await cropImage(
    fileName,
    cropArea,
    desiredW,
    desiredH,
  );
}