import BoardsContainer from "../components/BoardsContainer"
import MainBase from "../components/layout/MainBase"

const BoardsPage = () => {
  return (
    <MainBase>
      <h1>Seus quadros</h1>

      <BoardsContainer />
    </MainBase>
  )
}

export default BoardsPage