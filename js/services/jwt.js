(function() {
    var app = angular.module("mrgApp");

    var jwt = function($base64) {

        var encode = function(payload, secret) {
            var header = {
                typ: 'JWT',
                alg: 'HS256',
            };
            var jwt = base64Encode(JSON.stringify(header)) + '.' + base64Encode(JSON.stringify(payload));

            return jwt + '.' + sign(jwt, secret);
        };

        var decode = function(token, secret) {
            var segments = token.split('.');

            if (segments.length !== 3)
                throw new Error("Token structure incorrect");

            var payload = JSON.parse(base64Decode(segments[1]));
            
            var signature = segments[0] + '.' + segments[1];
            
            if(!verify(signature, secret, segments[2]))
            throw new Error("Verification failed");
            
            return payload;
        };
        
        function verify(raw, secret, signature){
            return signature === sign(raw, secret).toString();
        }

        function sign(str, key) {
            return CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key).update(str).finalize();
        }

        function base64Encode(str) {
            return $base64.encode(str);
        }

        function base64Decode(str) {
            return $base64.decode(str);
        }

        return {
            encode: encode,
            decode: decode,
        };
    };

    app.factory("jwt", ['$base64', jwt]);
}());