import express from 'express';
import { getUsers } from '../../controllers/user/user.controller.get';
import { addUser } from '../../controllers/user/user.controller.post';
import { getUserById } from '../../controllers/user/user.controller.getById';
import { login } from '../../controllers/user/user.controller.login';
import { deleteUser } from '../../controllers/user/user.controller.delete';
import { updateUser } from '../../controllers/user/user.controller.put';
import { getUsersCount } from '../../controllers/user/user.controller.getCount';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/register', addUser);
router.post('/login', login);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.get('/statistics/count', getUsersCount);

export const userRouter = router;
