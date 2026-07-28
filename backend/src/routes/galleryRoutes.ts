import { Router } from 'express';
import { listItems, createItem, updateItem, deleteItem, uploadImage } from '../controllers/galleryController';

const router = Router();

router.get('/', listItems);
router.post('/', uploadImage, createItem);
router.put('/:id', uploadImage, updateItem);
router.delete('/:id', deleteItem);

export default router;
