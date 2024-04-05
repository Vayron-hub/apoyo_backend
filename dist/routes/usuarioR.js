"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioC_1 = require("../controllers/usuarioC");
const router = (0, express_1.Router)();
router.get('/', usuarioC_1.getUsuarios);
router.get('/:id', usuarioC_1.getUsuario);
router.post('/', usuarioC_1.postUsuario);
router.put('/:id', usuarioC_1.putUsuario);
router.delete('/:id', usuarioC_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarioR.js.map