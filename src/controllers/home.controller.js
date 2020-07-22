const home = async (req, rep) => {
    rep.view(
        '/template/index',
        {
            header: { file: "../partials/header.ejs", title: "Home" },
            nav: { file: "../partials/nav.ejs" },
            main: { file: "../home.ejs", data: { btn: "CREATE TASK!", ref: "/v1/task/new" }, err: null },
            footer: { file: "../partials/footer.ejs" },
        }
    );
}

module.exports = { home };