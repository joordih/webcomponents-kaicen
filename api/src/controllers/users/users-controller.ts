import { User } from "../../models/user";

exports.findAll = async (req, res) => {
  const user: User[] = await User.findAll({ paranoid: true });

  if (user.length === 0) {
    res.status(404).json({ message: 'No users found' });
    return;
  }

  res.json(user);
};

exports.findOne = async (req, res) => {
  const { id } = req.query;

  const user: User | undefined = await User.findByPk(Number(id));

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json(user);
};

exports.create = async (req, res) => {
  const { name, email, password } = req.body;

  const newUser = await User.create({
    name: name,
    email: email,
    password: password
  });

  res.json(newUser);
};

exports.delete = async (req, res) => {
  const { id } = req.query;

  const user: User | undefined = await User.findByPk(Number(id));

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.destroy();

  res.json({ messa: 'User deleted' });
};

exports.update = async (req, res) => {
  const { id, name, email, password } = req.body;

  if (!id) {
    return res.json({ message: 'User ID is required' });
  }

  const user: User | undefined = await User.findByPk(Number(id));

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.update({
    name: name,
    email: email,
    password: password
  });

  res.json(user);
};