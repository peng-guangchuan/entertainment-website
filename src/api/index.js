import axios from "axios";
import Qs from "qs";
import { SnackbarProgrammatic as Snackbar } from 'buefy';

//全局默认配置
axios.defaults.baseURL = "http://192.168.3.5:8001";
// axios.interceptors.request.use(
//     config => {
//         console.log(config);
//         return config;
//     },
//     err => {
//         console.log(err);
//     }
// );请求拦截
axios.defaults.withCredentials = true //请求发送cookie

axios.interceptors.response.use(res => {
    return res;
}, () => {
    Snackbar.open({
        message: '服务器被吃了',
        type: 'is-warning',
        position: 'is-top',
        actionText: 'Retry',
        indefinite: true,
        onAction: () => {
            this.$buefy.toast.open({
                message: 'Action pressed',
                queue: false
            })
        }
    })
})

//post传数据用data，get传参数用params
export const adminLogin = (username, password) => {
    return axios.post("/loginbackstage", Qs.stringify({ username, password }));
};

// 用户登陆接口
export const userLogin = (email, password) => {
    return axios.post(
        "/common/login",
        Qs.stringify({ email, password })
    );
};

// 用户注册接口
export const register = (account, password, type, email, name, gender, age, school) => {
    return axios.post("/common/register", Qs.stringify({ account, password, type, email, name, gender, age, school }))
};

// 获取书籍信息接口
export const getAllBook = (page)=>{
    return axios.get("/common/books?page="+page+"&size=9");
};

// 获取电影信息接口
export const getAllMovies = (page)=>{
    return axios.get("/common/movies?page="+page+"&size=9");
};

// 获取音乐信息接口
export const getAllMusic = (page)=>{
    return axios.get("/common/musics?page="+page+"&size=9");
};

export const getAllArticle = (page) => {
    return axios.post("/pagearticle", Qs.stringify({ page }));
};

export const getAllArticleType = () => {
    return axios.post("/getallarticletype");
};

export const getArticleByTypeId = typeId => {
    return axios.post("/getarticlebytypeid", Qs.stringify({ typeId }));
};

export const getHotArticleType = () => {
    return axios.post("/gethotarticletype");
};

export const getPageMain = pageNum => {
    return axios({
        url: "/getpagearticle",
        params: {
            page: pageNum
        }
    })
};
export const getnew = () => {
    return axios("/getnew")
};

export const gethotuser = () => {
    return axios("/hotuser")
};

export const getcomment = (artId) => {
    return axios.post("/getComment", Qs.stringify({ artId }))
};
export const newcomment = (comArtId, text, comUserId) => {
    return axios.post("/postcomment", Qs.stringify({ comArtId, text, comUserId }))
};
export const newpost = (userId, title, text, select) => {
    return axios.post("/newpost", Qs.stringify({ userId, title, text, select }))
}

export const findartbyuserid = (userId) => {
    return axios.post("/findartbyuserid", Qs.stringify({ userId }))
}

export const getuserlist = () => {
    return axios.post("/getuserlist")
}


