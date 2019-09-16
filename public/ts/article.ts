import {req} from './request'

class articleController {
    url: string

    constructor() {
        this.url = 'http://localhost:8855'
    }

    read(id: number) {
        let data = {
            url: this.url + '?id=' + id,
            data: {},
            method: "GET"
        }
        req.text(data, (e: any) => {
            console.log(e)
        })
    }

    lst(page: number) {
        let data = {
            url: this.url,
            data: {},
            method: "GET"
        }
        req.text(data, (e: any) => {
            console.log(e)
        })
    }

    add(obj: any) {
        let data = {
            url: this.url,
            data: obj,
            method: "POST"
        }
        console.log(data)
        // req.text(data, (e: any) => {
        //     console.log(e)
        // })
    }

    edit(obj: any) {
        let data = {
            url: this.url,
            data: {},
            method: "POST"
        }
        req.text(data, (e: any) => {
            console.log(e)
        })
    }

    del(id: number) {
        let data = {
            url: this.url,
            data: {},
            method: "GET"
        }
        req.text(data, (e: any) => {
            console.log(e)
        })
    }
}

let article = new articleController()
export {article}