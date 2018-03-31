import { IGeneralState } from "./general.reducer";
import { ICardState } from "./card.reducer";
import { ICategoryState } from "./category.reducer";

export interface RootState {
    generalState: IGeneralState,
    cardState: ICardState,
    categoryState: ICategoryState 
}