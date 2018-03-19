import { IGeneralState } from "./general_reducer";
import { ICardState } from "./card_reducer";

export interface RootState {
    generalState: IGeneralState,
    cardState: ICardState
}