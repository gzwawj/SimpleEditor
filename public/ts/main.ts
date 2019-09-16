declare function define(...args: any[]): any;
import config from './config'
import {init} from './style'
import {action} from './action'
import {file} from './file'
import clipboard from 'clipboard'

init()
action()
file()

if (clipboard.isSupported()) {
    new clipboard('li')
}
