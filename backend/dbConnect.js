function dbconnect() {

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "groupomania"
    });

    con.connect();

    return con;
}