class CK {
    constructor(name: string, value: any = null) {
        if (value === '') {
            this.delCookie(name)
        } else {
            this.setCookie(name, value)
        }
        if (value === null) {
            this.getCookie(name);
        }
    }
    private setCookie(name: string, value: string) {
        let Day: number = 10
        let exp = new Date()
        exp.setTime(exp.getTime() + Day * 20 * 60 * 60 * 1000);
        document.cookie = name + '=' + escape(value) + ";expires=" + exp.toUTCString();
    }
    private getCookie(name: string) {
        let arr:string[] | null, reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
        if ((arr = document.cookie.match(reg))) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    }
    private delCookie(name: string) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = this.getCookie(name);
        if (cval != null) {
            document.cookie = `${name}=${cval};expires=${exp.toUTCString}`;
        }
    }
}
export { CK }