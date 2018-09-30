import { Store } from "@ngrx/store";
import { RootState } from "../../redux/reducers/root.reducer";

export abstract class CardBaseComponent {
    constructor(protected store: Store<RootState>) {
    }
}