import { Routes } from "@angular/router";

export const primaryRoutes: Routes = [
    { path: "", redirectTo: "/card/list", pathMatch: "full" },
    { path: "card", loadChildren: "../../card/misc/card.module#CardModule" },
    { path: "category", loadChildren: "../../category/misc/category.module#CategoryModule" },
    { path: "meaning", loadChildren: "../../meaning/misc/meaning.module#MeaningModule" },
    { path: "reading", loadChildren: "../../reading/misc/reading.module#ReadingModule" },
    { path: "reading-session", loadChildren: "../../reading_session/misc/reading_session.module#ReadingSessionModule" },
    { path: "spread", loadChildren: "../../spread/misc/spread.module#SpreadModule" },
    { path: "spread-component", loadChildren: "../../spread_component/misc/spread_component.module#SpreadComponentModule" }
  ];