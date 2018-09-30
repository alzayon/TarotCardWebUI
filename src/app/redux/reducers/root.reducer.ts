import { IGeneralState } from "./general.reducer";
import { ICardState } from "./card.reducer";
import { ICategoryState } from "./category.reducer";
import { ISpreadState } from "./spread.reducer";

export interface RootState {
    generalState: IGeneralState;
    cardState: ICardState;
    categoryState: ICategoryState;
    spreadState: ISpreadState;
}