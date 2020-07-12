import NeedsApi from "../api/needs-api.mjs";
import Need from "../entities/need.mjs";

export default class Socket {
    static refreshNeedsList() {
        if (NeedsList.rendered)
            NeedsList.render(true);
        game.socket.emit("module.FoundryPLANT", {
            type: "needsListRefresh"
        })
    }
};
