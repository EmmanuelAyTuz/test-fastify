const Task = require("../../models/v1/task.model");
const createError = require('http-errors')

const newSingle = async (req, rep) => {
    try {
        const task = new Task(req.body);
        await task.save();
        rep.redirect('/v1/task/all');
    } catch (error) {
        console.log("START_ERROR\n", error.errors, "\nEND_ERROR");
        rep.redirect('/v1/task/new');
    }
    //return task.save();
}

//Render view
const formNew = async (req, rep) => {
    rep.view(
        '/template/index',
        {
            header: { file: "../partials/header.ejs", title: "New Task" },
            nav: { file: "../partials/nav.ejs" },
            main: { file: "../task/task_form.ejs", data: { form: { btn: "CREATE!", action: "/v1/task/new" } }, err: null },
            footer: { file: "../partials/footer.ejs" },
        }
    );
}

const formEdit = async (req, rep) => {
    const { task, err } = await showSingle(req);

    rep.view(
        '/template/index',
        {
            header: { file: "../partials/header.ejs", title: "Edit Task" },
            nav: { file: "../partials/nav.ejs" },
            main: {
                file: "../task/task_form.ejs",
                data: {
                    form: {
                        btn: "UPDATE!",
                        action: "/v1/task/edit/" + req.params.id,
                        data: task
                    }
                },
                error: err
            },
            footer: { file: "../partials/footer.ejs" },
        }
    );
}

const formDetail = async (req, rep) => {
    const { task, err } = await showSingle(req);
    rep.view(
        '/template/index',
        {
            header: { file: "../partials/header.ejs", title: "Detail Task" },
            nav: { file: "../partials/nav.ejs" },
            main: { file: "../task/task_details.ejs", data: task, error: err },
            footer: { file: "../partials/footer.ejs" },
        }
    );
}

const formAll = async (req, rep) => {
    const { tasks, err } = await showAll(req);
    rep.view('/template/index',
        {
            header: { file: "../partials/header.ejs", title: "Show Tasks" },
            nav: { file: "../partials/nav.ejs" },
            main: { file: "../task/task_show.ejs", data: tasks, error: err },
            footer: { file: "../partials/footer.ejs" },
        }
    );
}

//Actions
const showSingle = async (req) => {
    const task = await Task.findById(req.params.id);
    let err;
    if (task == null) {
        err = createError(404, 'No document found', { header: { 'X-Req-Id': req.id, id: req.params.id } })
    }
    return { task, err };
}

const showAll = async (req) => {
    let err;
    const tasks = await Task.find();
    if (tasks.length < 1) {
        err = createError(404, 'No documents found', { header: { 'X-Req-Id': req.id, id: null } })
    }
    return { tasks, err };
}

const editSingle = async (req, rep) => {
    const task = await Task.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description }, { new: true, });
    rep.redirect('/v1/task/all')
}

const deleteSingle = async (req, rep) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (task == null) {
        //throw createError(404, 'No document found', { header: { 'X-Req-Id': req.id, id: req.params.id } })
    }
    //return task;
    rep.redirect('/v1/task/all')
}

const deleteMany = async (req, rep) => {
    let query = {};
    if (req.query.id) {
        query = {
            _id: {
                $in: req.query.id,
            }
        };
    }

    if (req.query.tag) {
        query = {
            tag: req.query.tag,
        };
    }

    const task = await Task.deleteMany(query);
    return task;
}

module.exports = { newSingle, editSingle, deleteSingle, deleteMany, formNew, formEdit, formDetail, formAll };