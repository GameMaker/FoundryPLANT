import NeedsApi from "../api/needs-api.mjs";
import Need from "../entities/need.mjs";
import constants from "../constants.mjs";

export default class Socket {
    static refreshNeedsList() {
        fplog("Socket.refreshNeedsList()");
        fplog("Emitting " + constants.socketDomain + ":" + constants.msgRefreshNeeds);
        game.socket.emit(constants.socketDomain, {
            type: constants.msgRefreshNeeds
        })
        // if (NeedsList.rendered) {
        fplog("Socket: Updating Needs list");
        window.NeedsList.updateNeedsTable();
        // } else {
        //     fplog("Needslist is not rendered (" + NeedsList.rendered + "), so we don't update it.");
        // }

    }

    static listen() {
        fplog("Socket - listening");
        game.socket.on(constants.socketDomain, data => {
            fplog("Received socket : " + data.type);
            if (data.type === constants.msgRefreshNeeds) {
                fplog("It's an NeedsListRefresh");
                // if (NeedsList.rendered) {
                fplog("Needslist is open, Updating table");
                window.NeedsList.updateNeedsTable();
                // } else {
                // fplog("Needslist is closed");
                // return;
                // }
            }
        });
    }
};
