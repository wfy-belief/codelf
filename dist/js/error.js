/https/.test(location.protocol) && "serviceWorker" in navigator && (Cache.prototype.add || (Cache.prototype.add = function (e) {
    return this.addAll([e])
}), Cache.prototype.addAll || (Cache.prototype.addAll = function (n) {
    var r = this;

    function o(e) {
        this.name = "NetworkError", this.code = 19, this.message = e
    }

    return o.prototype = Object.create(Error.prototype), Promise.resolve().then(function () {
        if (arguments.length < 1) throw new TypeError;
        return n = n.map(function (e) {
            return e instanceof Request ? e : String(e)
        }), Promise.all(n.map(function (e) {
            "string" == typeof e && (e = new Request(e));
            var t = new URL(e.url).protocol;
            if ("http:" !== t && "https:" !== t) throw new o("Invalid scheme");
            return fetch(e.clone())
        }))
    }).then(function (e) {
        return Promise.all(e.map(function (e, t) {
            return r.put(n[t], e)
        }))
    }).then(function () {
    })
}), CacheStorage.prototype.match || (CacheStorage.prototype.match = function (r, o) {
    var i = this;
    return this.keys().then(function (e) {
        var n;
        return e.reduce(function (e, t) {
            return e.then(function () {
                return n || i.open(t).then(function (e) {
                    return e.match(r, o)
                }).then(function (e) {
                    return n = e
                })
            })
        }, Promise.resolve())
    })
}), "serviceWorker" in navigator && window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").then(function (t) {
        setInterval(t.update, 36e5), t.onupdatefound = function () {
            var e = t.installing;
            e.onstatechange = function () {
                switch (e.state) {
                    case"installed":
                        navigator.serviceWorker.controller ? console.log("New or updated content is available.") : console.log("Content is now available offline!");
                        break;
                    case"redundant":
                        console.error("The installing service worker became redundant.")
                }
            }
        }
    }).catch(function (e) {
        console.error("Error during service worker registration:", e)
    })
}))
