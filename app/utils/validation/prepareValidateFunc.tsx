import FormEmailItem from "./types/FormEmailItem";
import FormImageItem from "./types/FormImageItem";
import FormNumberItem from "./types/FormNumberItem";
import FormPasswordItem from "./types/FormPasswordItem";
import FormSchemaItem from "./types/FormSchemaItem";
import FormTextItem from "./types/FormTextItem";
import validateImageType from "./validateImageType";
import validateFileSize from "./validateFileSize";
import FormSelectItem from "./types/FormSelectItem";
import { isValid, isAfter, isBefore, addDays, subDays, isDate } from "date-fns"
import FormDateItem from "./types/FormDateItem";
import FormDBListItem from "./types/FormDBListItem";
import { db } from "../db.server";
import FormWysiwygItem from "./types/FormWysiwygItem";
import FormImagesItem from "./types/FormImagesItem";
import FormFileItem from "./types/FormFileItem";
import config from "~/config";
import validateFileType from "./validateFileType";
import FormFilesItem from "./types/FormFilesItem";
import FormTextMultiLangItem from "./types/FormTextMultiLangItem";
import FormIconItem from "./types/FormIconItem";
import FormDBMultiSelectItem from "./types/FormDBMultiSelectItem";

/**
 * Prepare validate func for given form schema item.
 * @param item Form schema item
 * @returns Validate function
 * */
 const prepareValidateFunc = (
  item: Omit<FormSchemaItem, "validate">,
) => {

  /**
   * Validates if value is valid according to field schema.
   * @param value Value to validate
   * @param isServer Enables strict validation (we can't count on UI, user can curl the request)
   * @returns True (if the value is valid) or error message
   */
  return async (
    value: any,
    isServer: boolean = false
  ): Promise<string | true> => {

    // if field value is empty, but it's not required -> it is valid
    if (!item.required && (["", undefined, null].includes(value) || (Array.isArray(value) && !value.length)))
      return true

    // global validation
    if (item.required && !value)
      return "common.validation.required";
    if (item.customValidate && item.customValidate(value) !== true)
      return item.customValidate(value);

    // common global validation for text types
    if (["text", "password", "email"].includes(item.type)) {
      const textItem = item as FormTextItem | FormEmailItem | FormPasswordItem;
      if ("minLength" in textItem && typeof textItem.minLength === "number" && value.length < textItem.minLength)
        return "common.validation.minLength|" + textItem.minLength;
      if ("maxLength" in textItem && typeof textItem.maxLength === "number" && value.length > textItem.maxLength)
        return "common.validation.maxLength|" + textItem.maxLength;
      if ("pattern" in textItem && !new RegExp(textItem.pattern as string).test(value))
        return "common.validation.pattern";
    }

    // email field validation
    if (item.type === 'email') {
      if (!new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value))
        return "common.validation.isEmail";
    }

    // number field validation
    if (item.type === 'number') {
      const numberItem = item as FormNumberItem;
      if (!new RegExp(/^[0-9]+$/).test(value))
        return "common.validation.isNumber";
      if ("min" in numberItem && typeof numberItem.min === "number" && parseInt(value) < numberItem.min)
        return "common.validation.min|" + numberItem.min;
      if ("max" in numberItem && typeof numberItem.max === "number" && parseInt(value) > numberItem.max)
        return "common.validation.max|" + numberItem.max;
      if ("minLength" in numberItem  && typeof numberItem.minLength === "number" && value.toString().length < numberItem.minLength)
        return "common.validation.minLength|" + numberItem.minLength;
      if ("maxLength" in numberItem && typeof numberItem.maxLength === "number" && value.toString().length > numberItem.maxLength)
        return "common.validation.maxLength|" + numberItem.maxLength;

    }

    // image validation
    // ==========================================================
    // Disclaimer: We validate image differently on the client and on the server, because they are different objects and we have to take care oof different scenarios.
    // The differences are:
    // #1
    // On the client, we are sure about image dimension and size, because cropper prepares the image before it's validate.
    // On the server, we can't be sure that the image is okay, because data can be malformed.

    if (item.type === "image") {
      const imageItem = item as FormImageItem;
      const maxSize = imageItem.maxSize || config.files.defaultMaxSize;

      if (imageItem.accept && !(await validateImageType(value, imageItem.accept)))
        return "common.validation.imageType|" + imageItem.accept.join(', ');
      if (maxSize && !validateFileSize(value, maxSize))
        return "common.validation.fileSize|" + maxSize / (1024 * 1024);;
    }

    // date validation
    // ==========================================================
    // We only check it server-side, because locally there's no way to pick invalid date. DatePicker does got job with limits.
    if (item.type === "date" && isServer) {
      const isValidDate = isValid(value);
      const dateItem = item as FormDateItem;

      if (!isValidDate)
        return "common.validation.date";
      // @ts-ignore We know that if isDate is true, so we can safely cast min to Date
      if (isDate(dateItem.min) && !isAfter(value, subDays(dateItem.min, 1)))
        return "common.validation.date";
      // @ts-ignore We know that if isDate is true, so we can safely cast max to Date
      if (isDate(dateItem.max) && !isBefore(value, addDays(dateItem.max, 1)))
        return "common.validation.date";

    }

    // dataList validation
    // ==========================================================
    // We only check it server-side, because locally there's no way to pick invalid item.
    if (item.type === "DBMultiSelect") {
      const DBMultiSelect = item as FormDBMultiSelectItem;
      if (!("model" in DBMultiSelect))
        return "common.validation.dataList";
      if (!value.length)
        return "common.validation.required";

      const chosenItems = value as any[];

      // We assume collection name is ok, but we still can assume that we typed something wrong in schema
      const collection = DBMultiSelect.model.toLowerCase();
      const possibleItems = db[collection]
        ? (await db[collection].findMany({
          select: {
            id: true
          }
        })).map(item => item.id)
        : [];

      console.log(chosenItems, possibleItems)

      // let's check if each item is really in the DB collection
      const allItemsAreValid = chosenItems
        .every(item =>
          possibleItems
            .some(possibleItem => possibleItem === item))

        if(!allItemsAreValid)
          return "common.validation.dataList";
    }

    // select validation
    // ==========================================================
    // We only check it server-side, because locally there's no way to pick invalid item.
    if (item.type === "select" && isServer) {
      const selectItem = item as FormSelectItem;
      if (!("options" in selectItem))
        return "common.validation.select";
      if (!selectItem.options.some(item => item.value === value))
        return "common.validation.select";
    }

    // icon validation
    // ==========================================================
    // We only check it server-side, because locally there's no way to pick invalid item.
    if (item.type === "icon" && isServer) {
      const iconItem = item as FormIconItem;
      if (!("options" in iconItem))
        return "common.validation.select";
      if (!iconItem.options.some(item => item.value === value))
        return "common.validation.select";
    }

    // wysiwyg validation
    // ==========================================================
    if (["wysiwyg"].includes(item.type)) {

      const textItem = item as FormWysiwygItem

      // we use simple regex in order to validate only text content as we don't care about the tags
      // however, we can't completely ignore images, so we treat them like a text with one character.
      // it helps with min/max length validation
      const textContent = value.replace(/<img[^>]*>/g, 'x').replace(/<[^>]*>/g, '');

      if ("minLength" in textItem && typeof textItem.minLength === "number" && textContent.length < textItem.minLength)
        return "common.validation.minLength|" + textItem.minLength;
      if ("maxLength" in textItem && typeof textItem.maxLength === "number" && textContent.length > textItem.maxLength)
        return "common.validation.maxLength|" + textItem.maxLength;
    }

    // images validation
    // ==========================================================
    // Disclaimer: We validate image differently on the client and on the server, because they are different objects and we have to take care oof different scenarios.
    // The differences are:
    // #1
    // On the client, we are sure about image dimension and size, because cropper prepares the image before it's validate.
    // On the server, we can't be sure that the image is okay, because data can be malformed.

    // #2
    // On the client, we have to check file size manually.
    // On the server, it's handled by multer, so we don't have to validate it again.

    // #3
    // On the server we check for elements length simply by checking array length
    // On the client it's still TO DO
    if (item.type === "images" && !isServer) {
      const imagesItem = item as FormImagesItem;

      // if there is accept option, check every image type
      if (imagesItem.accept && typeof value !== 'string') {
        const images = value as File[];
        const imagesValidation = images.map(image => validateImageType(image, imagesItem.accept!))
        const imagesValidationResult = await Promise.all(imagesValidation);
        if (!imagesValidationResult.every(result => result))
          return "common.validation.imagesType|" + imagesItem.accept.join(', ');
      }

      // if there is maxSize option, check every image size
      if (imagesItem.maxSize) {
        const images = value as File[];
        const imagesValidation = images.map(image => validateFileSize(image, imagesItem.maxSize!))
        const imagesValidationResult = await Promise.all(imagesValidation);
        if (!imagesValidationResult.every(result => result))
          return "common.validation.filesSize|" +  imagesItem.maxSize / (1024 * 1024) + "mb";
      }

      // if there is minLength or maxLength option, check files array length
      if (imagesItem.minLength || imagesItem.maxLength) {
        const images = value as File[];
        if (imagesItem.minLength && images.length < imagesItem.minLength)
          return "common.validation.minArrayLength|" + imagesItem.minLength;
        if (imagesItem.maxLength && images.length > imagesItem.maxLength)
          return "common.validation.maxArrayLength|" + imagesItem.maxLength;
      }

    }

    // file validation
    // ==========================================================
    if(value && item.type === "file") {
      const fileItem = item as FormFileItem;
      const maxSize = fileItem.maxSize || config.files.defaultMaxSize;

      if (!validateFileSize(value, maxSize))
        return "common.validation.fileSize|" + maxSize / (1024 * 1024);

      if (fileItem.accept && !validateFileType(value, fileItem.accept))
        return "common.validation.fileType|" + fileItem.accept.join(', ')
    }

    // files validation
    // ==========================================================
    if(value && item.type === "files") {
      const fileItem = item as FormFilesItem;

      if (fileItem.required && !value.length)
        return "common.validation.required";
    }

    // text multilang validation
    // ==========================================================
    // We only check it server-side, because locally the field itself doesn't control lang inputs.
    // At server-side, we receive an object with lang keys and values, so we can actually validate it.
    if (item.type === "textMultiLang" && isServer) {
      const textItem = item as FormTextMultiLangItem;
      const languages = config.supportedLanguages;
      if(textItem.required && languages.some(lang => !value[lang]))
        return "common.validation.multiLangRequired";
    }

    // wysiwyg multilang validation
    // ==========================================================
    // We only check it server-side, because locally the field itself doesn't control lang inputs.
    // At server-side, we receive an object with lang keys and values, so we can actually validate it.
    if (item.type === "wysiwygMultiLang" && isServer) {
      const fileItem = item as FormTextMultiLangItem;
      const languages = config.supportedLanguages;
      const atLeastOneEmpty = languages.some(lang => {
        const textContent = value[lang].replace(/<img[^>]*>/g, 'x').replace(/<[^>]*>/g, '');
        return !textContent.length;
      });
      if(fileItem.required && atLeastOneEmpty)
        return "common.validation.multiLangRequired";
    }

    return true
  }
}

export default prepareValidateFunc;
