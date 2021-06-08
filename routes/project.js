/*
    Rutas de Projectos
    host + /api/project
*/


const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {CreateProject, getProjects, updateProject, deleteProject} = require('../controllers/project');
const { isDate } = require('../helpers/isDate');
const { validFile } = require('../middlewares/file-validation');

//rutas
router.post(
    '/new', 
    [   //middlewares
        check('projectName', 'Project Name is required.').not().isEmpty(),
        check('startDate', 'Start Date  is required.').custom( isDate ),
        check('endDate', 'End Date  is required.').custom( isDate ),
        check('imgBackground', 'Img Background  is required.').not().isEmpty(),
        validFile
    ],
    CreateProject );

router.get('/:user', getProjects );

router.put('/:id',[   //middlewares
    check('projectName', 'Project Name is required.').not().isEmpty(),
    check('startDate', 'Start Date  is required.').not().isEmpty(),
    check('endDate', 'End Date  is required.').not().isEmpty(),
    check('imgBackground', 'Img Background  is required.').not().isEmpty(),
    validFile
], updateProject );

router.delete('/:id', deleteProject );


module.exports = router;