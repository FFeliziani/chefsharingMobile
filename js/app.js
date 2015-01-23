$(window).load(function()
{
        /*var app = $.md5('ciao');
        console.log(app);
        $.ajax(
            {
                type:"POST",
                url:"http://www.chefsharing.it:8080/api/login/",
                crossDomain: true,
                data:"{'ID':'1','Username':'Test','Password':'"+app+"'}",
                contentType:"application/json; charset=utf-8",
                dataType:"json",
                success: function(data)
                {
                    console.log(data);
                }

            });

        if (window.location.pathname == "/ChefSharing/dashboard.html"){

            $.ajax(
                {
                    type:"POST",
                    url:"http://www.chefsharing.it:8080/api/dashboard/",
                    crossDomain: true,
                    data:"1234567890",
                    contentType:"application/json; charset=utf-8",
                    dataType:"json",
                    success: function(data)
                    {
                        console.log(data);
                    }

                });
        }*/

    if (window.location.pathname.indexOf("index") > -1) {
        $.ajax(
        {
            type:"GET",
            url:"http://http://192.168.1.2:8080/api/dashboard/",
            crossDomain: true,
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data)
            {
                populateDashboard(data);
            }
        });
    }
});

function addPathsToDashboard(data) {
    var contentPane = $(".enabledVideo");
    contentPane.children("a").each(function(index, elem) {
        $(elem).attr("href", getVideoPath(index, elem, "href"));
        $(elem).children("img").each(function(index1, elem1){
            $(elem1).attr("src", getThumbPath(index1, elem1, "src"));
        });
    });
}

function populateDashboard(data) {
    for(var i = 0; i < data.length; i++) {
        getDataFromVideo(i)
    }
}

function getDataFromVideo(id) {
    $.ajax(
        {
            type:"POST",
            url:"http://192.168.1.2:8080/api/video/",
            crossDomain: true,
            data:"{'id':'"+id+"'}",
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data)
            {
                $(".empty").hide();
                $(".gino").show();
                var videoImage = document.createElement("img");
                var lightBox = document.createElement("a");
                var videoTitle = document.createElement("h4");
                var videoDescription = document.createElement("span");
                var videoDiv = document.createElement("div");
                $(videoTitle).text(data.nome);
                $(videoDescription).text(data.descrizione);
                lightBox.classList.add("html5lightbox");
                lightBox.appendChild(videoImage);
                videoDiv.classList.add("enabledVideo");
                videoDiv.appendChild(lightBox);
                videoDiv.appendChild(videoTitle);
                videoDiv.appendChild(videoDescription);
                $(".content > .content-pane").prepend(videoDiv);
                addPathsToDashboard(data);
            }
        });
}

function getThumbPath(id, div, attr){
    $.ajax(
        {
            type:"POST",
            url:"http://192.168.1.2t:8080/api/video/",
            crossDomain: true,
            data:"{'id':'"+id+"'}",
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data)
            {
                $(div).attr(attr, data.thumbnail);
                //return data;
            }
        });
}

function getVideoPath(id, div, attr){
    $.ajax(
        {
            type:"POST",
            url:"http://192.168.1.2:8080/api/video/",
            crossDomain: true,
            data:"{'id':'"+id+"'}",
            contentType:"application/json; charset=utf-8",
            dataType:"json",
            success: function(data)
            {
                $(div).attr(attr, data.indirizzo);
                //return data;
            }
        });
}

$('#login').on('click',function(){

    window.location = 'dashboard.html';

});
