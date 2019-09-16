import { Controller, Get, IRequestArguments, Post } from "tsnode-express"
import { articleModel } from "./article.model"

@Controller('article')
class ArticleController {
    @Get('/')
    getAllArticle(args: IRequestArguments) {
        return articleModel.query().then(
            data => {
                return { "code": 2001, "msg": '查询成功', "data": data }
            },
            error => {
                return { "code": 2002, "msg": '查询失败', "data": [] }
            }
        )
    }
    @Get('/:id')
    getOneArticle(args: IRequestArguments) {
        return articleModel.query(args.params.id).then(
            data => {
                if (typeof data == "undefined") {
                    return { "code": 2002, "msg": '内容不存在', "data": [] }
                } else {
                    return { "code": 2001, "msg": '查询成功', "data": data }
                }
            },
            error => {
                return { "code": 2002, "msg": '查询失败', "data": [] }
            }
        )
    }
    @Post('/create')
    createArticle(args: IRequestArguments) {
        return articleModel.create(args.body).then(
            data => {
                if (typeof data == "undefined") {
                    return { "code": 2001, "msg": '添加成功', "data": [] }
                }
            },
            error => {
                return { "code": 2002, "msg": '添加失败', "data": [] }
            }
        )
    }
    @Post('/editor/:id')
    editorArticle(args: IRequestArguments) {
        return articleModel.editor(args.params.id, args.body).then(
            data => {
                if (typeof data == "undefined") {
                    return { "code": 2001, "msg": '修改成功', "data": [] }
                }
            },
            error => {
                return { "code": 2002, "msg": '修改失败', "data": [] }
            }
        )
    }
    @Post('/delete/:id')
    deleteArticle(args: IRequestArguments) {
        return articleModel.delete(args.params.id).then(
            data => {
                if (typeof data == "undefined") {
                    return { "code": 2001, "msg": '删除成功', "data": [] }
                }
            },
            error => {
                return { "code": 2002, "msg": '删除失败', "data": [] }
            }
        )
    }
}

export { ArticleController }