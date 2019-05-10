import marked from "marked";

let md=function(data:any){
    return marked(data)
}

export {md}