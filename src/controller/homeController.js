// let getHomepage = (req, res) => {

//     return  res.render('lmkhung.ejs');

// }

// export default {getHomepage}
const homeController = {
    getHomepage: (req, res) => {
      const isLoggedIn = req.query.isLoggedIn || false;
      return res.render('lmkhung.ejs', { isLoggedIn });
    },
  
    getDangNhap: (req, res) => {
      return res.render('dangnhap.ejs',);
    },
    
    getDangKy: (req, res)=>{
      return res.render('dangky.ejs');
    },
    getmenu: (req,res)=>{

      return res.render('menu.ejs');
    },
    gettrangbaihoc:(req, res)=>{
      return res.render('trangbaihoc.ejs');
    }
  };
  
  export default homeController;
  
