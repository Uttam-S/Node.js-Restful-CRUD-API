const Tutorial = require("../models/tutorial.model.js")

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message : "content cannot be empty!"})
    }

    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published || false
    });

    Tutorial.create(tutorial, (err, data) => {
        if (err) {
            res.status(500).send( { message: err.message || "some error occured while creating a tutorial."} );
        } else {
            res.send(data);
        }
    });
};

exports.findAll = (req, res) => {
    const title = req.query.title;

    Tutorial.getAll(title, (err, data) => {
        if (err) {
            res.status(500).send( { message: err.message || "some error occured while retreiving tutorials"} );
        } else {
            res.send(data);
        }
    });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Tutorial.findById(id, (err, data) => {
        if (err) {
            if (err.kind === "not_kind") {
                res.status(404).send({message: `Not found tutorial with ${id}`});
            } else {
                res.status(500).send({message: "Error retrieving tutorial with id " + id});
            }
        } else {
            res.send(data);
        }
    });
};

exports.findAllPublished = (req, res) => {
    Tutorial.getAllPublished((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "some error occured while retreiving tutorials"});
        } else {
            res.send(data);
        }
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(404).send({message: "content can not be empty"});
    }
    console.log(req.body);

    Tutorial.updateById(req.params.id, new Tutorial(req.body), (err, data) => {
        if (err) {
            if (err.kind == "not_kind") {
                res.status(404).send({message: `Not found tutorial with ${id}`});
            } else {
                res.status(500).send({message: "Error updating tutorial with id " + req.params.id});
            }
        } else {
            res.send(data);
        }
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Tutorial.remove(id, (err, data) => {
        if (err) {
            if (err.kind == "not_kind") {
                res.send(404).send({message: `Not found tutorial with ${id}`});
            } else {
                res.status(500).send({message: "Could not delete tutorial with id " + id});
            }
        } else {
            res.send({message: "Tutorial was deleted successfully"});
        }
    });
};

exports.deleteAll = (req, res) => {
    Tutorial.removeAll((err, data) => {
        if (err) {
            res.status(500).send({message: err.message || "Some error occured while removing tutorials"});
        } else {
            res.send({message: "All tutorials were deleted successfully"});
        }
    });
};

