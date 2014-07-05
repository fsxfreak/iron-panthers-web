(function () {
    var Blog = function(header, author, team, date, text) {
        this.header = header;
        this.author = author;
        this.team   = team;
        this.date   = date; //should be a Date object, for different Date formats
        this.text   = text;
    }

    //TODO - Do we want to be American or international?
    Blog.prototype.getDatePlain = function() {
        var monthNames = [
            "January", "February", "March", "April", "May", "June"
          , "July", "August", "September", "October", "November", "December"
        ];

        var month = monthNames[this.date.getMonth()]
        var day   = this.date.getDate();
        var year  = this.date.getFullYear();

        return month + " " + day + ", " + year;
    }

    var module = angular.module("ironBlog", []);

    module.directive("isoTime", function() {
        return {
            link: function (scope, element, attrs) {
                var time = attrs.myIsoTime;
                attrs.$set('timedate', time);
            }
        }
    });

    var parsedBlogs = "";

    function readBlogs() {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.onreadystatechange = function() {
            var result = xhr.responseText;
            parsedBlogs = JSON.parse(result);
        }
        //TODO: url needs to be changed for final server
        xhr.open("get", "http://fsxfreak.github.io/iron-panthers-web/text-content/blogs.json", true);
        xhr.send();
    }

    module.controller("BlogController", ["$scope", function($scope) {
        $scope.blogs = [];

        for (var i = 0; i < parsedBlogs.blogs.length; i++)
        {
            var blog = parsedBlogs.blogs[i];

            $scope.blogs.push(new Blog(
                    blog.header
                  , blog.author
                  , blog.team
                  , new Date(blog.date[0], blog.date[1], blog.date[2])
                  , blog.text
                )
            );
        }
    }]);
})();
