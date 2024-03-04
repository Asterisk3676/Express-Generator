const Student = require('../models/students');

exports.getAll = (req, res, next) => {
    Student.all((err, results, fields) => {
        if(err) return next(err);
        // res.json(results);
        res.render('students/list', {
            title: 'Students',
            log: req.flash('log'),
            students: results
        });
    });
}

exports.addForm = (req, res) => {
    res.render('students/create', {
        title: 'Create Student',
        error: req.flash('error')
    });
}

exports.create = (req, res, next) => {
    const data = req.body.students;
    Student.create(data, (err) => {
        console.log('test')
        if(err) return next(err);
        req.flash('log', 'เพิ่มนักศึกษาสำเร็จ');
        res.redirect('/students');
    });
}

exports.editForm = (req, res, next) => {
    const id = req.params.id;
    Student.findOne(id, (err, results) => {
        if(err) return next(err);
        // res.json(results);
        res.render('students/update', {
            title: 'Update Student',
            error: req.flash('error'),
            student: results
        });
    });
}

exports.update = (req, res, next) => {
    const data = req.body.students;
    Student.update(data, (err) => {
        if(err) return next(err);
        req.flash('log', 'อัปเดตนักศึกษาสำเร็จ');
        res.redirect('/students');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Student.delete(id, (err) => {
        if(err) return next(err);
        req.flash('log', 'ลบสำเร็จ');
        res.redirect('/students');
    });
}