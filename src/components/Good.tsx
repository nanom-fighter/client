import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@src/app/store"
import { increment, incrementByAmount } from "@src/features/test/test.slice"

const Good = () => {
  const selector = useSelector((state: RootState) => state.test.value)
  const dispatch = useDispatch()

  const add = () => {
    dispatch(increment())
  }

  const addByNumber = () => {
    dispatch(incrementByAmount(5))
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "1000px",
        height: "100VH",
        backgroundColor: "lightgrey",
      }}
    >
      <div>Counter : {selector}</div>
      <button onClick={add}>increase</button>
      <button onClick={addByNumber}>increat 5</button>
      <button>show</button>
    </div>
  )
}

export default Good
