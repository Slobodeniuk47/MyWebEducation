// server/controllers/roleController.ts
import { Request, Response } from 'express';
import { RoleService } from '../../infrastructure/services/roleService';

export const RoleController = {
  async create(req: Request, res: Response) {
    const role = await RoleService.create(req.body);
    res.json(role);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const role = await RoleService.update(id, req.body);
    res.json(role);
  },

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    await RoleService.delete(id);
    res.json({ message: 'Роль удалена' });
  },

  async getAll(req: Request, res: Response) {
    const roles = await RoleService.getAll();
    res.json(roles);
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const role = await RoleService.getById(id);
    res.json(role);
  },
};
