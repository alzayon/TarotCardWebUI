import { ReadingListComponent } from "../reading_list.component";
import { ReadingAddComponent }  from "../reading_add.component";
import { ReadingEditComponent }  from "../reading_edit.component";
import { ReadingViewComponent }  from "../reading_view.component";

export const readingRoutes = [
    { path: "list", component: ReadingListComponent },
    { path: "add", component: ReadingAddComponent },
    { path: "edit", component: ReadingEditComponent },
    { path: "view", component: ReadingViewComponent }
  ];