import { Store } from "@ngrx/store";
import { RootState } from "../../redux/reducers/root.reducer";

export abstract class SpreadBaseComponent {
    constructor(protected store: Store<RootState>) {}
}