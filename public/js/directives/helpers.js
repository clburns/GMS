app
    .directive('appEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.appEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })

    .directive('menuClose', function () {
        return {
            restrict: 'AC',
            link: function($scope, $element){
                $element.bind('click', function() {
                    var drawer = angular.element(document.querySelector('.mdl-layout__drawer'));
                    if (drawer){
                        drawer.removeClass('is-visible');
                    }
                });
            }
        }
    })

    .directive('checkActiveTab', function(){
        return {
            restrict: 'AC',
            link: function($scope, $element){
                $element.bind('click', function(){
                    var tab = angular.element(document.querySelector('.mdl-layout__tab'));
                    if (tab){
                        tab.removeClass('is-active');
                        this.addClass('is-active');

                    }
                });
            }
        }
});