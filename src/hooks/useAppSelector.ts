import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";


export const useAppSelector = useSelector.withTypes<RootState>()