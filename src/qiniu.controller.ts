import { Controller, Post, IRequestArguments } from "tsnode-express"
import yml from "yaml"
import fs from "fs"
import qiniu from "qiniu"

@Controller('qiniu')
class QiniuController {
	async getFile(options: object) {
		let bucketManager = new qiniu.rs.BucketManager(_qiniu_mac, _qiniu_config);
		let bucket = config.qiniu.bucket;

		return new Promise(function (resolve, reject) {
			bucketManager.listPrefix(bucket, options, function (err, respBody, respInfo) {
				if (err) reject(err)
				resolve(respInfo)
			})
		})
	}
	@Post('/')
	getQiniuFile(args: IRequestArguments) {
		let options = {
			limit: args.body.limit ? args.body.limit : config.qiniu.limit,
			prefix: args.body.prefix ? args.body.prefix : "",
			marker: args.body.marker ? args.body.marker : ""
		}
		return this.getFile(options).then(
			function (res: any) {
				if (res.statusCode == 200) {
					let arr = {}
					if (res.data.marker) {
						arr['marker'] = res.data.marker
					}
					arr['items'] = res.data.items
					// respBody.items.forEach(function (item) {
					// 	console.log(item.key);
					// });
					return { "code": 2001, "msg": "获取成功", "data": arr }
				} else {
					return { "code": 2002, "msg": "获取失败", "data": [] }
				}
			},
			error => {
				return { "code": 2002, "msg": "获取失败", "data": [] }
			}
		)
	}
	@Post('/addFile')
	setQiniuFile(args: any) {
		let uploadToken = new qiniu.rs.PutPolicy({ scope: config.qiniu.bucket }).uploadToken(_qiniu_mac);
		let formUploader = new qiniu.form_up.FormUploader(_qiniu_config);
		let putExtra = new qiniu.form_up.PutExtra();

		let key = args.file.filename //文件名
		let localFile = args.file.path //文件路径

		formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr, respBody, respInfo) {
			if (respErr) {
				throw respErr;
			}
			if (respInfo.statusCode == 200) {
				args.res.send({ "code": 2001, "msg": "上传成功", "data": respBody })
			} else {
				args.res.send({ "code": 2002, "msg": "上传失败", "data": [] })
			}
		})
	}
}

let config = yml.parse(fs.readFileSync('config.yml', 'utf8'));
let _qiniu_mac = new qiniu.auth.digest.Mac(config.qiniu.accessKey, config.qiniu.secretKey);
let _qiniu_config = new qiniu.conf.Config();
let qiniuController = new QiniuController()

export { qiniuController }