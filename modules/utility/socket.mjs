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

    static listen() {
        game.socket.on("module.FoundryPLANT", data => {
            console.log("FoundryPLANT | received socket module.FoundryPLANT");
            if (data.type === "needsListRefresh") {
                console.log("FoundryPLANT | received socket module.FoundryPLANT.needsListRefresh");
                if (NeedsList.rendered) {
                    console.log("FoundryPLANT | List is rendered");
                    NeedsList.render(true);
                }
                return;
            }
        });
    }
};
