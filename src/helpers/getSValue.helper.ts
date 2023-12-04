import {MINUTES_PER_DAY} from "../constants";

export const getSValue = ({v, t, p}: { v: number, t: number, p: number }) => Math.ceil((v * (t * MINUTES_PER_DAY)) / p)