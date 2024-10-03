import * as userService from '../services/userService';

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, idade } = req.body;

    try {
        const updatedUser = await userService.updateUser(id, nome, idade);
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user');
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deleted = await userService.deleteUser(id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('User not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting user');
    }
};
