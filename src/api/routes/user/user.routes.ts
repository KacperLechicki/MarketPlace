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

// Create a new router object
const router = express.Router();

// Route for user login
// No authentication is required for this route
router.post('/login', login);

// Route for user registration
// No authentication is required for this route
router.post('/register', addUser);

// Route for getting all users
// Only admin users can access this route
router.get('/', AdminGuard(), getUsers);

// Route for getting a user by ID
// Only the user with the matching ID or an admin can access this route
router.get('/:id', UserGuard(), getUserById);

// Route for getting the count of users
// Only admin users can access this route
router.get('/statistics/count', AdminGuard(), getUsersCount);

// Route for updating a user
// Only the user with the matching ID can access this route
router.put('/:id', OnlyUserGuard(), updateUser);

// Route for deleting a user
// Only the user with the matching ID or an admin can access this route
router.delete('/:id', UserGuard(), deleteUser);

// Export the router
export const userRouter = router;
