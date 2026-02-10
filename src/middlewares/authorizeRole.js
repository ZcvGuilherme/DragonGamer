export function authorizeRole(...rolesPermitidos) {
  return (req, res, next) => {
    const role = req.headers['x-role'];

    if (!role) {
      return res.status(401).json({ error: 'Role não informado' });
    }

    if (!rolesPermitidos.includes(role)) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    next();
  };
}
