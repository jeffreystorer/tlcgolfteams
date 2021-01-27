import React from "react"
import domtoimage from "dom-to-image"
import { saveAs } from "../functions/fileSaver.js"
import { jsPDF } from "jspdf"

const ButtonDownLoadScreenshot = ({
  dimensions,
  title,
  game,
  course,
  element,
  format,
  page,
}) => {
  const PAPER_DIMENSIONS = {
    width: 8.5,
    height: 11,
  }

  const PAPER_RATIO = PAPER_DIMENSIONS.width / PAPER_DIMENSIONS.height
  console.log("😊😊 dimensions", dimensions)
  const imageDimensions = (dimensions) => {
    console.log("😊😊 dimensions.width", dimensions.width)
    console.log("😊😊 dimensions.height", dimensions.height)
    const isLandscapeImage = dimensions.width >= dimensions.height

    // If the image is in landscape, the full width of A4 is used.
    if (isLandscapeImage) {
      return {
        width: PAPER_DIMENSIONS.width,
        height: PAPER_DIMENSIONS.width / (dimensions.width / dimensions.height),
      }
    }

    // If the image is in portrait and the full height of A4 would skew
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

    // The full height of A4 can be used without skewing the image ratio.
    return {
      width: PAPER_DIMENSIONS.height / (dimensions.height / dimensions.width),
      height: PAPER_DIMENSIONS.height,
    }
  }

  console.log("😊😊 imageDimensions", imageDimensions)

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "in",
    format: [8.5, 11],
  })
  function handleClick() {
    let fileName
    if (page === "Teams") {
      fileName = "Teams for " + title
    } else {
      fileName = "Lineup Collage"
    }
    switch (format) {
      case "PNG":
        domtoimage
          .toBlob(document.getElementById(element))
          .then(function (blob) {
            saveAs(blob, fileName + ".png")
          })
        break
      case "JPEG":
        domtoimage
          .toJpeg(document.getElementById(element), { quality: 0.95 })
          .then(function (dataUrl) {
            var link = document.createElement("a")
            link.download = title + ".jpeg"
            link.href = dataUrl
            link.click()
          })
        break
      case "PDF":
        domtoimage
          .toJpeg(document.getElementById(element), { quality: 0.95 })
          .then(function (dataUrl) {
            doc.addImage(
              dataUrl,
              "JPEG",
              (PAPER_DIMENSIONS.width - imageDimensions.width) / 2,
              (PAPER_DIMENSIONS.height - imageDimensions.height) / 2,
              imageDimensions.width,
              imageDimensions.height
            )
            doc.setProperties({ title: title })
            doc.save(title + ".pdf")
          })
        break
      default:
        break
    }
  }
  return (
    <button className="center" onClick={handleClick}>
      Download Screenshot {format}
    </button>
  )
}
export default ButtonDownLoadScreenshot
