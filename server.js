const rp = require("request-promise");
const cheerio = require("cheerio");
const axios = require("axios");
const fs = require("fs");

const express = require('express')
const app = express()
const port = 3000


// const options = {
//     uri: URL,
//     transform: function (body) {
//         //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
//         var test = cheerio.load(body);
//         console.log(test)
//     },
// };

// (async function crawler() {
//     try {
//         var $ = await rp(options);
//     } catch (error) {
//         return error;
//     }

//     const title = $("._2nlw._2nlv").html()
//     console.log(title)
//     const description = $(".entry-content > p").text().trim();
//     let data = [];
//     data.push({
//         title,
//     });

//     // Lưu dữ liệu về máy
//     fs.writeFileSync('data.json', JSON.stringify(data))
// })();

// router.post("/", async (req, res) => {
//     try {
//         const href = req.body.href;
//         const listUrl = req.body.listUrl;
//         const title = req.body.title;
//         const url = req.body.url;
//         const wrapper = req.body.wrapper;
//         const wrapperContent = req.body.wrapperContent;
//         const time = req.body.time;
//         const data = await crawlDanhSachBaiViet(
//             url,
//             wrapper,
//             wrapperContent,
//             title,
//             href,
//             time,
//             listUrl
//         );
//         res.status(200).json(data);
//     } catch (error) {
//         console.log(error);
//         res.status(500);
//     }
// });

// router.post("/save", async (req, res) => {
//     try {
//         const url = req.body.url;
//         const wrapperContent = req.body.wrapperContent;
//         const data = await crawlChiTietBaiViet(url, wrapperContent);
//         const baiViet = new BaiViet({
//             tieuDe: data.title,
//             noiDung: data.data,
//             trangThai: 2,
//             thoiGianDangBai: Date.now(),
//             crawling: true,
//             crawlURL: url,
//         });
//         await baiViet.save();
//         res.status(201).json({ message: "Crawling: Lưu bài viết thành công." });
//     } catch (error) {
//         res.json({ message: "Crawling: Lưu bài viết thất bại.", error: error });
//     }
// });

// async function crawlDanhSachBaiViet(
//     url,
//     wrapper,
//     wrapperContent,
//     title,
//     href,
//     time,
//     listUrl
// ) {
//     const body = await axios.get(url);
//     const $ = cheerio.load(body.data);
//     let result = {
//         wrapperContent: wrapperContent,
//         danhSachBaiViet: [],
//     };
//     if (listUrl === true) {
//         $(wrapper).each(function () {
//             result.danhSachBaiViet.push({
//                 title: $(this).find(title).text(),
//                 time: $(this).find(time).text(),
//                 href: $(this).find(href).attr("href"),
//             });
//         });
//     } else {
//         result.wrapperContent = wrapper;
//         result.danhSachBaiViet.push({
//             title: $("title").text(),
//             href: url,
//         });
//     }
//     return result;
// }

// async function crawlUrlDanhSachBaiViet(url, wrapper, href, listUrl) {
//     const body = await axios.get(url);
//     const $ = cheerio.load(body.data);
//     let result = [];
//     if (listUrl === true) {
//         $(wrapper).each(function () {
//             result.push($(this).find(href).attr("href"));
//         });
//     } else {
//         result.push(url);
//     }
//     return result;
// }

 app.get("/", async (req, res) => {
    try {
        const url = `https://www.facebook.com/alviss.isaac`;
        const data = await crawlingProfile(url);
        console.log(data)
        res.status(201).json({ message: "ok" });
    } catch (error) {
        res.json({ message: "fail", error: error });
    }
});
async function crawlingProfile(url) {
    const body = await axios.get(url);
    const $ = cheerio.load(body.data);
    let result = {};
    result.name = $("#fb-timeline-cover-name").text();
    result.profileLink = $("._43c8._5f6p.fbEditProfileViewExperience.experience").text();
    console.log("result: "+result );
    return result;
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(` app listening at http://localhost:${port}`)
})
