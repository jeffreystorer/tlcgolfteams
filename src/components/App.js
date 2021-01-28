import * as React from "react"
import { ReactPhotoCollage } from "react-photo-collage"
import cat from "../lineup.jpg"
import ButtonDownloadScreenshot from "./ButtonDownloadScreenshot"
import "../styles/App.css"

export default function App() {
  let lineupTitle = "Setting Div Dimensions Left"
  const [zoom, setZoom] = React.useState()
  const img = new Image()
  img.src = cat
  let factor = 2.0
  let width = img.width * 2 * factor
  let widthPx = width.toString() + "px"
  let height = img.height * factor
  let heightPx = height.toString() + "px"
  let imgDimensions = { width: width, height: height * 2 }
  const setting = {
    width: widthPx,
    height: [heightPx, heightPx],
    layout: [2, 2],
    photos: [{ src: cat }, { src: cat }, { src: cat }, { src: cat }],
    showNumOfRemainingPhotos: false,
  }
  let styleWidth = imgDimensions.width + "px"
  let styleHeight = imgDimensions.height + "px"

  window.addEventListener("resize", getSizes, false)

  function getSizes() {
    let body = document.body
    let currentZoom = body.clientWidth + "px X " + body.clientHeight + "px"
    setZoom(currentZoom)
  }

  return (
    <>
      <p className="center">Zoom: {zoom}</p>
      <p className="center">
        2x2 Image--width: {imgDimensions.width} height: {imgDimensions.height}
      </p>
      <bt></bt>
      <div className="center">
        <ButtonDownloadScreenshot
          dimensions={imgDimensions}
          title={lineupTitle}
          element="div-collage"
          format="PDF"
        />
        <br></br>
        <br></br>

        <ButtonDownloadScreenshot
          dimensions={imgDimensions}
          title={lineupTitle}
          element="div-collage"
          format="JPEG"
        />
        <br></br>
        <br></br>

        <ButtonDownloadScreenshot
          dimensions={imgDimensions}
          title={lineupTitle}
          element="div-collage"
          format="PNG"
        />

        <br></br>
        <br></br>
      </div>
      <br></br>
      <div
        id="div-collage"
        className="background-white center"
        style={{
          width: { styleWidth },
          height: { styleHeight },
        }}
      >
        <ReactPhotoCollage {...setting} />
      </div>
    </>
  )
}
