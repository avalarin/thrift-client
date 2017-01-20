import path from 'path'
import fs from 'fs'
import { flatMap } from '../utils/asyncee'
import recursive from 'recursive-readdir'

const serviceRegex = /^\s*service ([^\s]+)/g

export default class ServicesLoader {
    list(baseDir) {
        return this._listThriftFiles(baseDir)
            .then(list => flatMap(list, this._getServices))
            .then(list => list.map(i => {
                i.file = path.relative(baseDir, i.file)
                return i
            }))
    }

    _getServices(file) {
        return new Promise((resolve) => {
            var input = fs.createReadStream(file)
            var remaining = ''
            
            var services = []

            function processLine(line) {
                let match = serviceRegex.exec(line)
                if (match) {
                    services.push({
                        file: file,
                        name: match[1]
                    })
                }
            }

            input.on('data', function(data) {
                remaining += data
                var index = remaining.indexOf('\n')
                while (index > -1) {
                    var line = remaining.substring(0, index)
                    remaining = remaining.substring(index + 1)
                    processLine(line)
                    index = remaining.indexOf('\n')
                }
            })

            input.on('end', function() {
                if (remaining.length > 0) {
                    processLine(remaining)
                }
                resolve(services)
            })
        })
    }

    _listThriftFiles(baseDir) {
        return new Promise((resolve, reject) => {
            recursive(baseDir, (err, files) => {
                if (err) reject(err)
                else resolve(files)
            })
        })
    }
}