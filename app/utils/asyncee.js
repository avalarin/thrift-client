import asyncCollections from 'async'

function promisee(resolve, reject) {
    return (e, r) => e ? reject(e) : resolve(r)
}

// export function filter(source, asyncPredicate) {
//     return new Promise((resolve, reject) => 
//         asyncCollections.filter(list, asyncPredicate, promisee(resolve, reject))
//     )
// }

export function flatMap(source, func) {
    return new Promise((resolve, reject) => 
        asyncCollections.map(source, function(item, callback) {
            func(item).then(r => callback(null, r)).catch(e => callback(e, null))
        }, (err, arrays) => {
            if (err) return reject(err)
            var out = []
            arrays.forEach(oneArray => oneArray.forEach(i => out.push(i)))
            resolve(out)
        })
    )
}