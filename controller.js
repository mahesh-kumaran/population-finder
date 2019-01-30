app.controller("myctrl", function ($scope, $http, $timeout) {
	$scope.countrylist = [];
	$http
		.get("http://api.population.io:80/1.0/countries")
		.then(function (response) {
			$scope.countrylist = response.data;
		});

	$scope.population = function () {
		if ($scope.country && $scope.age) {
			var url = "http://api.population.io:80/1.0/population/2017/" + $scope.country + "/" + $scope.age;
			$http
				.get(url)
				.then(function (response) {
					$scope.result = response.data;
					$timeout(function(){
						$('.count').each(function () {
							$(this).prop('Counter', 0).animate({
							  Counter: $(this).text()
							}, {
								duration: 2000,
								easing: 'swing',
								step: function (now) {
								  $(this).text(Math.ceil(now));
								}
							  });
						  });
					},100);
				});
		}
	}

	$scope.agerange = function (start, end) {
		var limit = [];
		for (var i = start; i <= end; i++) {
			limit.push(i);
		}
		return limit;
	}

});