import DataURIParser from 'datauri/parser.js'
import path from 'path'

const parser = new DataURIParser();

const getDataUri = (file) => {
    const extName = path.extName(file.orignalname).toString();
    return parser.format(extName, file.buffer).content;
}
export default getDataUri;