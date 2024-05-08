const statesData = require('./statesData.json');
const State = require('../model/State');

const getAllStates = async (req, res) => {
    const states = await State.find();
    if (!states) return res.status(204).json({ 'message': 'No state found.' });
    res.json(States);
}

const createNewState = async (req, res) => {
    if (!req?.body?.statecode || !req?.body?.funfact) {
        return res.status(400).json({ 'message': 'State code is required' });
    }

    try {
        const result = await State.create({
            statecode: req.body.statecode,
            funfact: req.body.funfact
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateState = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const state = await State.findOne({ _id: req.body.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.body.id}.` });
    }
    if (req.body?.statecode) state.statecode = req.body.statecode;
    if (req.body?.funfact) state.funfact = req.body.funfact;
    const result = await state.save();
    res.json(result);
}

const deleteState = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'State ID required.' });

    const state = await State.findOne({ _id: req.body.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.body.id}.` });
    }
    const result = await state.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getState = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'State ID required.' });

    const state = await State.findOne({ _id: req.params.id }).exec();
    if (!state) {
        return res.status(204).json({ "message": `No state matches ID ${req.params.id}.` });
    }
    res.json(state);
}

module.exports = {
    getAllStates,
    createNewState,
    updateState,
    deleteState,
    getState
}