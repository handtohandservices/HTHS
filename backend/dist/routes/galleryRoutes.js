"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const galleryController_1 = require("../controllers/galleryController");
const router = (0, express_1.Router)();
router.get('/', galleryController_1.listItems);
router.post('/', galleryController_1.uploadImage, galleryController_1.createItem);
router.put('/:id', galleryController_1.uploadImage, galleryController_1.updateItem);
router.delete('/:id', galleryController_1.deleteItem);
exports.default = router;
//# sourceMappingURL=galleryRoutes.js.map