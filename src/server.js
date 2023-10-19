import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import dotenv from 'dotenv';
import mssql from 'mssql';
import bodyParser from 'body-parser';
import initWebRoute from './route/web.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: false }));

configViewEngine(app);

//init web route
initWebRoute(app);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

const config = {
    user: 'sa',
    password: '12345',
    server: 'localhost',
    database: 'WEB',
    driver: 'msnodesqlv8',
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};
// Kết nối đến SQL Server
mssql.connect(config).then(() => {
    console.log("Kết nối SQL thành công");
}).catch((err) => {
    console.log("Kết nối SQL thất bại:", err);
});

// Dangky 
app.post('/', (req, res) => {
    const tk = req.body.tk;
    const mk = req.body.mk;
    const ngaysinh=req.body.ngaysinh;
    const email= req.body.email;
    const sdt = req.body.sdt;

    const request = new mssql.Request();
    const query = `INSERT INTO DOAN (tk, mk, ngaysinh, email, sdt) VALUES ('${tk}', '${mk}', '${ngaysinh}', '${email}', '${sdt}')`;

    request.query(query, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Lỗi trong quá trình thêm dữ liệu.');
        } else {
            res.redirect('/dangnhap?RegisterSuccess=true');
        }
    });
});

app.post('/dangnhap',(req, res)=>{

    const tk=  req.body.tk;
    const mk =  req.body.mk;
    const request = new mssql.Request();
    const query = `SELECT COUNT(*) AS Count FROM DOAN WHERE tk = '${tk}' AND mk = '${mk}'`;

        request.query(query).then((result) => {
            if (result.recordset[0].Count > 0) {
               
                res.send('<script>alert("Đăng nhập thành công"); window.location="/?isLoggedIn=true";</script>');
                
            } else {
                res.send('<script>alert("Sai tên hoặc mật khẩu");window.location="/dangnhap"; </script>');
            }
        }).catch((err) => {
            console.log("Lỗi truy vấn SQL:", err);
            res.status(500).send('Lỗi truy vấn SQL');
        });

})
