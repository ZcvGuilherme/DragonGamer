export function authorizeRole(rolePermitido) {
  return (req, res, next) => {
    const role = req.headers['x-role'];

    if (!role) {
      return res.status(401).json({ error: 'Role não informado' });
    }

    if (role !== rolePermitido) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    next();
  };
}
