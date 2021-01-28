import React from "react"
import domtoimage from "dom-to-image"
import { saveAs } from "../functions/fileSaver.js"
import { jsPDF } from "jspdf"

const ButtonDownLoadScreenshot = ({ dimensions, title, element, format }) => {
  const PAPER_DIMENSIONS = {
    width: 8.5,
    height: 11,
  }

  const PAPER_RATIO = PAPER_DIMENSIONS.width / PAPER_DIMENSIONS.height
  const imageDimensions = (dimensions) => {
    // If the image is in portrait and the full height would skew
    // the image ratio, we scale the image dimensions.
    const imageRatio = dimensions.width / dimensions.height
    if (imageRatio > PAPER_RATIO) {
      const imageScaleFactor =
        (PAPER_RATIO * dimensions.height) / dimensions.width

      const scaledImageHeight = PAPER_DIMENSIONS.height * imageScaleFactor

      return {
        height: scaledImageHeight,
        width: scaledImageHeight * imageRatio,
      }
    }

    // The full height can be used without skewing the image ratio.
    return {
      width: PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
      height: PAPER_DIMENSIONS.height,
    }
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11],
  })
  function handleClick() {
    switch (format) {
      case "PNG":
        createPNG()
        break
      case "JPEG":
        createJPEG()
        break
      case "PDF":
        createPDF()
        break
      default:
        break
    }
  }

  function createJPEG() {
    domtoimage
      .toJpeg(document.getElementById(element), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a")
        link.download = title + ".jpeg"
        link.href = dataUrl
        link.click()
      })
  }

  function createPNG() {
    domtoimage.toBlob(document.getElementById(element)).then(function (blob) {
      saveAs(blob, title + ".png")
    })
  }

  function createPDF() {
    domtoimage
      .toJpeg(document.getElementById(element), { quality: 1.0 })
      .then(function (dataUrl) {
        let x, y, w, h
        x = (PAPER_DIMENSIONS.width - imageDimensions(dimensions).width) / 2
        y = (PAPER_DIMENSIONS.height - imageDimensions(dimensions).height) / 2
        w = imageDimensions(dimensions).width
        h = imageDimensions(dimensions).height
        console.clear()
        console.log("😊😊 x", x)
        console.log("😊😊 y", y)
        console.log("😊😊 w", w)
        console.log("😊😊 h", h)
        doc.addImage(dataUrl, "JPEG", x, y, w, h)
        doc.setProperties({ title: title })
        doc.save(title + ".pdf")
      })
  }
  return (
    <button className="center" onClick={handleClick}>
      Download Screenshot {format}
    </button>
  )
}
export default ButtonDownLoadScreenshot
