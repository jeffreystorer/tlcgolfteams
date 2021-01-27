import * as React from "react"
import { ReactPhotoCollage } from "react-photo-collage"
import cat from "../lineup.jpg"
import ButtonDownloadScreenshot from "./ButtonDownloadScreenshot"
import "../styles/App.css"

export default function App() {
  const img = new Image()
  img.src = cat
  let factor = 1.5
  let width = img.width * 2 * factor
  let widthPx = width.toString() + "px"
  let height = img.height * factor
  let heightPx = height.toString() + "px"
  let imgDimensions = { width: width, height: height * 2 }
  /*  img.onload = function () {
    alert(this.width + "x" + this.height)
  } */
  let lineupTitle = "Two by Two"
  let lineup = {
    game: "Current Game",
    course: "dc",
  }
  const setting = {
    width: widthPx,
    height: [heightPx, heightPx],
    layout: [2, 2],
    photos: [{ src: cat }, { src: cat }, { src: cat }, { src: cat }],
    showNumOfRemainingPhotos: false,
  }

  return (
    <>
      <div id="div-collage" className="background-white center">
        <ReactPhotoCollage {...setting} />
      </div>
      <div className="center">
        <br></br>
        <br></br>

        <ButtonDownloadScreenshot
          dimensions={imgDimensions}
          title={lineupTitle}
          game={lineup.game}
          course={lineup.course.toUpperCase()}
          element="div-collage"
          format="PDF"
          page="Lineup2x2"
        />
        <br></br>
        <br></br>

        <ButtonDownloadScreenshot
          dimensions={imgDimensions}
          title={lineupTitle}
          game={lineup.game}
          course={lineup.course.toUpperCase()}
          element="div-collage"
          format="JPEG"
          page="Lineup2x2"
        />
        <br></br>
        <br></br>

        <ButtonDownloadScreenshot
          dimensions={imgDimensions}
          title={lineupTitle}
          game={lineup.game}
          course={lineup.course.toUpperCase()}
          element="div-collage"
          format="PNG"
          page="Lineup2x2"
        />
      </div>
    </>
  )
}
