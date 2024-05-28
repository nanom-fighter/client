import { configureStore } from "@reduxjs/toolkit"
import testReducer from "@src/features/test/test.slice"
import { TypedUseSelectorHook, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {
    test: testReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
