
const Middlewareres  = (req, res, next) => {
    const user = res.locals.user;
    res.json({ status: true, user })
}
export default Middlewareres;