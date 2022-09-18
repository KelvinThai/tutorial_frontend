import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppThunkDispatch } from './store'

export const useAppDispatch = () => useDispatch<AppThunkDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector