export const isInstructor = (req, res, next) => {
    if (req.user.role !== 'instructor') {
        return res.status(403).json({ error: 'Access denied: Not an instructor' });
    }
    next();
};

export const isAdmin = (req, res, next)=>{
    if(req.user.role != 'admin'){
        return res.status(403).json({ error: 'Access denied: Not an Admin' })
    }
    next();
}