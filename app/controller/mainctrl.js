app.controller('mainctrl',mainctrl);

function mainctrl($scope,$http,$state)
{
    $scope.login = function(datos)
    {
        $http({
            url:'http://10.30.0.10/backend/public/api/login',
            skipAuthorization:true,
            method: 'POST',
            data : { email : datos.username , password : datos.password },
        }).then(function(data)
        {
                localStorage.setItem("token", data.data.token);
                $state.go("home");  
        });
    }
    
}



