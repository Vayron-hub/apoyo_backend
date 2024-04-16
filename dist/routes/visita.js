"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const visita_1 = require("../controllers/visita");
const router = express_1.default.Router();
router.get('/visitasPendientes/:id', visita_1.getVisitasPendientes);
router.post('/actualizarEstatus', visita_1.actualizarEstatus);
router.post('/confirmarVisita', visita_1.confirmarVisita);
router.get('/fotoSolicitante/:id', visita_1.fotoSolicitante);
exports.default = router;
//# sourceMappingURL=visita.js.map