import { Controller, IRequestArguments, Post } from "tsnode-express"
import yml from "yaml"
import fs from "fs"
import nodemailer from "nodemailer"

@Controller('email')
class EmailController {
    private async send(obj: any) {
        let mail = nodemailer.createTransport({
            host: config.mail.host,
            port: config.mail.port,
            secure: false,
            auth: {
                user: config.mail.user,
                pass: config.mail.pass
            }
        })
        let message = {
            from: config.mail.user,
            to: obj.email,
            subject: obj.title,
            html: obj.content

        }
        return await mail.sendMail(message)
    }
    @Post('/')
    test(args: IRequestArguments) {
        let obj = {
            email: args.body.email ? args.body.email : '',
            title: args.body.title ? args.body.title : '',
            content: args.body.content ? args.body.content : ''
        }
        return this.send(obj).then(
            data => {
                if (data.messageId) {
                    return { "code": 2001, "msg": '发送成功', "data": [] }
                } else {
                    return { "code": 2002, "msg": '发送失败', "data": [] }
                }
            },
            error => {
                return { "code": 2002, "msg": '发送失败', "data": [] }
            }
        )
    }
}

let config = yml.parse(fs.readFileSync('config.yml', 'utf8'));
let emailController = new EmailController()

export { emailController }