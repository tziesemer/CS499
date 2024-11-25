/* GET Homepage */
const index = (req, res) => {
    res.render('index', { title: "Rescue Search"});
};

module.exports = {
    index
}