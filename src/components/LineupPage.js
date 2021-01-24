import React from "react"
import { useList } from "react-firebase-hooks/database"
import LineupDataService from "../services/LineupService"
import LineupTable from "./LineupTable"

export default function LineupPage() {
  const [Lineups, loading, error] = useList(LineupDataService.getAll())
  let title, lineup

  if (!loading && !error) {
    let aLineup = Lineups[0]
    let savedLineup = aLineup.val()
    lineup = savedLineup.lineup
    title = savedLineup.title
  }

  if (!loading && !error) {
    return (
      <>
        <LineupTable lineupTitle={title} lineup={lineup} />
      </>
    )
  } else {
    return null
  }
}
