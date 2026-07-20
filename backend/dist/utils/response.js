"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = ok;
exports.created = created;
exports.noContent = noContent;
function ok(res, data, status = 200) {
    return res.status(status).json({ success: true, data });
}
function created(res, data) {
    return res.status(201).json({ success: true, data });
}
function noContent(res) {
    return res.status(204).send();
}
//# sourceMappingURL=response.js.map