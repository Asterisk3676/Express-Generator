const Course = require('../models/course');

exports.getAll = (req, res, next) => {
    Course.all((err, results, fields) => {
        if(err) return next(err);
        // res.json(results);
        res.render('course/list', {
            title: 'Course',
            log: req.flash('log'),
            courses: results
        });
    });
}

exports.addForm = (req, res) => {
    res.render('course/create', {
        title: 'Create Course',
        error: req.flash('error')
    });
}

exports.create = (req, res, next) => {
    const data = req.body.course;
    Course.create(data, (err) => {
        if(err) return next(err);
        req.flash('log', 'เพิ่มวิชาสำเร็จ');
        res.redirect('/course');
    });
}

exports.editForm = (req, res, next) => {
    const id = req.params.id;
    Course.findOne(id, (err, results) => {
        if(err) return next(err);
        // res.json(results);
        res.render('course/update', {
            title: 'Update Course',
            error: req.flash('error'),
            course: results
        });
    });
}

exports.update = (req, res, next) => {
    const data = req.body.course;
    Course.update(data, (err) => {
        if(err) return next(err);
        req.flash('log', 'อัปเดตวิชาสำเร็จ');
        res.redirect('/course');
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;
    Course.delete(id, (err) => {
        if(err) return next(err);
        req.flash('log', 'ลบสำเร็จ');
        res.redirect('/course');
    });
}