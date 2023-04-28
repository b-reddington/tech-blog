const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' })
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'You are now logged in' });
        });

    } catch {
        res.status(400).json(err);
    }
})

router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(password)
        if (password.length < 8) {
            throw new Error('Password is too short')
        }
        const saltRounds = 10; // Number of salt rounds to use for the hash
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword // Store the hashed password in the database
        });
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ userData, message: 'User created successfully' });
        });

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;