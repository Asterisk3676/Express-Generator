const DB = require('../models/students');

function parseField(field) {
    return field
        .split(/\[|\]/)
        .filter((s) => s);
}

function getField(req, field) {
    let val = req.body;
    field.forEach((prop) => {
        val = val[prop];
    });
    return val;
}

function checkID(val) {
    return val.match(/^([0-9]{10})$/);
}

function checkNotTrim(val) {
    return val.match(/^\S+\s\S+$/);
}

function checkCourseID(val) {
    val = val.toUpperCase();
    return val.match(/^[A-Z]{4}[0-9]{4}$/);
}

function checkCreditPiont(val) {
    return val.match(/^[1-9]$/);
}

exports.required = (field) => {
    field = parseField(field);   
    return (req, res, next) => {
        if (getField(req, field)) {
            next();
        } else {
            req.flash('error', `จำเป็นต้องมี "${field[1]}"`);
            res.redirect('back');
        }
    };
};

exports.unique = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        console.log(field);
        DB.find(
            field, getField(req, field),
            (err, results) => {
                if(err) return next(err);
                if(results.length == 0) {
                    next();
                } else {
                    req.flash('error', `"${field[1]}" นี้มีอยู่แล้ว`);
                    res.redirect('back');
                }
            }
        );
    };
};

exports.length = (field, len) => {
    field = parseField(field);
    return (req, res, next) => {
        if (checkID(getField(req, field))) {
            next();
        } else {
            req.flash('error', `"${field[1]}" ต้องเป็นตัวเลขและต้องมีตัวเลข ${len} ตัวเท่านั้น (ห้ามขาดห้ามเกิน)`);
            res.redirect('back');
        }
    };
};

exports.nameFormat = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        if (checkNotTrim(getField(req, field))) {
            next();
        } else {
            req.flash('error', `"${field[1]}" ต้องเว้น 1 บรรทัดเท่านั้น (ห้ามขาดห้ามเกิน)`);
            res.redirect('back');
        }
    };
};

exports.courseFormat = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        if (checkCourseID(getField(req, field))) {
            next();
        } else {
            req.flash('error', `"${field[1]}" 4 ตัวแรกต้องเป็นตัวอักษร A - Z และ 4 ตัวหลังต้องเป็นตัวเลข 0 - 9 (เช่น ITMI1210)`);
            res.redirect('back');
        }
    }; 
};

exports.creditLength = (field) => {
    field = parseField(field);
    return (req, res, next) => {
        if (checkCreditPiont(getField(req, field))) {
            next();
        } else {
            req.flash('error', `"${field[1]}" ต้องเป็นตัวเลข 1 หลักตั้งแต่ 1 - 9 เท่านั้น`);
            res.redirect('back');
        }
    };
}