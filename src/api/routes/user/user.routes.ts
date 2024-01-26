import express from 'express';
import { getUsers } from '../../controllers/user/user.controller.get';
import { addUser } from '../../controllers/user/user.controller.post';
import { getUserById } from '../../controllers/user/user.controller.getById';
import { login } from '../../controllers/user/user.controller.login';
import { deleteUser } from '../../controllers/user/user.controller.delete';
import { updateUser } from '../../controllers/user/user.controller.put';
import { getUsersCount } from '../../controllers/user/user.controller.getCount';
import {
	AdminGuard,
	OnlyUserGuard,
	UserGuard,
} from '../../../auth/jwt/jwt.auth';

const router = express.Router();

router.post('/login', login);
router.post('/register', addUser);

router.get('/', AdminGuard(), getUsers);
router.get('/:id', UserGuard(), getUserById);
router.get('/statistics/count', AdminGuard(), getUsersCount);

router.put('/:id', OnlyUserGuard(), updateUser);
router.delete('/:id', UserGuard(), deleteUser);

export const userRouter = router;
