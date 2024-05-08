const verifyStates = (...allowedStates) => {
    return (req, res, next) => {
        if (!req?.states) return res.sendStatus(401);
        const statesArray = [...allowedStates];
        const result = req.states.map(state => statesArray.includes(state)).find(val => val === true);
        if (!result) return res.sendStatus(401);
        next();
    }
}

module.exports = verifyStates