(function(){
    'use strict';
    
    var AuthInterceptor = function(LocalStore){
        return {
            request: function(config){
                var token = LocalStore.userInfo() != null ? LocalStore.userInfo().token : null;
                
                if(token)
                    config.headers.Authorization = 'Bearer ' + token;
                    
                return config;
            }  
        };
    };
    
    angular.module("mrgApp").factory("AuthInterceptor", ['LocalStore', AuthInterceptor]);
}());