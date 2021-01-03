import React from "react"
import TeamTable from "./TeamTable"
import { v4 as uuidv4 } from "uuid"
import ButtonDownloadScreenShot from "./ButtonDownloadScreenshot"
import createLineupTablePlayersArray from "../functions/createLineupTablePlayersArray"

export default function LineupTable({ lineup }) {
  let playersArray = createLineupTablePlayersArray(
    lineup.game,
    lineup.games,
    lineup.allPlayers
  )
  let teamMembers = []

  function updateTeamTables() {
    let teamTables = lineup.teamTables
    for (let i = 0; i < lineup.teeTimeCount; i++) {
      let aTeamName = "team" + i
      try {
        let aPlayerCount = teamTables[aTeamName].length
        for (let j = 0; j < aPlayerCount; j++) {
          let aTeamMemberId = teamTables[aTeamName][j].id
          let aPlayerObj = playersArray.find((obj) => obj.id === aTeamMemberId)
          teamTables[aTeamName][j].playerName = aPlayerObj.playerName
        }
      } catch (error) {
        console.log("error updating Team Tables")
      }
    }
    return teamTables
  }

  let teamTables = updateTeamTables()

  let TeamTables = []
  function generateTeamTables() {
    for (var i = 0; i < lineup.teeTimeCount; i++) {
      let teamName = "team" + i
      teamMembers = teamTables[teamName]
      TeamTables[i] = (
        <TeamTable
          key={uuidv4()}
          teamNumber={i}
          teamTables={teamTables}
          teamMembers={teamMembers}
        />
      )
    }
    return TeamTables
  }

  return (
    <>
      <div id="lineup-page" className="center background-white">
        <table id="lineup-table" className="background-white">
          <div id="lineup-table-div" className="background-white">
            <thead className="lineup-table-head background-white">
              <tr className="lineup-table-head background-white">
                <td className="lineup-table-head background-white">
                  {lineup.game +
                    ", " +
                    lineup.playingDate +
                    " at " +
                    lineup.course.toUpperCase()}
                </td>
              </tr>
              <tr>
                <td></td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="background-white">{generateTeamTables()}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td className="center text-area-cell background-white">
                  <textarea
                    id="lineup-textarea"
                    // @ts-ignore
                    rows="8"
                    cols="39"
                    value={lineup.textAreaValue}
                  ></textarea>
                </td>
              </tr>
            </tfoot>
          </div>
        </table>
        <br></br>
        <br></br>
        <ButtonDownloadScreenShot
          game={lineup.game}
          course={lineup.course.toUpperCase()}
          element="lineup-table-div"
          format="JPEG"
          page="Lineup"
        />
      </div>
    </>
  )
}
