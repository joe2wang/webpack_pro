(function(){
$.fn.getLoc=function(tf) {
    var self=$(this);
    var options = {
        enableHighAccuracy: true,
        maximumAge: 1000
    }

    if(!tf) tf=true;
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
            var longitude = position.coords.longitude;//经度
            var latitude = position.coords.latitude;//纬度
            /**
             * 定位的操作可写在这里
             */
            var map = new BMap.Map("allmap");
            var point = new BMap.Point(longitude, latitude);
            var gc = new BMap.Geocoder();
            gc.getLocation(point, function (rs) {
                var addComp = rs.addressComponents;
                if (addComp.province.substring(addComp.province.length - 1) == "省") {
                    addComp.province = addComp.province.substring(0, addComp.city.length - 1);
                }
                /*  console.log(addComp.province);//省
                 console.log(addComp.city);//市
                 console.log(addComp.district);//县、区*/
                //console.log(addComp.city);//市
                var citys=(addComp.city.indexOf('市')>0) ? addComp.city.replace('市','') : addComp.city;
                //console.log(self.text(),self.text()=='');
                return self.text()=='' ? self.text(citys) :false;


            });
        }, function (error) {
            console.log(error);
        }, options);
    }
};
}())