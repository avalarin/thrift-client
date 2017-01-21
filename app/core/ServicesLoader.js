import path from 'path'
import fs from 'fs'
import os from 'os'
import mkdirp from 'mkdirp'
import { flatMap } from '../utils/asyncee'
import recursive from 'recursive-readdir'
import { exec } from 'child_process'
import guid from 'guid'

const serviceRegex = /^\s*service ([^\s]+)/g

export default class ServicesLoader {
    getDescription(service) {
        return new Promise((resolve, reject) => {
            let baseDir = service.source; // getBaseDir();
            let targetDir = path.join(os.tmpdir(), 'thrift-client', guid.raw())
            let targetName = path.basename(service.file, path.extname(service.file)) + '.json'
            let targetPath = path.join(targetDir, targetName)

            let cmd = `thrift --gen json:merge --out ${targetDir} -I ${baseDir} ${service.file}`

            mkdirp(targetDir, (err) => {
                if (err) reject(err)
                else generate();
            })

            function generate() {
                console.log(`generating client (${cmd}) into ${targetPath}`)
                exec(cmd, {}, (err, stdout, stderr) => {
                    if (err) {
                        console.log(`thrift stdout: ${stdout}`);
                        console.error(`thrift stderr: ${stderr}`);
                        reject(`thrift exited with error`);
                    }

                    fs.readFile(targetPath, 'utf8', (err, data) => {
                        if (err) return reject(err);
                        let description;
                        try {
                            description = JSON.parse(data);
                        } catch (err) {
                            reject(err);
                        }

                        resolve(description);
                    });
                });
            }
        })
    }

    list(source) {
        return this._listThriftFiles(source)
            .then(list => flatMap(list, this._getServices))
            .then(list => list.map(i => {
                i.source = source
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