import express from 'express';
import { getUsers } from '../controllers/user/user.controller.get';
import { addUser } from '../controllers/user/user.controller.post';
import { getUserById } from '../controllers/user/user.controller.getById';
import { login } from '../controllers/user/user.controller.login';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', addUser);
router.post('/login', login);

export const userRouter = router;
