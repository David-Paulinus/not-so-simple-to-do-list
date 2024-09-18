import express from "express";
import {getList, addEntryToTodoList, updateTODO, deleteTODO} from "../controllers/controller.js"

const router = express.Router();

router.get('/list', getList);
router.post('/list', addEntryToTodoList);
router.patch('/list', updateTODO);
router.delete('/list', deleteTODO);

export default router;
