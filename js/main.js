(function() {

    var app = angular.module("mrgApp");

    /**
     * Configure the Routes
     */
    app.config(['$routeProvider', 'USER_ROLES', 'LOCALIZATION', '$httpProvider', '$translateProvider', '$translatePartialLoaderProvider',
        function($routeProvider, USER_ROLES, LOCALIZATION, $httpProvider, $translateProvider, $translatePartialLoaderProvider) {
            $routeProvider
            // Home
                .when("/", {
                templateUrl: "partials/home.html",
                controller: "DashboardCtrl"
            })

            // Pages
            .when("/about", {
                templateUrl: "partials/about.html",
                controller: "PageCtrl",
                authorizedRoles: [USER_ROLES.guest, USER_ROLES.admin]
            })

            //Jobs
            .when("/jobs", {
                    templateUrl: "partials/Jobs/jobs.html"
                })
                .when("/job/edit/:jobid", {
                    templateUrl: "partials/Jobs/job.html",
                    controller: "JobCtrl"
                })
                .when("/job/new", {
                    templateUrl: "partials/Jobs/job.html",
                    controller: "NewJobCtrl"
                })
                .when("/job/attachment/:jobid", {
                    templateUrl: "partials/Jobs/attachments.html",
                    controller: "AttachmentsCtrl"
                })

            //faq
            .when("/faq", {
                    templateUrl: "partials/faq.html",
                    controller: "PageCtrl"
                })
                .when("/pricing", {
                    templateUrl: "partials/pricing.html",
                    controller: "PageCtrl"
                })
                .when("/services", {
                    templateUrl: "partials/services.html",
                    controller: "PageCtrl"
                })
                .when("/contact", {
                    templateUrl: "partials/contact.html",
                    controller: "PageCtrl"
                })
                .when("/test", {
                    templateUrl: "partials/test.html",
                    controller: "TestCtrl"
                })
                .when("/test/edit/:actionid", {
                    templateUrl: "partials/testedit.html",
                    controller: "TestEditCtrl"
                })
                .when("/test/new", {
                    templateUrl: "partials/testedit.html",
                    controller: "TestNewCtrl"
                })

            .when("/register", {
                templateUrl: "partials/registration/registration.html",
                controller: "RegistrationCtrl"
            })

            //groundTime
            .when("/groundtime/new", {
                    templateUrl: "partials/groundTime/newGroundTime.html",
                    controller: "GroundTimeNewCtrl"
                })
                .when("/groundtime/edit/:id", {
                    templateUrl: "partials/groundTime/newGroundTime.html",
                    controller: "GroundTimeEditCtrl"
                })

            //actions
            .when("/actions", {
                    templateUrl: "partials/action/list.html",
                    controller: "ActionListCtrl"
                })
                .when("/action/edit/:actionid/:complaintid", {
                    templateUrl: "partials/action/edit.html",
                    controller: "ActionEditCtrl",
                    /*authorizedRoles: [USER_ROLES.guest, USER_ROLES.admin]*/
                })
                .when("/action/new/:complaintid", {
                    templateUrl: "partials/action/edit.html",
                    controller: "ActionNewCtrl",
                    /*authorizedRoles: [USER_ROLES.guest, USER_ROLES.admin]*/
                })
                .when("/action/delete/:actionid", {
                    templateUrl: "partials/action/delete.html",
                    controller: "ActionDeleteCtrl",
                    /*authorizedRoles: [USER_ROLES.guest, USER_ROLES.admin]*/
                })

            // Blog
            .when("/blog", {
                    templateUrl: "partials/blog.html",
                    controller: "BlogCtrl"
                })
                .when("/blog/post", {
                    templateUrl: "partials/blog_item.html",
                    controller: "BlogCtrl"
                })

            //Complaints
            .when("/Complaints", {
                    templateUrl: "partials/complaints/Complaints.html",
                })
                .when("/Complaint/Edit/:id", {
                    templateUrl: "partials/complaints/ComplaintInput.html",
                    controller: "ComplaintEditCtrl"
                })
                .when("/Complaint/Add", {
                    templateUrl: "partials/complaints/ComplaintInput.html",
                    controller: "ComplaintAddCtrl"
                })
                .when("/Complaint/:id", {
                    templateUrl: "partials/complaints/Complaint.html",
                    controller: "ComplaintCtrl"
                })
                // else 404
                .otherwise("/404", {
                    templateUrl: "partials/404.html",
                    controller: "PageCtrl"
                });

            //$translatePartialLoaderProvider.addPart('registration');
            $translateProvider
                .useLoader('$translatePartialLoader', {
                    urlTemplate: './i18n/{part}/{lang}.json'
                })
                .registerAvailableLanguageKeys(LOCALIZATION.availableLanguages, {
                    'en_US': 'en',
                    'en_UK': 'en',
                    'ro_RO': 'ro',
                    'de_DE': 'de',
                    'de_CH': 'de'
                })
                .fallbackLanguage(LOCALIZATION.fallbackLanguage);

            //$httpProvider.interceptors.push("AuthInterceptor");
        }
    ]);
}());
