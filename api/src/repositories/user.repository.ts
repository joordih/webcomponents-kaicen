import { Op } from 'sequelize';
import User from '@models/user';

interface IUserRepository {
  save(user: Partial<User>): Promise<User>;
  getAll(limit?: number, offset?: number, searchTerms?: string): Promise<{ rows: User[], count: number }>;
  getById(id: number): Promise<User | null>;
  delete(id: number): Promise<number>;
  update(user: User): Promise<User>;
  getUserByEmail(email: string): Promise<User | null>;
}

class UserRepository implements IUserRepository {
  async save(user: Partial<User>): Promise<User> {
    try {
      return await User.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll(limit?: number, offset?: number, searchTerms?: string): Promise<{ rows: User[]; count: number; }> {
    try {
      if (!searchTerms) {
        return await User.findAndCountAll({
          limit: limit,
          offset: offset,
          attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
          where: {
            published: true
          },
          paranoid: true
        });
      }

      if (!limit || !offset) {
        return await User.findAndCountAll({
          attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
          paranoid: true,
          where: {
            published: true,
          }
        });
      }

      const filters = {
        [Op.or]: [
          { name: { [Op.like]: `%${searchTerms}%` } },
          { email: { [Op.like]: `%${searchTerms}%` } },
          { published: true }
        ]
      }

      return await User.findAndCountAll({
        where: filters,
        limit: limit,
        offset: offset,
        attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        paranoid: true
      });
    } catch (error) {
      throw new Error('Error getting users');
    }
  }
  
  async getUserByEmail(email: string): Promise<User | null> {
    try {
      return await User.findOne({ where: { email } });
    }
    catch (error) {
      throw new Error('Error getting user by email');
    }
  }

  async getById(id: number): Promise<User | null> {
    try {
      return await User.findByPk(id);
    } catch (error) {
      throw new Error('Error getting user by id');
    }
  }

  async delete(id: number): Promise<number> {
    try {
      return await User.destroy({
        where: {
          id: id
        }
      });
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }

  async update(user: User): Promise<User> {
    const { id, name, email } = user;

    try {
      const user = await this.getById(id);
      await user?.update({ name, email });

      return user;
    } catch (error) {
      throw new Error('Error updating user');
    }
  }
}

export default new UserRepository();