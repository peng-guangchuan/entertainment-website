import axios from "axios";
import Qs from "qs";
import { SnackbarProgrammatic as Snackbar } from 'buefy';

//全局默认配置
axios.defaults.baseURL = "http://192.168.3.5:8003";
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
export const getAllBook = (page) => {
    return axios.get("/common/books?page=" + page + "&size=9");
};

// 搜索书籍信息接口
export const getSearchBook = (content, sequence, page) => {
    return axios.get("/common/books?content=" + content + "&sequence=" + sequence + "&page=" + page + "&size=9");
}

// 获取单个书籍信息接口
export const getOneBook = (bookid) => {
    return axios.get("/common/book/" + bookid);
};

// 获取电影信息接口
export const getAllMovies = (page) => {
    return axios.get("/common/movies?page=" + page + "&size=9");
};

// 搜索电影信息接口
export const getSearchMovie = (content, sequence, page) => {
    return axios.get("/common/movies?content=" + content + "&sequence=" + sequence + "&page=" + page + "&size=9");
}

// 获取单部电影信息接口
export const getOneMovie = (movieid) => {
    return axios.get("/common/movie/" + movieid);
};

// 获取音乐信息接口
export const getAllMusic = (page) => {
    return axios.get("/common/musics?page=" + page + "&size=9");
};

// 搜索音乐信息接口
export const getSearchMusic = (content, sequence, page) => {
    return axios.get("/common/musics?content=" + content + "&sequence=" + sequence + "&page=" + page + "&size=9");
}

// 获取单个音乐接口
export const getOneMusic = (musicid) => {
    return axios.get("/common/music/" + musicid)
}

// 获取评论接口
export const getComment = (type, id, page, size, token) => {
    return axios.get("/common/comments?type=" + type + "&id=" + id + "&page=" + page + "&size=" + size, { headers: { token: token } }
    );
};
// 获取长评论接口
export const getLongComment = (type, id, ctype, page, size, token) => {
    return axios.get("/common/comments?type=" + type + "&id=" + id + "&ctype=" + ctype + "&page=" + page + "&size=" + size, { headers: { token: token } }
    );
};

// 获取评分接口
export const getGrade = (entityType, id) => {
    return axios.get("/common/grade?entityType=" + entityType + "&id=" + id);
};

// 发表评论接口
export const postComment = (token, entityType, entityId, ownerId, type, context) => {
    let data = { 'entityType': entityType, 'entityId': entityId, 'ownerId': ownerId, 'type': type, 'context': context };
    return axios.post("/stu/comment", Qs.stringify(data), { headers: { token: token } });
};

// 给评论点赞接口
export const dianZan = (commentId, token) => {
    return axios.post("/stu/comment/like", Qs.stringify({ commentId }), { headers: { token: token } });
};

// 获取新书籍信息接口
export const getNewBook = () => {
    return axios.get("/common/new/book");
}
// 获取新电影信息接口
export const getNewMovie = () => {
    return axios.get("/common/new/movie");
}
// 获取新音乐信息接口
export const getNewMusic = () => {
    return axios.get("/common/new/music");
}

// 用户打分接口
export const postGrade = (token, userId, entityType, entityId, score) => {
    let data = { 'userId': userId, 'entityType': entityType, 'entityId': entityId, 'score': score };
    return axios.post("/stu/grade", Qs.stringify(data), { headers: { token: token } });
}

// 获取用户是否打分情况接口
export const getUserGrade = (token, entityType, entityId) => {
    return axios.get("/stu/grade?entityType=" + entityType + "&entityId=" + entityId, { headers: { token: token } });
}

// 删除评论接口
export const deleteComment = (commentId, token) => {
    return axios.delete("/stu/comment", { params: { "commentId": commentId }, headers: { token: token } });
}

// 获取高分书籍接口
export const getTopBook = () => {
    return axios.get("/common/top/book");
}
// 获取高分音乐接口
export const getTopMusic = () => {
    return axios.get("/common/top/music");
}
// 获取高分电影接口
export const getTopMovie = () => {
    return axios.get("/common/top/movie");
}
// 获取热门随笔接口
export const getTopEssay = () => {
    return axios.get("/common/top/essay");
}

// 获取活动信息接口
export const getAllActivity = (content, status, sequence, page, size) => {
    return axios.get("/common/activitys?content=" + content + "&status=" + status + "&sequence=" + sequence + "&page=" + page + "&size=" + size);
}
// 获取单个活动信息接口
export const getOneActivity = (id) => {
    return axios.get("/common/activity/" + id);
}
// 获取单个活动的图片接口
export const getOneActivityImg = (id) => {
    return axios.get("/common/activity/img?id=" + id);
}

// 报名活动接口
export const joinActivity = (token, stu_id, activity_id) => {
    return axios.post("/stu/join", Qs.stringify({ stu_id, activity_id }), { headers: { token: token } });
};

// 获取用户已报名活动接口
export const getUserActivity = (userId, page, size, token) => {
    return axios.get("/stu/activitys?userId=" + userId + "&page=" + page + "&size=" + size, { headers: { token: token } });
}

// 提交随笔信息
export const postNewEssay = (token, entityType, entityId, ownerId, type, context, title) => {
    return axios.post("/stu/essay", Qs.stringify({ entityType, entityId, ownerId, type, context, title }), { headers: { token: token } });
}

// 管理员端接口
export const getBooks = (page, size) => {
    return axios.get("/common/books?page=" + page + "&size=" + size);
};
export const getMusics = (page, size) => {
    return axios.get("/common/musics?page=" + page + "&size=" + size);
};
export const getMovies = (page, size) => {
    return axios.get("/common/movies?page=" + page + "&size=" + size);
};


// 删除书籍信息
export const deleteBook = (bookId, token) => {
    return axios.delete("/admin/book", { params: { "id": bookId }, headers: { token: token } });
}

//修改书籍信息
export const updateBook = (token, id, name, publisher, publisherYear, author, isbn, description) => {

    return axios.patch("/admin/book", Qs.stringify({ id, name, publisher, publisherYear, author, isbn, description }), { headers: { token: token } });
}
//添加书籍信息
export const addBook = (form, token) => {
    return axios.post("/admin/book", Qs.stringify(form), { headers: { token: token } });
}



// 删除电影信息
export const deleteMovie = (movieId, token) => {
    return axios.delete("/admin/movie", { params: { "id": movieId }, headers: { token: token } });
}

//修改电影信息
export const updateMovie = (token, id, name, showtime, director, genre, description, actor) => {

    return axios.patch("/admin/movie", Qs.stringify({ id, name, showtime, director, genre, description, actor }), { headers: { token: token } });
}
//添加电影信息
export const addMovie = (form, token) => {
    return axios.post("/admin/movie", Qs.stringify(form), { headers: { token: token } });
}


// 删除音乐信息
export const deleteMusic = (id, token) => {
    return axios.delete("/admin/music", { params: { "id": id }, headers: { token: token } });
}

//修改音乐信息
export const updateMusic = (token, id, name, singer, album, lyric) => {

    return axios.patch("/admin/music", Qs.stringify({ id, name, singer, album, lyric }), { headers: { token: token } });
}
//添加音乐信息
export const addMusic = (form, token) => {
    return axios.post("/admin/music", Qs.stringify(form), { headers: { token: token } });
}

//添加活动图片
export const addActivityImage = (token,file,id) =>{
    return axios.post("/admin/activity/img",{file,id},{headers:{token:token}});
}
//添加活动
export const addActivity = (token,form) =>{
    return axios.post("/admin/activity",form,{headers:{token:token}});
}
// 删除活动信息
export const deleteActivity = (id, token) => {
    return axios.delete("/admin/activity", { params: { "id": id }, headers: { token: token } });
}

// //上传图片接口
// export const uploadImage = (image)=>{
//     return axios.post("/admin/img",image);
// }
// // 报名活动接口
// export const joinActivity = (token, stu_id, activity_id) => {
//     return axios.post("/stu/join", Qs.stringify({ stu_id, activity_id }), { headers: { token: token } });
// };

